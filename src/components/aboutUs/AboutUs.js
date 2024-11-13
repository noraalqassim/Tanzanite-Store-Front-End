import React from "react";
import "./AboutUs.css";
import {Link} from "react-router-dom"
import aboutImage from "../../images/aboutimage.png";
export default function AboutUs() {
  return (
    <div>
      <div className="about">
        <div className="about-container">
          <div className="about-title">
            <h1>About Us</h1>
          </div>
          <div className="about-content">
            <div className="article">
              <h3>
                Discover elegance and beauty in every piece. From dazzling
                diamonds to vibrant emeralds, our curated collection showcases
                exquisite craftsmanship and sophistication. At
                <strong>Tanzanite Store</strong>, experience the fusion of
                tradition and modern design in timeless pieces that make a
                statement. Each item reflects luxury and artistry, elevating
                your style effortlessly.
              </h3>
              <p>
                Indulge in the allure of precious stones at
                <strong>Tanzanite Store</strong>. Find your perfect piece that
                resonates with your unique style. Our dedication to elegance and
                quality ensures an inspiring shopping experience. Thank you for
                choosing <strong>Tanzanite Store</strong>. Let us adorn you with
                the brilliance of precious stones, guiding you on a journey to
                find that special piece that speaks to you.
              </p>
              <div className="about-btn">
                <Link to="/contactUs">
              <button class="button-51" role="button">contact us</button>  </Link>
              </div>
            </div>
          </div>
          <div className="about-image">
            <img src={aboutImage} alt="About" />
          </div>
        </div>
      </div>
    </div>
  );
}
