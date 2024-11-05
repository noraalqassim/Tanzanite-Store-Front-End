import React from "react";

import "./WishListItem.css";
import { MdDeleteOutline } from "react-icons/md";
export default function WishListGem(prop) {
  const { item, deleteItem } = prop;
  const handleDelete = () => {
    deleteItem(item.id);
  };

  return (
    <div className="wishlist-border">
      <div className="wishlist-item">
        <div className="delet-wishlist-button">
          <MdDeleteOutline onClick={handleDelete} />
        </div>
        <div className="wishlist-image">
          <img
            src={item.gemstoneImages[0]}
            style={{ width: 60 }}
            alt={item.gemstoneType}
          />
        </div>
        <div className="wishlist-description">{item.gemstoneType}</div>
        <div className="wishlist-price">${item.gemstonePrice}</div>
      </div>
    </div>
  );
}
