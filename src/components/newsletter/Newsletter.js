import React from 'react'

import "./Newsletter.css";
export default function Newsletter() {
  return (
    <section id="newsletter">
    <div class="newsletter-form">
      <div class="newsletter-container">
        <div class="newsletter-box">
          <h2>Subscribe our Newsletter</h2>
          <p>Don't miss out! Subscribe for exclusive updates!</p>
          <form >
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email.."
              required
            />
            <button>Subscribe</button>
          </form>
        </div>
      </div>
    </div>
  </section>
  )
}
