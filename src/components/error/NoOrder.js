import React from 'react'
import { Link } from "react-router-dom";

import Lottie from "lottie-react";
import NoOrderAnimation from "../../animation/NoOrderAnimation.json";
export default function NoOrder() {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Lottie animationData={NoOrderAnimation} style={{ width: "300px" }} />
      </div>
      <h1>No Orders Found</h1>
      <h5>
      Your Order History appears empty! Fill it with your previous purchases for a nostalgic shopping experience!
      </h5>
      <Link to="/jewelry">
        <button className="button" role="button">
          Jewelry
        </button>
      </Link>
    </div>
  )
}
