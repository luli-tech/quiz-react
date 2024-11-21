import React from "react";
import { Link } from "react-router-dom";
import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link to="/" className="footer-link">
            Home
          </Link>
          <Link to="/" className="footer-link">
            About Us
          </Link>
          <Link to="/" className="footer-link">
            Contact
          </Link>
        </div>
        <div className="footer-social">
          <a
            href="https://www.facebook.com"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <a
            href="https://www.twitter.com"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Twitter
          </a>
          <a
            href="https://www.instagram.com"
            className="social-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            Instagram
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; created with Trivia API. made by LULI.</p>
      </div>
    </footer>
  );
};

export default Footer;
