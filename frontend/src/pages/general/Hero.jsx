import React from "react";
import "../../styles/Hero.css";

const Hero = () => {
  return (
    <section className="hero-root" aria-label="Hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />

      <div className="hero-content">
        <h1 className="hero-logo">zomato</h1>
        <h2 className="hero-title">
          India’s #1
          <br />
          food delivery app
        </h2>
        <p className="hero-sub">
          Experience fast & easy online ordering with delightful food videos.
        </p>

        <div className="hero-cta">
          <button className="hero-btn primary">Order Now</button>
          <button className="hero-btn ghost">Explore Restaurants</button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
