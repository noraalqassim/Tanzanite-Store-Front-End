import React from "react";

import "../whishlist/WishListItem.css";
import { MdDeleteOutline } from "react-icons/md";
export default function WishListItem(prop) {
  const { item, deleteItem } = prop;

  const handleDelete = () => {
    deleteItem(item.id);
  };
  return (
    <div className="wishlist-border">
      <div className="wishlist-item">
        <div className="delet-wishlist-button">
          <MdDeleteOutline   onClick={handleDelete}/>
        </div>
        <div className="wishlist-image">
          <img src={item.image} style={{ width: 60 }} alt={item.title} />
        </div>
        <div className="wishlist-description">{item.title}</div>
        <div className="wishlist-price">${item.price}</div>
      </div>
    </div>
  );
}
