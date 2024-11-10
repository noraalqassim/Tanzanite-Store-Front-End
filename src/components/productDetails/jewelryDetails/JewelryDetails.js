import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import "./JewelryDetails.css";
import Loading from "../../loading/Loading";
import NotFound from "../../error/NotFound";
export default function JewelryDetails(prop) {
  const { cartList, setCartList } = prop;
  const { jewelryId } = useParams();

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

  return (
    <div>
      <div className="wrapper-product">
        <div className="product-img">
          <img
            src={jewelryDetail.jewelryImage[0]}
            alr={jewelryDetail.jewelryName}
          />
        </div>
        <div className="product-info">
          <div className="product-text">
            <h1>{jewelryDetail.jewelryName}</h1>
            <h2>{jewelryDetail.jewelryType}</h2>
            <p>{jewelryDetail.description}</p>
          </div>
          <div className="product-price-btn">
            <p> {jewelryDetail.jewelryPrice} $</p>

            <button onClick={() => addToCart(jewelryDetail)} type="button">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
