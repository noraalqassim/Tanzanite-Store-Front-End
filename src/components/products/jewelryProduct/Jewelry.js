import React from "react";

export default function Jewelry(prop) {
  const { jewelryItem } = prop;
  return (
    <div>
      {/* <p>Jewelry</p> */}
      <img src={jewelryItem.jewelryImage[0]} alt={jewelryItem.JewelryName} />
      <p>{jewelryItem.JewelryName}</p>
      <p>{jewelryItem.JewelryPrice}$</p>
    </div>
  );
}
