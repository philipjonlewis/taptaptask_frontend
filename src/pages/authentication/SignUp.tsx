import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, signup, logout } from "../../redux/authState";
import { useNavigate, useLocation } from "react-router-dom";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation() as any;
  const redirectPath = location.state?.path || "/workshop";
  const [displayPassword, displayPasswordHandler] = useState(false);

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    passwordConfirmation: "",
  }) as any;
  const { email, password, passwordConfirmation } = signUpForm;

  const [error, setError] = useState({ isError: false, content: "" }) as any;
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [signUpState, setSignUpState] = useState(false);

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsFormSubmitting(true);

    if (
      email.length == 0 ||
      password.length == 0 ||
      passwordConfirmation == 0
    ) {
      return setError((state: any) => {
        setIsFormSubmitting(false);
        return {
          isError: true,
          content: { message: "Unable to sign up with incomplete data" },
        };
      });
    }

    if (password !== passwordConfirmation) {
      return setError((state: any) => {
        setIsFormSubmitting(false);
        return {
          isError: true,
          content: { message: "Passwords dont match" },
        };
      });
    }

    axios
      .post(
        `${import.meta.env.VITE_BACKEND_PORT}/auth/signup`,
        { email, password, passwordConfirmation },
        { withCredentials: true }
      )
      .then(function (response: any) {
        console.log("signup", response);

        if (
          response.status == 200 &&
          response.data.code == 200 &&
          response.data.status
        ) {
          dispatch(signup({ email, password, _id: response.data._id }));

          setSignUpState(true);

          setTimeout(() => {
            return navigate(redirectPath, { replace: true });
          }, 3000);
        } else {
          setError((state: any) => {
            console.log(state);
            return { isError: true, content: response.data };
          });

          // setTimeout(() => {
          //   setError({ isError: false, content: "" });
          // }, 10000);
        }
      })
      .catch(function (error) {
        console.log(error.response);
      });
    setIsFormSubmitting(false);

    // return navigate(redirectPath, { replace: true });
  };

  return (
    <div className="signup-page-container">
      <div className="signup-form-container">
        {signUpState && (
          <div className="success-container">
            <div className="success-message-container">
              {" "}
              <img src="/rings.svg" alt="" /> <p>Creating your account</p>
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
          <p className="sign-up">Sign Up</p>
          {/* <div className="error-container visibility-visible"> */}
        </div>
        <form>
          <div className="label-input-container">
            <label htmlFor="email">Email</label>
            <input
              required
              placeholder="john@email.com"
              disabled={isFormSubmitting}
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
              name="email"
              value={email}
              type="email"
              onChange={(e) =>
                setSignUpForm((state: any) => {
                  return { ...state, [e.target.name]: e.target.value };
                })
              }
            />
          </div>
          <div className="label-input-container">
            <label htmlFor="password">Password</label>
            <input
              placeholder=" "
              required
              disabled={isFormSubmitting}
              pattern="(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$"
              name="password"
              value={password}
              onChange={(e) =>
                setSignUpForm((state: any) => {
                  return { ...state, [e.target.name]: e.target.value };
                })
              }
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
              required
              placeholder=" "
              pattern="(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$"
              disabled={isFormSubmitting}
              name="passwordConfirmation"
              value={passwordConfirmation}
              onChange={(e) =>
                setSignUpForm((state: any) => {
                  return { ...state, [e.target.name]: e.target.value };
                })
              }
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
          {/* <button
            onClick={(e) => {
              e.preventDefault();
              console.log(signUpForm);
            }}
          >
            Sign Up
          </button> */}
          <button onClick={handleSignUp} disabled={isFormSubmitting}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
