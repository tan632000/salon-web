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
        console.log(user);
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
            <button className={`appointment-status ${color}`}>{text}</button>
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
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedUser.appointments.map((appointment) => (
                                <tr key={appointment._id}>
                                    <td>{appointment.time}</td>
                                    <td>{appointment.service.name}</td>
                                    <td>{appointment.service.duration} hours</td>
                                    <td>{formatMoney(appointment.service.price)} VND</td>
                                    <td>
                                        <button className="success-appointments" onClick={() => handleUpdateStatus(appointment._id, 2)}>Mark as Completed</button>
                                        <button className="cancel-appointments" onClick={() => handleUpdateStatus(appointment._id, 3)}>Mark as Cancel</button>
                                    </td>
                                    <td>
                                        {renderStatus(appointment.status)}
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
        <div>
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
                    <td>
                        <button className="view-appointments" onClick={() => handleViewAppointments(appointment)}>View</button>
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
