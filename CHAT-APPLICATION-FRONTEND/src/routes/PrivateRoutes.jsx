import React from "react";
import { Navigate } from "react-router-dom";
import { routes } from "../utils/constants";

const PrivateRoutes = ({ children }) => {
  let sessionToken = localStorage.getItem("sessionToken");
  if (!sessionToken) {
    return <Navigate to={routes.AUTH} />;
  } else {
    return children;
  }
};

export default PrivateRoutes;
