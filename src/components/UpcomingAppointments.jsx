import React, { useState } from "react";

const UpcomingAppointments = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      customerName: "John Doe",
      staffName: "Mary Smith",
      staffPhoto:
        "https://www.shutterstock.com/image-photo/smiling-girl-student-wear-wireless-260nw-1492613150.jpg",
      time: new Date("2023-03-23T10:00:00"),
      duration: 1,
    },
    {
      id: 2,
      customerName: "Jane Doe",
      staffName: "Bob Johnson",
      staffPhoto:
        "https://www.shutterstock.com/image-photo/smiling-girl-student-wear-wireless-260nw-1492613150.jpg",
      time: new Date("2023-03-24T14:00:00"),
      duration: 2,
    },
    {
      id: 3,
      customerName: "John Doe",
      staffName: "Mary Smith",
      staffPhoto:
        "https://www.shutterstock.com/image-photo/smiling-girl-student-wear-wireless-260nw-1492613150.jpg",
      time: new Date("2023-03-23T10:00:00"),
      duration: 1,
    },
    {
      id: 4,
      customerName: "Jane Doe",
      staffName: "Bob Johnson",
      staffPhoto:
        "https://www.shutterstock.com/image-photo/smiling-girl-student-wear-wireless-260nw-1492613150.jpg",
      time: new Date("2023-03-24T14:00:00"),
      duration: 2,
    },
    // additional appointments go here
  ]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.time.getFullYear() === selectedDate.getFullYear() &&
      appointment.time.getMonth() === selectedDate.getMonth() &&
      appointment.time.getDate() === selectedDate.getDate()
  );

  return (
    <div className="row">
      <div className="col-md-4">
        <Calendar
          selectedDate={selectedDate}
          handleDateClick={handleDateClick}
          filteredAppointments={filteredAppointments}
        />
      </div>
      <div className="col-12">
        <h3 style={{ fontSize: "25px", fontWeight: 600, marginBottom: "20px" }}>
          Appointments on {selectedDate.toDateString()}
        </h3>
        <AppointmentList appointments={filteredAppointments} />
      </div>
    </div>
  );
};

function AppointmentList({ appointments }) {
  return (
    <ul className="appointment-list">
      {appointments.map((appointment) => (
        <li key={appointment.id} className="appointment">
          <div className="appointment-header">
            <img
              src={appointment.staffPhoto}
              alt={appointment.staffName}
              className="staff-photo"
            />
            <div className="staff-name">{appointment.staffName}</div>
          </div>
          <div className="appointment-details">
            <div>{appointment.time.toLocaleTimeString()}</div>
            <div>{appointment.duration} hour(s)</div>
            <div>{appointment.customerName}</div>
          </div>
        </li>
      ))}
    </ul>
  );
}

const Calendar = ({ selectedDate, handleDateClick, filteredAppointments }) => {
  const [month, setMonth] = useState(selectedDate.getMonth());
  const [year, setYear] = useState(selectedDate.getFullYear());

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const handleClick = (day) => {
    handleDateClick(new Date(year, month, day));
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
    const isCurrentMonth = day <= daysInMonth;
    const isToday = isCurrentMonth && day === new Date().getDate();
    const isSelected =
      isCurrentMonth &&
      day === selectedDate.getDate() &&
      month === selectedDate.getMonth() &&
      year === selectedDate.getFullYear();

    const hasAppointments = filteredAppointments.some(
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
