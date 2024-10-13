import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-light py-4 mt-5">
      <div className="container">
        <div className="row">
          {/* About Section */}
          <div className="col-md-4 mb-3">
            <h5>About PlanMyEscape</h5>
            <p className="text-muted">
              PlanMyEscape helps you organize your perfect vacation effortlessly
              with the power of AI. Calculate time-off, plan your budget, and
              explore destinations—all in one place.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="col-md-4 mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-muted">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/plan" className="text-muted">
                  Start Planning
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-muted">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="col-md-4 mb-3 text-center text-md-start">
            <h5>Follow Us</h5>
            <div>
              {/* Placeholder links; replace "#" with actual URLs to your social media */}
              <Link to="#" className="text-muted me-3" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </Link>
              <Link to="#" className="text-muted me-3" aria-label="Twitter">
                <i className="bi bi-twitter"></i>
              </Link>
              <Link to="#" className="text-muted me-3" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </Link>
              <Link to="#" className="text-muted" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center mt-3">
          <small className="text-muted">
            &copy; {new Date().getFullYear()} PlanMyEscape. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
