import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import Stylist from "./pages/Stylist.jsx";
import Appointment from "./pages/Appointment.jsx";
import Service from "./pages/Service.jsx";
import User from "./pages/User.jsx";
import Login from "./pages/Login.jsx";
import RegisterService from "./pages/RegisterService";
import LoadingWrapper from "./components/LoadingWrapper";

const App = () => {
  return (
    <LoadingWrapper>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/*" element={<AuthenticatedRoutes />} />
        </Routes>
      </BrowserRouter>
    </LoadingWrapper>
  );
};

const AuthenticatedRoutes = () => {
  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stylist" element={<Stylist />} />
        <Route path="/service" element={<Service />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/user" element={<User />} />
        <Route path="/register-service" element={<RegisterService />} />
      </Routes>
    </>
  );
};

export default App;
