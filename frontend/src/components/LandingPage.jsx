import React from "react";
import Navbar from "./Navbar";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className="landing-container">
      <div className="overlay"></div>
      <Navbar />
      <div className="hero">
        <h1 className="hero-title">
          🚀 Employee & Leave Management System
        </h1>
        <p className="hero-subtitle">
          Manage employees, track leaves, and streamline HR operations all in one place.
        </p>
        <div className="button-group">
          <button className="explore-btn">✨ Explore Features</button>
          <button className="learn-btn">📘 Learn More</button>
        </div>
      </div>
    </div>
  );
}
