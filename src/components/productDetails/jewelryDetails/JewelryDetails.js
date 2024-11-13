import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./JewelryDetails.css";
import Loading from "../../loading/Loading";
import NotFound from "../../error/NotFound";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export default function JewelryDetails(prop) {
  const { cartList, setCartList } = prop;
  const { jewelryId } = useParams();

  const [isGemstoneInfoVisible, setIsGemstoneInfoVisible] = useState(false);
  const [isJewelryInfoVisible, setIsJewelryInfoVisible] = useState(false);
  const [jewelryDetail, setjewelryDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const jewelryDetailUrl = `http://localhost:5125/api/v1/Jewelry/${jewelryId}`;

  function fetchProductDetail() {
    axios
      .get(jewelryDetailUrl)
      .then((response) => {
        setjewelryDetail(response.data);
        setLoading(false);
      })

      .catch((error) => {
        setError("Error");
        setLoading(true);
      });
  }

  useEffect(() => {
    fetchProductDetail();
  }, [jewelryId]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div>
        <NotFound />
      </div>
    );
  }

  function addToCart(jewelryDetail) {
    const isInclude = cartList.some(
      (item) => item.jewelryId === jewelryDetail.jewelryId
    );
    if (!isInclude) {
      setCartList([...cartList, { ...jewelryDetail, quantity: 1 }]);
    }
  }
  console.log("cartList form jewelry detels", cartList);

  const allHoverImages = document.querySelectorAll(".hover-container div img");
  const imgContainer = document.querySelector(".img-container");

  window.addEventListener("DOMContentLoaded", () => {
    allHoverImages[0].parentElement.classList.add("active");
  });

  //active image 
  allHoverImages.forEach((image) => {
    image.addEventListener("mouseover", () => {
      imgContainer.querySelector("img").src = image.src;
      resetActiveImg();
      image.parentElement.classList.add("activeImage");
    });
  });

  function resetActiveImg() {
    allHoverImages.forEach((img) => {
      img.parentElement.classList.remove("activeImage");
    });
  }
  
  const toggleGemstoneInfo = () => {
    setIsGemstoneInfoVisible(!isGemstoneInfoVisible);
  };
  const toggleJewelryInfo = () => {
    setIsJewelryInfoVisible(!isJewelryInfoVisible);
  };
  return (
    <div>
      <div className="main-wrapper">
        <div className="container">
          <div className="product-div">
            <div className="product-div-left">
              <div className="img-container">
                <img
                  src={jewelryDetail.jewelryImage[0]}
                  alr={jewelryDetail.jewelryName}
                />
              </div>
              <div className="hover-container">
                <div className="img-div">
                  <img
                    src={jewelryDetail.jewelryImage[0]}
                    alr={jewelryDetail.jewelryName}
                  />
                </div>
                <div className="img-div">
                  <img
                    src={jewelryDetail.jewelryImage[1]}
                    alr={jewelryDetail.jewelryName}
                  />
                </div>
                <div className="img-div">
                  <img
                    src={jewelryDetail.gemstone.gemstoneImages[0]}
                    alr={jewelryDetail.gemstone.gemstoneName}
                  />
                </div>
                <div className="img-div">
                  <img
                    src={jewelryDetail.gemstone.gemstoneImages[1]}
                    alr={jewelryDetail.gemstone.gemstoneName}
                  />
                </div>
              </div>
            </div>
            <div className="product-div-right">
              <span className="product-name">{jewelryDetail.jewelryName}</span>
              <span className="product-price">
                $ {jewelryDetail.finalProductPrice}
              </span>
              <div className="product-rating">
                <span>
                  <i>
                    <FaStar style={{ color: "gold" }} />
                  </i>
                </span>
                <span>
                  <i>
                    <FaStar style={{ color: "gold" }} />
                  </i>
                </span>
                <span>
                  <i>
                    <FaStar style={{ color: "gold" }} />
                  </i>
                </span>
                <span>
                  <i>
                    <FaStar style={{ color: "gold" }} />
                  </i>
                </span>
                <span>
                  <i>
                    <FaStarHalfAlt style={{ color: "gold" }} />
                  </i>
                </span>
                <span style={{ color: "#6c6c6c" }}>(350 ratings)</span>
              </div>
              <p className="product-description">{jewelryDetail.description}</p>
              <h5 className="gemstonInfo-h5" onClick={toggleJewelryInfo}>
                Jewelry Piece Information:{" "}
                {isJewelryInfoVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </h5>
              {isJewelryInfoVisible && (
                <div className="product-gemstone-description">
                  <p className="gemstonInfo">
                    Type: {jewelryDetail.jewelryType}
                  </p>
                  <p className="gemstonInfo">
                    Price Without Gemstone: ${jewelryDetail.jewelryPrice}
                  </p>
                </div>
              )}

              <h5 className="gemstonInfo-h5" onClick={toggleGemstoneInfo}>
                Gemstone Information:{" "}
                {isGemstoneInfoVisible ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </h5>
              {isGemstoneInfoVisible && (
                <div className="product-gemstone-description">
                  <p className="gemstonInfo">
                    Name: {jewelryDetail.gemstone.gemstoneName}
                  </p>
                  <p className="gemstonInfo">
                    Color: {jewelryDetail.gemstone.gemstoneColor}
                  </p>
                  <p className="gemstonInfo">
                    Carving Shape:{" "}
                    {jewelryDetail.gemstone.category.categoryName}
                  </p>
                  <p className="gemstonInfo">
                    Weight (in Carat): {jewelryDetail.gemstone.weight}
                  </p>
                  <p className="gemstonInfo">
                    Price: ${jewelryDetail.gemstone.gemstonePrice}
                  </p>
                  <p className="gemstonInfo">Description:</p>
                  <p className="gemstonInfo-discription">
                    {jewelryDetail.gemstone.gemstoneDescription}
                  </p>
                </div>
              )}

              <div className="btn-groups">
                <button
                  onClick={() => addToCart(jewelryDetail)}
                  type="button"
                  className="add-cart-btn"
                >
                  add to cart <FaCartShopping />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
