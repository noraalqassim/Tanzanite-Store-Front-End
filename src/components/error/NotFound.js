import React from "react";

import "./NotFound.css";
import Lottie from "lottie-react";
import NotFoundAnimatopn from "../../animation/NotFoundAnimatopn.json";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div className="notfoun">
      <div className="content-container">
        <div className="notFoundContainer">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Lottie
              animationData={NotFoundAnimatopn}
              style={{ width: "300px" }}
            />
          </div>
          <h2>Oops! It seems like you've unearthed a rare Gmestone!!</h2>
          <p>
            a page that's as elusive as a hidden treasure. back to the homepage
            to continue your quest for the perfect jewel.
          </p>
          <Link to="/">
            <button className="button" role="button">
              Home
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
