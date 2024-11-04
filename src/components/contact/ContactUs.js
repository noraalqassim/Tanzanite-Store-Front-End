import React, { useRef } from "react";

import "./ContactUs.css";
import Lottie from "lottie-react";
import contactAnimation from "../../animation/contactAnimation.json";
import emailjs from "@emailjs/browser";
export const ContactUs = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_9vycorh", "template_v7ua15v", form.current, {
        publicKey: "VR-CbwFhncKBzjXRn",
      })
      .then(
        () => {
          alert("Email sent successfully!");
          console.log("SUCCESS!");
          form.current.reset();
        },
        (error) => {
          alert("Failed to send email. Please try again.");
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
      <div className="contact-container d-flex justify-content-center align-items-center" >
        <Lottie animationData={contactAnimation} className="contact-animaton" />

        <form className="contact-form" ref={form} onSubmit={sendEmail}>
          <h1 className="title text-center mb-4"> Contact us</h1>
          <div className="form-group position-relative">
            <label for="formName" className="d-block">
              <i classclassName="icon" data-feather="user"></i>
            </label>
            <input
              type="text"
              name="user_name"
              id="formName"
              className="form-control form-control-lg thick"
              placeholder="Name"
            />
          </div>

          <div className="form-group position-relative">
            <label for="formEmail" className="d-block">
              <i className="icon" data-feather="mail"></i>
            </label>
            <input
              type="email"
              name="user_email"
              id="formEmail"
              className="form-control form-control-lg thick"
              placeholder="E-mail"
            />
          </div>

          <div className="form-group message">
            <textarea
              name="message"
              id="formMessage"
              className="form-control form-control-lg"
              rows="7"
              placeholder="Mensagem"
            ></textarea>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary" tabIndex="-1"  value="Send">
              Send message
            </button>
          </div>
        </form>
      </div>
  );
};
