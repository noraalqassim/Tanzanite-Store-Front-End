import React from "react";
import { Link } from "react-router-dom";

import Lottie from "lottie-react";
import emptyCartAnimation from "../../animation/emptyCart.json";
export default function EmptyCart() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Lottie animationData={emptyCartAnimation} style={{ width: "300px" }} />
      </div>
      <h1>Empty Cart!</h1>
      <h5>
        Your cart is feeling lonely! Fill it up with your favorite items for a
        delightful shopping experience.
      </h5>
      <Link to="/jewelry">
        <button className="button" role="button">
          Jewelry
        </button>
      </Link>
    </div>
  );
}
