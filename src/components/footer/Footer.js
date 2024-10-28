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
        <h1 class="text-center">Tanzanite Store</h1>
        <p class="text-center">
          Where timeless beauty meets personalized design.
        </p>
        <div class="icons text-center">
          <a
            href="https://twitter.com"
            target="_blank"
            class="text-decoration-none"
          >
            <BsTwitterX />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            class="text-decoration-none"
          >
            <BsInstagram />
          </a>
          <a
            href="https://github.com/NoraAlqassim"
            target="_blank"
            class="text-decoration-none"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/noraalqassim12"
            target="_blank"
            class="text-decoration-none"
          >
            <ImLinkedin />
          </a>
          <a href="mailto:noraalqassim@gmail.com" class="text-decoration-none">
            <HiOutlineMail />
          </a>
        </div>
        <div class="copyright text-center">
          &copy; Copyright <strong>Tanzanite Store</strong> .All Rights Reserved
        </div>
        <div class="credite text-center">
          Creating By
          <a href="https://github.com/NoraAlqassim" target="_blank"
            class="text-decoration-none">
            <span> Norah Alqassim</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
