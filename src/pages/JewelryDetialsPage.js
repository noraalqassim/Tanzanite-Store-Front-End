import React from "react";
import JewelryDetails from "../components/productDetails/jewelryDetails/JewelryDetails";

export default function JewelryDetialsPage(prop) {
  const{cartList, setCartList}=prop;
  return (
    <div>
      <h2>JewelryDetialsPage</h2>
      <JewelryDetails cartList={cartList} setCartList={setCartList}/>
    </div>
  );
}
