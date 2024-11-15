import React from "react";

import NavBar from "../navbar/NavBar";
import Footer from "../footer/Footer";
import { Outlet } from "react-router-dom";
export default function LayOut(prop) {
  const { wishList, isAuthenticated, userData,cartList } = prop;
  return (
    <div>
      <NavBar
        wishList={wishList}
        isAuthenticated={isAuthenticated}
        userData={userData}
        cartList={cartList}
      />
      <Outlet />
      <Footer />
    </div>
  );
}
