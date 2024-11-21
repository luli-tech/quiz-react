import React, { useState } from "react";
import "./navbar.css";
import Footer from "./footer";
import { Outlet } from "react-router-dom";
const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <a href="/">LuliQuiz</a>
          </div>

          {/* Desktop Menu */}
          <ul
            className={`navbar-links ${isMobileMenuOpen ? "mobile-menu" : ""}`}
          >
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>

          {/* Hamburger Icon for Mobile */}
          <div className="hamburger" onClick={toggleMobileMenu}>
            <span className="line"></span>
            <span className="line"></span>
            <span className="line"></span>
          </div>
        </div>
      </nav>
      <div className="outlet">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Navbar;
