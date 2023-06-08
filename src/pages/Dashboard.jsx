import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "../components/Card";
import {
  FaMoneyCheck,
  FaCalendarAlt,
  FaCashRegister,
  FaServicestack,
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
  const navigate = useNavigate();
  const listSalons = useSelector(ConfigSelectors.listSalons);
  const [selectedSalon, setSelectedSalon] = useState(null);
  const [topServices, setTopServices] = useState([]);
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
        dispatch(ConfigActions.setListSalons(data.salons || []));
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
          <span style={{ fontWeight: "bold", fontSize: "25px" }}>
            Hello {localStorage.getItem('username')}
          </span>
          <span
            style={{ fontSize: "20px", fontWeight: "400", marginTop: "14px" }}
          >
            Welcome to Dashboard Page
          </span>
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
        <div style={{ width: "100%", marginTop: 28 }}>
          <span style={{ fontSize: "20px", fontWeight: "600" }}>
            Repurchase Rate
          </span>
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
      </div>
      <div className="upcoming-appointment">
        <h1 style={{ fontSize: "25px", fontWeight: 600, marginBottom: 14 }}>
          Upcoming Appointments
        </h1>
        <span style={{ fontSize: "18px", fontWeight: "400" }}>
          Please choose the day to see the appointment lists
        </span>
        <div style={{ marginTop: "10px" }}>
          <UpcomingAppointments />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
