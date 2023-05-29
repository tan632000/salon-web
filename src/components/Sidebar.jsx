import React from "react";
import {
  FaTh,
  FaUserAlt,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
  FaPowerOff,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import cookie from 'js-cookie'

const Sidebar = ({ children }) => {
  const navigate = useNavigate();
  const menuItem = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaTh />,
    },
    {
      path: "/stylist",
      name: "Stylist",
      icon: <FaUserAlt />,
    },
    {
      path: "/service",
      name: "Service",
      icon: <FaCommentAlt />,
    },
    {
      path: "/user",
      name: "User",
      icon: <FaShoppingBag />,
    },
    {
      path: "/register-service",
      name: "Register Service",
      icon: <FaThList />
    }
  ];

  const handleLogout = () => {
    localStorage.clear();
    cookie.remove('token');
    navigate('/login');
  };

  return (
    <div className="container">
      <div style={{ width: "280px"}} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: "block" }} className="logo">
            Salon Dashboard
          </h1>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: "block" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
        <div
          style={{ position: "absolute", bottom: "20px", cursor: 'pointer' }}
          className="link"
          onClick={handleLogout}
        >
          <div className="icon">
            <FaPowerOff />
          </div>
          <div
            style={{ display: "block" }}
            className="link_text"
          >
            Logout
          </div>
        </div>
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
