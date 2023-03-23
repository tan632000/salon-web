/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import "../styles/Login.css";
import salonImage from "../images/background.jpg";
import axiosClient from "../api/axiosClient";
import cookie from 'js-cookie'
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Add code to submit login credentials to middleware here
    axiosClient
      .post('/users/login', {
        email,
        password,
      })
      .then((data) => {
        const {user, token} = data;
        if (user && token) {
          cookie.set('token', token)
          navigate('/dashboard');
        }
      })
      .catch((err) => console.log(err))

  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${salonImage})` }}
    >
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 style={{ fontSize: "36px", marginBlock: "30px" }}>Login</h1>
        <div className="login-div">
          <label>Email:</label>
          <input
            className="login-input"
            type="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="login-div">
          <label>Password:</label>
          <input
            className="login-input"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="login-btn" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
