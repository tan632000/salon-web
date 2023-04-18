import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import {
  FaMoneyCheck,
  FaCalendarAlt,
  FaCashRegister,
  FaServicestack,
  FaStar
} from "react-icons/fa";
import PurchaseChart from "../components/PurchaseChart";
import UpcomingAppointments from "../components/UpcomingAppointments";
import axiosClient from "../api/axiosClient";
import { ConfigActions, ConfigSelectors } from "../redux/configRedux";
import cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [totalServices, setTotalServices] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const dispatch = useDispatch();
  const listStylists = useSelector(ConfigSelectors.stylistData);
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies.get('token');
    token ? navigate('/dashboard') : navigate('/login')
  }, []);

  useEffect(() => {
    axiosClient
    .get('/services/count')
    .then((data) => {
      if (data.count > 0) {
        setTotalServices(data.count)
      }
    })
    .catch((err) => console.log(err))
  }, [])

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    const userId = localStorage.getItem('user_id');
    let salonId = "";
    axiosClient
    .get(`/salons/${userId}`)
    .then((data) => {
      if (data) {
        salonId = data.salon._id
        localStorage.setItem('salonId', salonId)

        axiosClient
        .get(`/appointments/${salonId}/${year}/${month}/${day}`)
        .then((data) => {
          setTotalAppointments(data);
        })
        .catch((err) => console.log(err))

        axiosClient
        .get(`/appointments/${salonId}/total`)
        .then((data) => {
          setTotalMoney(data.totalRevenue);
        })
        .catch((err) => console.log(err))

        axiosClient
        .get(`/stylists/${salonId}`)
        .then((data) => {
          dispatch(ConfigActions.setStylistData(data));
        })
        .catch((err) => console.log(err))
        
        axiosClient
        .get(`/services/${salonId}`)
        .then((data) => {
          dispatch(ConfigActions.setListServices(data))
        })
        .catch((err) => console.log(err))
      }
    })
    .catch((err) => console.log(err))
  }, [])

  const filteredArray = totalAppointments.length > 0 && totalAppointments.filter(app => app.status === 2);
  const price = filteredArray.length > 0 ? filteredArray.reduce((sum, obj) => sum + obj.price, 0) : 0;

  return (
    <div className="full-content">
      <div className="dashboard">
        <div className="greeting">
          <text style={{ fontWeight: "bold", fontSize: "25px" }}>
            Hello {localStorage.getItem('username')}
          </text>
          <text
            style={{ fontSize: "20px", fontWeight: "400", marginTop: "14px" }}
          >
            Welcome to Dashboard Page
          </text>
        </div>
        <div className="normal-card">
          <Card
            image={<FaMoneyCheck />}
            service="Total Revenue Today"
            price={price}
            money={true}
          />
          <Card
            image={<FaCalendarAlt />}
            service="Appointment for Today"
            price={totalAppointments.length}
          />
          <Card
            image={<FaCashRegister />}
            service="Total Revenue"
            price={totalMoney}
            money={true}
          />
          <Card image={<FaServicestack />} service="Services" price={totalServices} />
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
            {listStylists.length > 0 && listStylists.map((stylist) => (
              <div class="stylist-card">
                <div class="avatar-container">
                  <img
                    src={stylist.photo}
                    alt={stylist.name}
                  />
                </div>
                <div class="info-container">
                  <h2 class="stylist-name">{stylist.name}</h2>
                  {stylist.servicesOfferedName.map((service) => (
                    <p class="stylist-services">{service}</p>
                  ))}
                </div>
                <div className="stylist-star">
                  {stylist.avgStylistStars.toFixed(1)}
                  <FaStar />
                </div>
              </div>
            ))}
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
          Please choose the day to see the appointment lists
        </text>
        <div style={{ marginTop: "24px" }}>
          <UpcomingAppointments />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
