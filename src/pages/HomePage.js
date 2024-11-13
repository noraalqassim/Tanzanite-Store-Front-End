import React from "react";
import Hero from "../components/hero/Hero";
import { ContactUs } from "../components/contact/ContactUs";
import Reviews from "../components/reviews/Reviews";

export default function HomePage(prop) {
  const { reviewList, setReviewList } = prop;
  return (
    <div>
      <Hero />
      <section
        style={{
          borderTop: "1px solid #ccc",
          paddingBottom: "10px",
        }}
      >
        <Reviews reviewList={reviewList} setReviewList={setReviewList} />
      </section>
      <section
        style={{
          borderTop: "1px solid #ccc",
          paddingBottom: "10px",
        }}
      >
        <ContactUs />
      </section>
    </div>
  );
}
