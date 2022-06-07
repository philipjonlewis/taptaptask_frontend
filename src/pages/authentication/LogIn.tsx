import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { login, logout } from "../../redux/authState";

import { useDispatch } from "react-redux";

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const redirectPath = location.state?.path || "/workshop";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  let axiosConfig = {
    withCredentials: true,
  };

  const handleLogin = () => {
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

    return navigate(redirectPath, { replace: true });
  };

  return (
    <div>
      <label>Email</label>
      <input type="text" onChange={(e) => setEmail(e.target.value)} />
      <label>password</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>LogIn</button>
    </div>
  );
};

export default LogIn;
