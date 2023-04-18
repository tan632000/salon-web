/* eslint-disable no-unused-expressions */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ConfigSelectors } from "../redux/configRedux";
import axiosClient from "../api/axiosClient.js"

const UpcomingAppointments = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointment, setAppointment] = useState([]);

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
  return (
    <div className="row">
      <div className="col-md-4">
        <Calendar
          selectedDate={selectedDate}
          handleDateClick={handleDateClick}
          handleDay={handleDay}
          filteredAppointments={appointment}
        />
      </div>
      <div className="col-12">
        <h3 style={{ fontSize: "25px", fontWeight: 600, marginBottom: "20px" }}>
          Appointments on {selectedDate.toDateString()}
        </h3>
        <h3 style={{ fontWeight: 600, marginBottom: "20px" }}>Total Revenue: {price} VNĐ</h3>
        <AppointmentList appointments={appointment} />
      </div>
    </div>
  );
};

function AppointmentList({ appointments }) {
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

  const renderStatus = (status) => {
    const { color, text } = STATUS_MAP[status] || { color: '', text: '' };
    return (
      <button className={`appointment-status ${color}`}>{text}</button>
    );
  };

  return (
    <ul className="appointment-list">
      {appointments.length > 0 && appointments.map((appointment) => (
        <li key={appointment._id} className="appointment">
          <div className="appointment-header">
            <img
              src={appointment.stylist.photo}
              alt={appointment.stylist.name}
              className="staff-photo"
            />
            <div className="staff-name">{appointment.stylist.name}</div>
          </div>
          <div className="appointment-details">
            <div>{(new Date(appointment.time)).toLocaleTimeString()}</div>
            <div>{appointment.duration} hour(s)</div>
            <div>{appointment.userName}</div>
          </div>
          {renderStatus(appointment.status)}
        </li>
      ))}
    </ul>
  );
}

const Calendar = ({ selectedDate, handleDateClick, handleDay, filteredAppointments }) => {
  const [month, setMonth] = useState(selectedDate.getMonth());
  const [year, setYear] = useState(selectedDate.getFullYear());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const handleClick = (day) => {
    let monthUpdate = month + 1;
    handleDateClick(new Date(year, month, day));
    handleDay(year + '/' + monthUpdate + '/' + day)
  };

  const handlePrevMonth = () => {
    setMonth((prevMonth) => prevMonth - 1);
  };

  const handleNextMonth = () => {
    setMonth((prevMonth) => prevMonth + 1);
  };

  const handlePrevYear = () => {
    setYear((prevYear) => prevYear - 1);
  };

  const handleNextYear = () => {
    setYear((prevYear) => prevYear + 1);
  };

  const renderCalendarDay = (day) => {
    if (day <= 0) {
      day = ""
    }
    const isCurrentMonth = day <= daysInMonth;
    const isToday = isCurrentMonth && day === new Date().getDate();
    const isSelected =
      isCurrentMonth &&
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear();
    const hasAppointments = filteredAppointments > 0 && filteredAppointments.some(
      (appointment) =>
        appointment.time.getDate() === day &&
        appointment.time.getMonth() === month &&
        appointment.time.getFullYear() === year
    );

    let className = "calendar-day";
    if (!isCurrentMonth) {
      className += " disabled";
    }
    if (isToday) {
      className += " today";
    }
    if (isSelected) {
      className += " selected";
    }
    if (hasAppointments) {
      className += " has-appointments";
    }

    return (
      <div key={day} className={className} onClick={() => handleClick(day)}>
        {isCurrentMonth ? day : ""}
      </div>
    );
  };

  const renderCalendarWeek = (weekStart) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = weekStart + i;
      days.push(renderCalendarDay(day));
    }
    return <div className="calendar-week">{days}</div>;
  };

  const calendarRows = [];
  let weekStart = 1 - firstDayOfMonth;
  while (weekStart <= daysInMonth) {
    calendarRows.push(renderCalendarWeek(weekStart));
    weekStart += 7;
  }

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevYear}>{"<<"}</button>
        <button onClick={handlePrevMonth}>{"<"}</button>
        <div className="calendar-month">
          {new Date(year, month).toLocaleString("default", { month: "long" })}{" "}
          {year}
        </div>
        <button onClick={handleNextMonth}>{">"}</button>
        <button onClick={handleNextYear}>{">>"}</button>
      </div>
      <div className="calendar-body">
        <div className="calendar-row">
          <div className="calendar-day-name">Sun</div>
          <div className="calendar-day-name">Mon</div>
          <div className="calendar-day-name">Tue</div>
          <div className="calendar-day-name">Wed</div>
          <div className="calendar-day-name">Thu</div>
          <div className="calendar-day-name">Fri</div>
          <div className="calendar-day-name">Sat</div>
        </div>
        {calendarRows}
      </div>
    </div>
  );
};

export default UpcomingAppointments;
