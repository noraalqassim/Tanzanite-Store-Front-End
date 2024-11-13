import React from "react";

import "./Footer.css";
import { BsTwitterX, BsInstagram } from "react-icons/bs";
import { FaGithub } from "react-icons/fa";
import { ImLinkedin } from "react-icons/im";
import { HiOutlineMail } from "react-icons/hi";
export default function Footer() {
  return (
    <div>
      <footer id="footer" data-aos="fade-up" data-aos-duration="1500">
        <h1 className="text-center">Tanzanite Store</h1>
        <p className="text-center">Where timeless beauty meets our jewelry.</p>
        <div className="icons text-center">
          <a
            href="https://twitter.com"
            target="_blank"
            className="text-decoration-none"
          >
            <BsTwitterX />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            className="text-decoration-none"
          >
            <BsInstagram />
          </a>
          <a
            href="https://github.com/NoraAlqassim"
            target="_blank"
            className="text-decoration-none"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/noraalqassim12"
            target="_blank"
            className="text-decoration-none"
          >
            <ImLinkedin />
          </a>
          <a
            href="mailto:noraalqassim@gmail.com"
            className="text-decoration-none"
          >
            <HiOutlineMail />
          </a>
        </div>
        <div className="copyright text-center">
          &copy; Copyright <strong>Tanzanite Store</strong> .All Rights Reserved
        </div>
        <div className="credite text-center">
          Creating By
          <a
            href="https://github.com/NoraAlqassim"
            target="_blank"
            className="text-decoration-none"
          >
            <span> Norah Alqassim</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
