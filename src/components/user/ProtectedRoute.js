import React from "react";
import {Navigate} from "react-router-dom";
import Loading from "../loading/Loading";

export default function ProtectedRoute(prop) { 
  const { loadingUserData, isAuthenticated,element } = prop;

  if(loadingUserData){
    return <Loading/>
  }
  return isAuthenticated ? element :<Navigate to="/login"/>
}
