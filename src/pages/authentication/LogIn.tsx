import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { login, logout } from "../../redux/authState";

import { useDispatch } from "react-redux";

import type { Email } from "../../vite-env";

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const redirectPath = location.state?.path || "/workshop/projects";
  const [displayPassword, displayPasswordHandler] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hello: Email = "why";

  const dispatch = useDispatch();

  let axiosConfig = {
    withCredentials: true,
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_PORT}/auth/login`,
        { email, password },
        axiosConfig
      )
      .then(function (response: any) {
        console.log("login", response);

        if (response.status == 200) {
          dispatch(login({ email, password, _id: response.data.payload._id }));

          return navigate(redirectPath, { replace: true });
        }
      })
      .catch(function (error) {
        console.log(error.response);
      });

    // return navigate(redirectPath, { replace: true });
  };

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        <div className="title-container">
          <p>Log In</p>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="label-input-container">
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="label-input-container">
            <label>Password</label>
            <input
              type={displayPassword ? "text" : "password"}
              pattern="(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="show-password-container">
              <input
                type="checkbox"
                checked={displayPassword}
                onChange={() => {
                  displayPasswordHandler(!displayPassword);
                }}
              />
              <label htmlFor="showPassword">Show Password</label>
            </div>
          </div>

          <button onClick={handleLogin}>LogIn</button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
