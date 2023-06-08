/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ConfigSelectors } from "../redux/configRedux";
import axiosClient from "../api/axiosClient.js";
import { formatMoney } from "../utils/formatMoney";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'react-datetime/css/react-datetime.css';
import Datetime from 'react-datetime';
import '../styles/UpcomingAppointments.css';

const UpcomingAppointments = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointment, setAppointment] = useState([]);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handleDay = (day) => {
    const salonId = localStorage.getItem('salonId');
    axiosClient
      .get(`/appointments/${salonId}/${day}`)
      .then((data) => {
        setAppointment(data)
      })
  }

  const filteredArray = appointment.length > 0 && appointment.filter(app => app.status === 2);
  const price = filteredArray.length > 0 ? filteredArray.reduce((sum, obj) => sum + obj.price, 0) : 0;

  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowEditPopup(true);
  };

  const handlePopupClose = () => {
    setShowEditPopup(false);
  };

  const CustomCalendar = ({ selectedDate, handleDateClick, handleDay, filteredAppointments, showEditPopup, handleClosePopup }) => {
    const [value, setValue] = useState(selectedDate);
  
    const handleChange = (date) => {
      setValue(date);
      handleDateClick(date);
      handleDay(date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate());
    };
  
    const tileContent = ({ date }) => {
      const hasAppointments = filteredAppointments.some((appointment) => {
        const appointmentDate = new Date(appointment.time);
        return (
          appointmentDate.getDate() === date.getDate() &&
          appointmentDate.getMonth() === date.getMonth() &&
          appointmentDate.getFullYear() === date.getFullYear()
        );
      });
  
      return hasAppointments && <div className="calendar-appointment-marker" />;
    };
  
    return (
      <div>
        <Calendar
          onChange={handleChange}
          value={value}
          tileContent={tileContent}
          locale="en-us"
        />
        {showEditPopup && (
          <AppointmentEditPopup
            selectedAppointment={selectedAppointment}
            handleClosePopup={handleClosePopup}
          />
        )}
      </div>
    );
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <CustomCalendar
          selectedDate={selectedDate}
          handleDateClick={handleDateClick}
          handleDay={handleDay}
          filteredAppointments={appointment}
          showEditPopup={showEditPopup}
          handleClosePopup={handlePopupClose}
        />
      </div>
      <div className="col-12">
        <h3 style={{ fontSize: "20px", fontWeight: 600, marginBottom: "20px", marginTop: "10px" }}>
          Appointments on {selectedDate.toDateString()}
        </h3>
        <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "20px" }}>Total Revenue: {formatMoney(price)} VNĐ</h3>
        <AppointmentList appointments={appointment} handleEditClick={handleEditClick} />
      </div>
    </div>
  );
};

const AppointmentEditPopup = ({ selectedAppointment, handleClosePopup }) => {
  const [selectedTime, setSelectedTime] = useState(new Date(selectedAppointment.time));
  const [message, setMessage] = useState("");

  const handleTimeChange = (momentObj) => {
    setSelectedTime(momentObj.toDate());
  };

  const handleSave = () => {
    // Step 1: Parse the given time string into a Date object
    const dateObj = new Date(selectedTime);
  
    // Step 2: Extract the date and time components
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so we add 1
    const day = String(dateObj.getDate()).padStart(2, "0");
    const hours = dateObj.getHours();
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    const seconds = String(dateObj.getSeconds()).padStart(2, "0");
  
    // Step 3: Validate the hour
    if (hours > 0 && (hours < 8 || hours >= 18)) {
      setMessage("Please make an appointment between 8am and 6pm. Please choose the time again.");
      return; // Stop further execution
    }
  
    //Step 4: Assemble the components into the desired format
    const outputTime = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  
    axiosClient
      .patch(`/appointments/${selectedAppointment._id}`, {
        time: outputTime,
      })
      .then((data) => {
        setMessage(data.message);
        if (data.appointment) { 
          handleClosePopup();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="appointment-edit-popup">
      <h3>Update Time Appointment</h3>
      <div className="calendar-container">
        <Datetime
          value={selectedTime}
          onChange={handleTimeChange}
          inputProps={{ placeholder: "Select date and time" }}
        />
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={handleClosePopup}>Cancel</button>
      {message && <p style={{color: 'red', marginTop: '10px'}}>{message}</p>}
    </div>
  );
}

function AppointmentList({ appointments, handleEditClick }) {
  const isOpen = useSelector(ConfigSelectors.isOpenSidebar);
  const STATUS_MAP = {
    1: { color: 'pending', text: 'Pending' },
    2: { color: 'completed', text: 'Completed' },
    3: { color: 'cancelled', text: 'Cancelled' },
  };

  useEffect(() => {
    let appointmentListElm = document.querySelector(".appointment-list");
    if (isOpen) {
      appointmentListElm.style.justifyContent =
        "space-between";
    } else {
      appointmentListElm.style.gridTemplateColumns =
        "space-around";
    }
  }, [isOpen]);

  const renderStatus = (status, appointment) => {
    const { color, text } = STATUS_MAP[status] || { color: '', text: '' };
    const handleEditButtonClick = (appointment) => {
      if (status === 1) {
        handleEditClick(appointment);
      }
    };
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <button className={`appointment-status ${color}`}>{text}</button>
        {status === 1 && (
          <button className="edit-button" onClick={() => handleEditButtonClick(appointment)}>Edit</button>
        )}
      </div>
    );
  };

  return (
    <ul className="appointment-list">
      {appointments.length > 0 && appointments.map((appointment) => (
        <li key={appointment._id} className="appointment">
          <div className="appointment-header">
            <div className="staff-name">{appointment.stylist.name}</div>
            <img
              src={appointment.stylist.photo}
              alt={appointment.stylist.name}
              className="staff-photo"
            />
          </div>
          <div className="appointment-details">
            <div className="appointment-time">{(new Date(appointment.time)).toLocaleTimeString()}</div>
            <div className="appointment-duration">{appointment.duration} hour(s)</div>
            <div className="appointment-user">{appointment.userName}</div>
          </div>
          {renderStatus(appointment.status, appointment)}
        </li>
      ))}
    </ul>
  );
}

export default UpcomingAppointments;
