import { Outlet, Navigate } from "react-router-dom";
import React from "react";

const PrivateRouting = () => {
  const token = JSON.parse(localStorage.getItem("token"));
  //   const token = "";
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRouting;
