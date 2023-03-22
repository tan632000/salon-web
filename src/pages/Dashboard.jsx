import React from "react";
import Card from "../components/Card";
import {
  FaMoneyCheck,
  FaCalendarAlt,
  FaCashRegister,
  FaServicestack,
} from "react-icons/fa";
import PurchaseChart from "../components/PurchaseChart";
import UpcomingAppointments from "../components/UpcomingAppointments";

const Dashboard = () => {
  return (
    <div className="full-content">
      <div className="dashboard">
        <div className="greeting">
          <text style={{ fontWeight: "bold", fontSize: "25px" }}>
            Hello Tan
          </text>
          <text
            style={{ fontSize: "20px", fontWeight: "400", marginTop: "14px" }}
          >
            Chao mung den voi trang chu
          </text>
        </div>
        <div className="normal-card">
          <Card
            image={<FaMoneyCheck />}
            service="Total Revenue Today"
            price="Rs. 130,118"
          />
          <Card
            image={<FaCalendarAlt />}
            service="Appointment for Today"
            price="89"
          />
          <Card
            image={<FaCashRegister />}
            service="Cash Balance"
            price="Rs. 80,000"
          />
          <Card image={<FaServicestack />} service="Services" price="56" />
        </div>
        <div style={{ width: "100%" }}>
          <text style={{ fontSize: "25px", fontWeight: "600" }}>
            Repurchase Rate
          </text>
          <PurchaseChart />
        </div>
        <div>
          <text style={{ fontSize: "25px", fontWeight: 600 }}>Stylists</text>
          <div
            style={{
              display: "grid",
              gap: "20px",
              paddingTop: "20px",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            }}
          >
            <div class="stylist-card">
              <div class="avatar-container">
                <img
                  src="https://www.shutterstock.com/image-photo/smiling-girl-student-wear-wireless-260nw-1492613150.jpg"
                  alt="Stylist's profile picture"
                />
              </div>
              <div class="info-container">
                <h2 class="stylist-name">Firstname Lastname</h2>
                <p class="stylist-services">Hair styling, Makeup, Nails</p>
              </div>
            </div>
            <div class="stylist-card">
              <div class="avatar-container">
                <img
                  src="https://www.shutterstock.com/image-photo/smiling-girl-student-wear-wireless-260nw-1492613150.jpg"
                  alt="Stylist's profile picture"
                />
              </div>
              <div class="info-container">
                <h2 class="stylist-name">Firstname Lastname</h2>
                <p class="stylist-services">Hair styling, Makeup, Nails</p>
              </div>
            </div>
            <div class="stylist-card">
              <div class="avatar-container">
                <img
                  src="https://www.shutterstock.com/image-photo/smiling-girl-student-wear-wireless-260nw-1492613150.jpg"
                  alt="Stylist's profile picture"
                />
              </div>
              <div class="info-container">
                <h2 class="stylist-name">Firstname Lastname</h2>
                <p class="stylist-services">Hair styling, Makeup, Nails</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="upcoming-appointment">
        <text style={{ fontSize: "25px", fontWeight: 600 }}>
          Upcoming Appointments
        </text>
        <br />
        <br />
        <text style={{ fontSize: "20px", fontWeight: "400" }}>
          Chon ngay de xem danh sach Appointment
        </text>
        <div style={{ marginTop: "24px" }}>
          <UpcomingAppointments />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
