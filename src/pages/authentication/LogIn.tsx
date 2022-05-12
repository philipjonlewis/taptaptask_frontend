import React, { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { login, logout } from "../../redux/authState";

import { useDispatch } from "react-redux";

const LogIn = () => {
  const navigate = useNavigate();
  const location = useLocation() as any;
  const redirectPath = location.state?.path || "/workshop";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(login({ username, password }));

    return navigate(redirectPath, { replace: true });
  };

  return (
    <div>
      <label>Username</label>
      <input type="text" onChange={(e) => setUsername(e.target.value)} />
      <label>password</label>
      <input type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>LogIn</button>
    </div>
  );
};

export default LogIn;
