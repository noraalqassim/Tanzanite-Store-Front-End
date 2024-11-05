import React, { useEffect } from 'react'

import {Link} from "react-router-dom";
import { FaHeart } from "react-icons/fa6";
export default function Gemstone(prop) {

    const { gemstoneItem, wishList, setWishList } = prop;
    const isFavorited = wishList.some(
      (item) => item.id === gemstoneItem.gemstoneId
    );
  
    useEffect(() => {
      const storedWishList = localStorage.getItem("wishList");
      const storedIsFavorited = localStorage.getItem("isFavorited");
  
      if (storedWishList) {
        setWishList(JSON.parse(storedWishList));
      }
    }, []);
  
    function addToFav(gemstoneItem) {
      const isInclude = wishList.some(
        (item) => item.id === gemstoneItem.gemstoneId
      );
      if (!isInclude) {
        const updatedWishList = [...wishList, gemstoneItem];
        setWishList(updatedWishList);
  
        localStorage.setItem("wishList", JSON.stringify(updatedWishList));
        localStorage.setItem("isFavorited", JSON.stringify(true));
      } else {
        if (isInclude) {
          const updatedWishList = wishList.filter(
            (item) => item.id !== gemstoneItem.gemstoneId
          );
          setWishList(updatedWishList);
  
          localStorage.setItem("wishList", JSON.stringify(updatedWishList));
        }
      }
    }
    console.log("GemstoneList props:", prop);

  return (
    <div className="jewelry-card-item">
      <div className="tumb">
        <img src={gemstoneItem.gemstoneImages[0]} alt={gemstoneItem.gemstoneType} />
      </div>
      <div className="details">
        <span className="category">{gemstoneItem.category.categoryName}</span>
        <h4>
          <Link to={`${gemstoneItem.gemstoneId}`}>
            <a href="">{gemstoneItem.gemstoneType}</a>
          </Link>
        </h4>
        <div className="botton-details">
          <div className="price"> ${gemstoneItem.gemstonePrice}</div>
          <div className="wishList">
            <a
              onClick={() => addToFav(gemstoneItem)}
              style={{ color: isFavorited ? "#85654d" : "#BF9270" }}
            >
              <FaHeart />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
