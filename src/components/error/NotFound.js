import React from "react";

import "./NotFound.css";
import { Link } from "react-router-dom";
export default function NotFound() {
  return (
    <div>
      <div className="content-container">
        <div className="notFoundContainer">
          <h1>404</h1>
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
