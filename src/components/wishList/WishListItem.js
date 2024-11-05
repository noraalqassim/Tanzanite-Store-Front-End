import React from "react";

import "./WishListItem.css";
import { MdDeleteOutline } from "react-icons/md";
export default function WishListItem(prop) {
  const { item, deleteItem } = prop;

  const handleDelete = () => {
    deleteItem(item.jewelryId);
  };
  return (
    <div className="wishlist-border">
      <div className="wishlist-item">
        <div className="delet-wishlist-button">
          <MdDeleteOutline   onClick={handleDelete}/>
        </div>
        <div className="wishlist-image">
          <img src={item.jewelryImage[0]} style={{ width: 60 }} alt={item.jewelryName} /> 
        </div>
        <div className="wishlist-description">{item.jewelryName}</div>
        <div className="wishlist-price">${item.jewelryPrice}</div>
      </div>
    </div>
  );
}
