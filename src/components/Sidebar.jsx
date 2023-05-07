import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
  FaPowerOff,
} from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { ConfigActions, ConfigSelectors } from "../redux/configRedux";
import cookie from 'js-cookie'

const Sidebar = ({ children }) => {
  const dispatch = useDispatch();
  const isOpen = useSelector(ConfigSelectors.isOpenSidebar);
  const toggle = () => dispatch(ConfigActions.setIsOpenSidebar(!isOpen));
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

  useEffect(() => {
    const mainElement = document.querySelector("main");
    isOpen
      ? mainElement.classList.add("leftbar-open")
      : mainElement.classList.remove("leftbar-open");
  }, [isOpen]);

  return (
    <div className="container">
      <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            Salon Dashboard
          </h1>
          <div style={{ marginLeft: isOpen ? "35px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
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
              style={{ display: isOpen ? "block" : "none" }}
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
            style={{ display: isOpen ? "block" : "none" }}
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
