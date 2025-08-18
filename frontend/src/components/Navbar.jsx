import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">Leave Management</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/employees">Employees</Link></li>
        <li><Link to="/leave">Apply Leave</Link></li>
        <li><Link to="/requests">Leave Requests</Link></li>
      </ul>
    </nav>
  );
}
