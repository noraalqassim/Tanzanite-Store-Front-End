import React from "react";
import { Navigate } from "react-router-dom";
import Loading from "../loading/Loading";

export default function ProtectedRoute(prop) {
  const {
    loadingUserData,
    isAuthenticated,
    element,
    shouldCheckAdmin,
    userData,
  } = prop;

  if (loadingUserData) {
    return <Loading />;
  }

  //if is it Admin?
  if (shouldCheckAdmin) {
    return isAuthenticated && userData.role === "Admin" ? (
      element
    ) : (
      <Navigate to="/login" />
    );
  }
  return isAuthenticated ? element : <Navigate to="/login" />;
}
