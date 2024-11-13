import React from "react";
import Review from "./Review";
import "./Reviews.css";
import Slider from "react-slick";
export default function Reviews(prop) {
  const { reviewList, setReviewList } = prop;
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="review">
      <div className="review-contener">
        <div className="section-heeder">
          <h2 className="review-title"> What our clients say?</h2>

          <div className="review-center">
              <Slider {...settings}>
                {reviewList.map((reivew) => (
                  <Review key={reivew.reviewId} reivew={reivew} />
                ))}
              </Slider>
          </div>
        </div>
      </div>
    </section>
  );
}
