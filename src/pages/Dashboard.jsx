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
import SalonDropdown from "../components/SalonDropdown";
import TopServices from "../components/TopServices"
import CustomerAgeChart from "../components/CustomerAgeChart";
import CityAppointmentChart from "../components/CityAppointmentChart";

const Dashboard = () => {
  const [totalServices, setTotalServices] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const dispatch = useDispatch();
  const listStylists = useSelector(ConfigSelectors.stylistData);
  const navigate = useNavigate();
  const listSalons = useSelector(ConfigSelectors.listSalons);
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [topServices, setTopServices] = useState(null);
  const [ageChat, setAgeChart] = useState(null);
  const [cityChart, setCityChart] = useState(null);
  const [registeredSalon, setRegisteredSalon] = useState({
    totalRegistered: 0,
    totalVerified: 0,
    totalMoney: 0
  });

  const handleSalonChange = (salonId) => {
    setSelectedSalon(salonId);
    // do something with the selected salon
  };

  useEffect(() => {
    axiosClient.get('/salons')
    .then((data) =>  {
      if (data) {
        dispatch(ConfigActions.setListSalons(data.salons));
      }
    })
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
    axiosClient
    .get('/registered')
    .then((data) => {
      if (data.success) {
        setRegisteredSalon(data.payload);
      }
    })
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
        salonId = selectedSalon ? selectedSalon : data.salon._id;
        localStorage.setItem('salonId', salonId)

        axiosClient
        .get(`/appointments/${salonId}/${year}/${month}/${day}`)
        .then((data) => {
          setTotalAppointments(data);
        })
        .catch((err) => console.log(err))

        axiosClient
        .get(`/appointments/${salonId}/top-services`)
        .then((data) => {
          setTopServices(data)
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

        axiosClient
        .get(`/appointments/${salonId}/customers-by-age`)
        .then((data) => {
          setAgeChart(data)
        })
        .catch((err) => console.log(err))

        axiosClient
        .get('/appointments/All/customers-by-city')
        .then((data) => {
          setCityChart(data)
        })
        .catch((err) => console.log(err))
      }
    })
    .catch((err) => console.log(err))
  }, [dispatch, selectedSalon])

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
          <SalonDropdown salons={listSalons} onChange={handleSalonChange} />
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
          <Card image={<FaServicestack />} service="Total Registered Salon" price={registeredSalon.totalRegistered} />
          <Card image={<FaServicestack />} service="Total Verified Salon" price={registeredSalon.totalVerified} />
          <Card
            image={<FaCashRegister />}
            service="Salon Promotion Revenue"
            price={registeredSalon.totalMoney}
            money={true}
          />
        </div>
        <div style={{ width: "100%" }}>
          <text style={{ fontSize: "25px", fontWeight: "600" }}>
            Repurchase Rate
          </text>
          <PurchaseChart onChange={selectedSalon} />
        </div>
        <div style={{ width: "100%" }}>
          <TopServices topServices={topServices} />
        </div>
        <div style={{width: '100%'}}>
          <CustomerAgeChart data={ageChat} />
        </div>
        <div style={{width: '100%'}}>
          <CityAppointmentChart data={cityChart} />
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
            {listStylists.length === 0 && "No record available"}
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
