import React from "react";
import JewelryDetails from "../components/productDetails/jewelryDetails/JewelryDetails";

export default function JewelryDetialsPage(prop) {
  const{cartList, setCartList}=prop;
  return (
    <div>
      <JewelryDetails cartList={cartList} setCartList={setCartList}/>
    </div>
  );
}
