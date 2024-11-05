import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Jewelry.css";
import { FaHeart } from "react-icons/fa";

export default function Jewelry(prop) {
  const { jewelryItem, wishList, setWishList } = prop;

  const isFavorited = wishList.some((item) => item.id === jewelryItem.jewelryId);

  useEffect(() => {
    const storedWishList = localStorage.getItem("wishList");
    if (storedWishList) {
      setWishList(JSON.parse(storedWishList));
    }
  }, []);

  function addToFav(jewelryItem) {
    const isInclude = wishList.some((item) => item.id === jewelryItem.jewelryId);
    if (!isInclude) {
      const updatedWishList = [...wishList, jewelryItem];
      setWishList(updatedWishList);

      localStorage.setItem("wishList", JSON.stringify(updatedWishList));
      localStorage.setItem("isFavorited", JSON.stringify(true));
    } else {
      const updatedWishList = wishList.filter((item) => item.id !== jewelryItem.jewelryId);
      setWishList(updatedWishList);

      localStorage.setItem("wishList", JSON.stringify(updatedWishList));
      localStorage.setItem("isFavorited", JSON.stringify(false));
    }
  }

  return (
    <div className="jewelry-card-item">
      <div className="tumb">
        <img src={jewelryItem.jewelryImage[0]} alt={jewelryItem.jewelryName} />
      </div>
      <div className="details">
        <h4>
          <Link to={`/${jewelryItem.jewelryId}`}>
            {jewelryItem.jewelryName}
          </Link>
        </h4>
        <div className="botton-details">
          <div className="price">${jewelryItem.jewelryPrice}</div>
          <div className="wishList">
            <a
              onClick={() => addToFav(jewelryItem)}
              style={{ color: isFavorited ? "#85654d" : "#BF9270" }}
            >
              <FaHeart />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}