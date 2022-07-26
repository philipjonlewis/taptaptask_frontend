import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { login, logout } from "../../redux/authState";

import { useDispatch } from "react-redux";

import type { Email } from "../../vite-env";

const LogIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const redirectPath = location.state?.path || "/workshop/projects";
  const [displayPassword, displayPasswordHandler] = useState(false);

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
  }) as any;
  const { email, password } = signUpForm;

  const [error, setError] = useState({ isError: false, content: "" }) as any;
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [logInState, setLogInState] = useState(false);

  const handleLogin = (e) => {

    e.preventDefault();
    setIsFormSubmitting(true);

    if (email.length == 0 || password.length == 0) {
      return setError((state: any) => {
        setIsFormSubmitting(false);
        return {
          isError: true,
          content: { message: "Unable to sign up with incomplete data" },
        };
      });
    }
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_PORT}/auth/login`,
        { email, password },
        {
          withCredentials: true,
        }
      )
      .then(function (response: any) {
        console.log("login", response);

        if (
          response.status == 200 &&
          response.data.code == 200 &&
          response.data.status
        ) {
          dispatch(login({ email, password, _id: response.data.payload._id }));

          setLogInState(true);

          setTimeout(() => {
            return navigate(redirectPath, { replace: true });
          }, 2000);
        } else {
          setError((state: any) => {
            console.log(state);
            return { isError: true, content: response.data };
          });
        }
      })
      .catch(function (error) {
        console.log(error.response);
      });
    setIsFormSubmitting(false);
    // return navigate(redirectPath, { replace: true });
  };

  return (
    <div className="login-page-container">
      <div className="login-form-container">
        {logInState && (
          <div className="success-container">
            <div className="success-message-container">
              {" "}
              <img src="/rings.svg" alt="" /> <p>Loggin in</p>
            </div>
          </div>
        )}

        <div
          className={
            error.isError
              ? "error-container visibility-visible"
              : "error-container "
          }
        >
          <div
            className="close-error-container"
            onClick={() => {
              setError({ isError: false, content: "" });
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="error-message-container">
            <div className="alert-icon-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p>We couldnt sign you up</p>
            </div>
            <div className="error-content">
              <p>{error.content.message}</p>
              <br />
              {error?.content?.payload?.length >= 1 &&
                error?.content?.payload?.map((err: any) => {
                  return <p>{err.message}</p>;
                })}
            </div>
          </div>
        </div>

        <div className="title-container">
          <div className="log-in">
            <p>Log In</p>
          </div>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="label-input-container">
            <label>Email</label>
            <input
              required
              placeholder="john@email.com"
              disabled={isFormSubmitting}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
              type="email"
              name="email"
              value={email}
              onChange={(e) =>
                setSignUpForm((state: any) => {
                  return { ...state, [e.target.name]: e.target.value };
                })
              }
            />
          </div>
          <div className="label-input-container">
            <label>Password</label>
            <input
              required
              placeholder=" "
              disabled={isFormSubmitting}
              type={displayPassword ? "text" : "password"}
              pattern="(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$"
              name="password"
              value={password}
              onChange={(e) =>
                setSignUpForm((state: any) => {
                  return { ...state, [e.target.name]: e.target.value };
                })
              }
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

          <button onClick={handleLogin} disabled={isFormSubmitting}>
            LogIn
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
