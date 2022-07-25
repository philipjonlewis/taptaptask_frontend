import React, { useState } from "react";

const SignUp = () => {
  const [displayPassword, displayPasswordHandler] = useState(false);

  return (
    <div className="signup-page-container">
      <div className="signup-form-container">
        <div className="title-container">
          <p>Sign Up</p>
        </div>
        <form>
          <div className="label-input-container">
            <label htmlFor="email">Email</label>
            <input name="email" type="email" />
          </div>
          <div className="label-input-container">
            <label htmlFor="password">Password</label>
            <input
              pattern="(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,32}$"
              name="password"
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
              type={displayPassword ? "text" : "password"}
            />
          </div>
          <div className="password-requirements">
            <p>Password Requirements</p>
            <p>Must be at least 6 characters short and 32 characters long.</p>
            <p>Must have at least one(1) number</p>
            <p>Must have at least one(1) uppercase letter</p>
            <p>Must have at least one(1) lowercase letter</p>
            <p>
              Must have at least one(1) of the following characters : ! @ # $ %
              ^ & *
            </p>
          </div>
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
