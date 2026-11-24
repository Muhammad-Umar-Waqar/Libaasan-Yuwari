import React from "react";
import { useDispatch } from "react-redux";
import { setSizeChartOpen } from "../store/appSlice";

export const Footer = () => {
  const dispatch = useDispatch();

  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <div className="footer-logo-row">
              <b className="footer-title">Libaasan Yuwaari</b>
              <span className="footer-tagline">Growing in Grace</span>
            </div>
            <p className="footer-sub">Modest clothing for girls, 3 to 15.</p>
            <div className="footer-badges">
              <span className="footer-badge">Cash on Delivery</span>
              <span className="footer-badge">Easy Size Exchange</span>
              <span className="footer-badge">Online Store</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Explore</h4>
            <ul className="footer-list">
              <li>
                <a
                  href="#sizechart"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(setSizeChartOpen(true));
                  }}
                >
                  Size Chart & Guide
                </a>
              </li>
              <li>
                <a href="#grow">Shop by Age</a>
              </li>
              <li>
                <a href="#story">Our Name & Story</a>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="footer-col">
            <h4 className="footer-heading">Contact & Help</h4>
            <ul className="footer-list">
              <li>
                <a href="mailto:contact@libaasanyuwaari.com" className="footer-link-mail">
                  <svg
                    viewBox="0 0 24 24"
                    width="15"
                    height="15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span>contact@libaasanyuwaari.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/923223073779?text=Assalamu%20alaikum%21%20I%27d%20like%20help%20choosing%20a%20size."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link-wa"
                >
                  <span>Helpline: 0322 3073779</span>
                </a>
              </li>
              <li className="footer-text-muted">
                Delivery all across Pakistan
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} <b>Libaasan Yuwaari</b>. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="https://www.libaasanyuwaari.com" target="_blank" rel="noopener noreferrer">
              www.libaasanyuwaari.com
            </a>
            <span className="sep">·</span>
            <a href="https://instagram.com/libaasanyuwaari" target="_blank" rel="noopener noreferrer">
              @libaasanyuwaari
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
