import React, { useState } from "react";

import "./NavBar.css";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import { FaRegUser, FaHeart, FaShoppingBasket } from "react-icons/fa";
export default function NavBar() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="sticky-top">
      <div className="navbar-top">
        <div className="contact">Contact Us</div>
        <div className="logo">
          <h3>Tanzanite Store</h3>
        </div>
        <div className="icons">
          <i>
            <Link to="/">
              <FaHeart />
            </Link>
          </i>
          <i>
            <Link to="/">
              <FaShoppingBasket />
            </Link>
          </i>

          <i>
            <Link to="/register">
              <FaRegUser />
            </Link>
          </i>
        </div>
      </div>
      <div className="main-content">
        <nav className="navbar navbar-expand-md" id="navbar-color">
          <div className="container">
            <button
              className="navbar-toggler"
              type="button"
              onClick={toggleNavbar}
            >
              <span>
                <i>
                  <IoMenu />
                </i>
              </span>
            </button>
            <div
              className={`collapse navbar-collapse ${
                isCollapsed ? "" : "show"
              }`}
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/gemstone" className="nav-link">
                    Gemstone
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/jewelry" className="nav-link">
                    Jewelry
                  </Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    How to Customize Your Piece
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">
                    About Us
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
}
