import React from "react";
import { useSelector } from "react-redux";

import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    //Have an alert that you need to be able to login to go to this page.
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

export default RequireAuth;
