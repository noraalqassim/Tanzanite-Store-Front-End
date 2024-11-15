import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Jewelry.css";
import { FaHeart } from "react-icons/fa6";

export default function Jewelry(prop) {
  const { jewelryItem, wishList, setWishList } = prop;

  const isFavorited = wishList.some(
    (item) => item.jewelryId === jewelryItem.jewelryId
  );

  useEffect(() => {
    const storedWishList = localStorage.getItem("wishList");
    const storedIsFavorited = localStorage.getItem("isFavorited");

    if (storedWishList) {
      setWishList(JSON.parse(storedWishList));
    }
  }, []);

  function addToFav(jewelryItem) {
    const isInclude = wishList.some(
      (item) => item.jewelryId === jewelryItem.jewelryId
    );
    if (!isInclude) {
      const updatedWishList = [...wishList, jewelryItem];
      setWishList(updatedWishList);
      localStorage.setItem("wishList", JSON.stringify(updatedWishList));
    } else {
      const updatedWishList = wishList.filter(
        (item) => item.jewelryId !== jewelryItem.jewelryId
      );
      setWishList(updatedWishList);
      localStorage.setItem("wishList", JSON.stringify(updatedWishList));
    }
  }

  return (
      <div className="jewelry-card-item">
        <Link to={`${jewelryItem.jewelryId}`} style={{ textDecoration: "none" }}>
        <div className="tumb">
          <img
            src={jewelryItem.jewelryImage[0]}
            alt={jewelryItem.jewelryName}
          />
        </div>
        </Link>
        <div className="details">
          <h4>{jewelryItem.jewelryName}</h4>
          <p className="product-type">{jewelryItem.jewelryType}</p>
          <div className="botton-details">
            <div className="price">${jewelryItem.finalProductPrice}</div>
            <div className="wishList">
              <a
                onClick={() => addToFav(jewelryItem)}
                style={{ color: isFavorited ? "#AF1740" : "#bfa670" }}
              >
                <FaHeart />
              </a>
            </div>
          </div>
        </div>
      </div>
  );
}
