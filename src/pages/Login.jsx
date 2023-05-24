/* eslint-disable no-unused-expressions */
import React, { useState } from "react";
import "../styles/Login.css";
import salonImage from "../images/background.jpg";
import axiosClient from "../api/axiosClient";
import cookie from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ConfigActions } from "../redux/configRedux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
          axiosClient.get('/salons')
          .then((data) =>  {
            if (data) {
              dispatch(ConfigActions.setListSalons(data.salons));
            }
          })
          cookie.set('token', token)
          localStorage.setItem('user_id', user.id);
          localStorage.setItem('username', user.firstName + " " + user.lastName)
          navigate('/dashboard'); 
        }
      })
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          const { code, data } = error.response;
          console.log(code, data);
          setMessage(data.message);
        } else if (error.request) {
          // The request was made but no response was received
          console.log('Request Error:', error.request);
          setMessage(error.request);
          // ...
        } else {
          // Something happened in setting up the request
          console.log('Error:', error.message);
          setMessage(error.message);
        }
      });
  };

  return (
    <div
      className="login-container"
      style={{ backgroundImage: `url(${salonImage})` }}
    >
      <form className="login-form" onSubmit={handleSubmit}>
        <h1 style={{ fontSize: "36px", marginBlock: "30px" }}>Login</h1>
        {message && <div className="error-message">{message}</div>}
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
