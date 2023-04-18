import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard.jsx";
import Stylist from "./pages/Stylist.jsx";
import Appointment from "./pages/Appointment.jsx";
import Service from "./pages/Service.jsx";
import User from "./pages/User.jsx";
import ProductList from "./pages/ProductList.jsx";
import Login from "./pages/Login.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Sidebar>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/stylist" element={<Stylist />} />
          <Route path="/service" element={<Service />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/user" element={<User />} />
          <Route path="/productList" element={<ProductList />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
};

export default App;
