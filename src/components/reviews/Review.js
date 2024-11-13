import React from "react";
import userProfileImag from "../../images/userImage.jpeg";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Rating from "@mui/material/Rating";
import "./Review.css";
export default function Review(prop) {
  const { reivew } = prop;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="review-box">
      <div className="review-box-top">
        <div className="review-user-profile">
          <div className="review-profile-imge">
            <img src={userProfileImag} alt="profile Imag" />
          </div>
          <div className="name-user">
            <strong>{reivew.user.name}</strong>
            <span>{reivew.user.email}</span>
          </div>
        </div>
        <div className="reviews-rating">
          <Rating
            name="read-only"
            value={reivew.reviewRating}
            readOnly
            icon={
              <AiFillStar style={{ color: "#ffc107", fontSize: "1.5rem" }} />
            } // Filled star icon
            emptyIcon={
              <AiOutlineStar style={{ color: "#ccc", fontSize: "1.5rem" }} />
            }
          />
        </div>
      </div>
      <div className="client-comment">
        <span>{reivew.reviewDate}</span>
        <p>{reivew.reviewComment}</p>
      </div>
    </div>
  );
}
