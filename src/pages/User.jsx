import React, { useEffect, useState } from "react";
import axiosCLient from '../api/axiosClient'
import { formatMoney } from "../utils/formatMoney";

function User() {
    const [appointments, setAppointments] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const salonId = localStorage.getItem('salonId');

    useEffect(() => {
        axiosCLient.get(`/users/${salonId}`).then((data) => {
        setAppointments(data);
        });
    }, []);

    const handleViewAppointments = (user) => {
        setSelectedUser(user);
    }

    const STATUS_MAP = {
        1: { color: 'pending', text: 'Pending' },
        2: { color: 'completed', text: 'Completed' },
        3: { color: 'cancelled', text: 'Cancelled' },
    };

    const renderStatus = (status) => {
        const { color, text } = STATUS_MAP[status] || { color: '', text: '' };
        return (
            <button className={`appointment-status-user ${color}`}>{text}</button>
        );
    };

    const handleUpdateStatus = (appointmentId, newStatus) => {
        axiosCLient.patch(`/appointments/${appointmentId}/${newStatus}`)
        .then(() => {
            const updatedUser = { ...selectedUser };
            const appointmentIndex = updatedUser.appointments.findIndex((appointment) => appointment._id === appointmentId);
            updatedUser.appointments[appointmentIndex].status = newStatus;
            setSelectedUser(updatedUser);
        })
        .catch((error) => {
            console.log(error);
        });
    };

    const renderAppointmentTable = () => {
        if (selectedUser) {
            return (
                <div>
                    <h1>Appointment Information</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Time</th>
                                <th>Service Name</th>
                                <th>Duration</th>
                                <th>Price</th>
                                <th>Update Status</th>
                                <th style={{width: '10%'}}>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedUser.appointments.map((appointment) => (
                                <tr key={appointment._id}>
                                    <td>{appointment.time.replace("T", " ").replace(/\.\d+/, "").replace("Z", "")}</td>
                                    <td>{appointment.service.name}</td>
                                    <td>{appointment.service.duration} hours</td>
                                    <td>{formatMoney(appointment.service.price)} VND</td>
                                    <td style={{textAlign: 'center'}}>
                                        <button className="success-appointments" onClick={() => handleUpdateStatus(appointment._id, 2)}>Complete</button>
                                        <button className="cancel-appointments" onClick={() => handleUpdateStatus(appointment._id, 3)}>Cancel</button>
                                    </td>
                                    <td style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '8px 0px'}}>
                                        <div style={{display: 'flex'}}>
                                            {renderStatus(appointment.status)}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return null;
        }
    }
    return (
        <div style={{padding: 30, marginLeft: 280}}>
            <h1>User Information</h1>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone Number</th>
                    <th>Number of Bookings</th>
                    <th>Total Amount</th>
                    <th>Ranking</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {appointments.map((appointment, index) => (
                    <tr key={index}>
                        <td>{`${appointment.user.firstName} ${appointment.user.lastName}`}</td>
                        <td>{appointment.user.email}</td>   
                        <td>{appointment.user.phoneNumber}</td>
                        <td>{appointment.appointments.length}</td>
                        <td>{formatMoney(appointment.totalAmount)} VNĐ</td>
                        <td>{appointment.appointments.length > 5 ? 'Gold' : 'Silver'}</td>
                        <td style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', padding: '8px 0px'}}>
                            <div style={{display: 'flex'}}>
                                <button className="view-appointments" onClick={() => handleViewAppointments(appointment)}>View</button>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {renderAppointmentTable()}
        </div>
    );
}

export default User;
