import React, { useEffect } from "react";

import "./Jewelry.css";
import { FaHeart } from "react-icons/fa6";
export default function Jewelry(prop) {
  const { jewelryItem, wishList, setWishList } = prop;
  const isFavorited = wishList.some(
    (item) => item.id === jewelryItem.jewelryId
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
      (item) => item.id === jewelryItem.jewelryId
    );
    if (!isInclude) {
      const updatedWishList = [...wishList, jewelryItem];
      setWishList(updatedWishList);

      localStorage.setItem("wishList", JSON.stringify(updatedWishList));
      localStorage.setItem("isFavorited", JSON.stringify(true));
    } else {
      if (isInclude) {
        const updatedWishList = wishList.filter(
          (item) => item.id !== jewelryItem.jewelryId
        );
        setWishList(updatedWishList);

        localStorage.setItem("wishList", JSON.stringify(updatedWishList));
      }
    }
  }

  return (
    <div className="jewelry-card-item">
      <div className="tumb">
        <img src={jewelryItem.jewelryImage[0]} alt={jewelryItem.jewelryName} />
      </div>
      <div className="details">
        {/* <span className="category">{product.category}</span> */}
        <h4>
          {jewelryItem.jewelryName}
          {/* <Link to={`${jewelryItem.JewelryId}`}>
            <a href="">{jewelryItem.JewelryName}</a>
          </Link> */}
        </h4>
        <div className="botton-details">
          <div className="price"> ${jewelryItem.jewelryPrice}</div>
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
