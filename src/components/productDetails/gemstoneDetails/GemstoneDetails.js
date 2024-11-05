import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./GemstoneDetails.css";
import Loading from "../../loading/Loading";
import NotFound from "../../error/NotFound";
export default function GemstoneDetails() {
    const { gemstoneId } = useParams();

    const [gemDetail, setgemDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    const jewelryDetailUrl = `http://localhost:5125/api/v1/Gemstone/${gemstoneId}`;
  
    function fetchProductDetail() {
      axios
        .get(jewelryDetailUrl)
        .then((response) => {
          setgemDetail(response.data);
          setLoading(false);
        })
  
        .catch((error) => {
          setError("Error");
          setLoading(true);
        });
    }
  
    useEffect(() => {
      fetchProductDetail();
    }, [gemstoneId]);
  
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
  
    return <div>
    <div className="wrapper-product">
      <div className="product-img">
        <img
          src={gemDetail.gemstoneImages[0]}
          alr={gemDetail.gemstoneType}
        />
      </div>
      <div className="product-info">
        <div className="product-text">
          <h1>{gemDetail.gemstoneType}</h1>
          <h2>{gemDetail.category.categoryName}</h2>
          <p>{gemDetail.carvingName},{gemDetail.gemstoneColor} </p>
          <p>{gemDetail.gemstoneDescription}</p>
        </div>
        <div className="product-price-btn">
          <p> {gemDetail.gemstonePrice} $</p>
          <button type="button">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
  }
  