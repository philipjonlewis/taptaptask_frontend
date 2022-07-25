import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, signup, logout } from "../../redux/authState";
import { useNavigate, useLocation } from "react-router-dom";

const SignUp = () => {
  const [displayPassword, displayPasswordHandler] = useState(false);
  const navigate = useNavigate();
  const location = useLocation() as any;
  const redirectPath = location.state?.path || "/workshop";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const dispatch = useDispatch();

  let axiosConfig = {
    withCredentials: true,
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_PORT}/auth/signup`,
        { email, password, passwordConfirmation },
        axiosConfig
      )
      .then(function (response: any) {
        console.log("signup", response);

        if (response.status == 200) {
          dispatch(signup({ email, password, _id: response.data._id }));

          return navigate(redirectPath, { replace: true });
        }
      })
      .catch(function (error) {
        console.log(error.response);
      });

    // return navigate(redirectPath, { replace: true });
  };

  return (
    <div className="signup-page-container">
      <div className="signup-form-container">
        <div className="title-container">
          <p>Sign Up</p>
        </div>
        <form>
          <div className="label-input-container">
            <label htmlFor="email">Email</label>
            <input
              name="email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="label-input-container">
            <label htmlFor="password">Password</label>
            <input
              pattern="(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={displayPassword ? "text" : "password"}
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
          <div className="label-input-container">
            <label htmlFor="passwordConfirmation">Password Confirmation</label>
            <input
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              type={displayPassword ? "text" : "password"}
            />
          </div>
          <div className="password-requirements">
            <p>Password Requirements</p>
            <p>Minimum of 6 characters and a maximum of 32 characters.</p>
            <p>Must have at least one(1) of the ff: </p>
            <p>- Number</p>
            <p>- Uppercase Letter</p>
            <p>- Lowercase Letter</p>
            <p>- The following characters : ! @ # $ % ^ & *</p>
          </div>
          <button onClick={handleSignUp}>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
