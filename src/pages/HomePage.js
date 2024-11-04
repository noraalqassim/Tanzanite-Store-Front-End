import React from "react";
import Hero from "../components/hero/Hero";
import { ContactUs } from "../components/contact/ContactUs";


export default function HomePage() {
  return (
    <div>
      <Hero/>
      <section style={{ borderBottom: "1px solid #ccc", borderTop: "1px solid #ccc",paddingBottom: "10px"}}>
      <ContactUs/>
      </section>
    </div>
  );
}
