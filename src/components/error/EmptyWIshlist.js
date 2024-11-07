import React from "react";
import { Link } from "react-router-dom";

import Lottie from "lottie-react";
import emptyWishlistAnimation from "../../animation/emptyWishlist.json";
export default function EmptyWIshlist() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Lottie
          animationData={emptyWishlistAnimation}
          style={{ width: "300px" }}
        />
      </div>
      <h1>Empty Wishlist</h1>
      <p>
        Sparkle up your wishlist! Add dazzling jewelry pieces to your collection
        today!!
      </p>
      <Link to="/jewelry">
        <button className="button" role="button">
          Jewelry
        </button>
      </Link>
    </div>
  );
}
