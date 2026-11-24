import React from "react";

export const BrandFeatures = () => {
  return (
    <section className="band">
      <div className="wrap">
        <h2 className="sec-title">
          Every piece covers, and every piece is comfortable
        </h2>
        <div className="why">
          <div>
            <svg
              viewBox="0 0 34 34"
              fill="none"
              stroke="#B48A4A"
              strokeWidth="1.8"
            >
              <path d="M6 32V15C6 9 12 6 17 2c5 4 11 7 11 13v17" />
            </svg>
            <h3>Modest by design</h3>
            <p>
              Full sleeves, longer lengths and loose fits in every piece, for
              every age.
            </p>
          </div>
          <div>
            <svg
              viewBox="0 0 34 34"
              fill="none"
              stroke="#B48A4A"
              strokeWidth="1.8"
            >
              <path d="M4 12c6-6 20-6 26 0M4 19c6-6 20-6 26 0M4 26c6-6 20-6 26 0" />
            </svg>
            <h3>Gentle on skin</h3>
            <p>Breathable cotton blends chosen for Pakistan's weather.</p>
          </div>
          <div>
            <svg
              viewBox="0 0 34 34"
              fill="none"
              stroke="#B48A4A"
              strokeWidth="1.8"
            >
              <rect x="4" y="9" width="26" height="17" rx="3" />
              <circle cx="17" cy="17.5" r="3.5" />
            </svg>
            <h3>Cash on Delivery</h3>
            <p>Pay when it arrives, anywhere in Pakistan.</p>
          </div>
          <div>
            <svg
              viewBox="0 0 34 34"
              fill="none"
              stroke="#B48A4A"
              strokeWidth="1.8"
            >
              <path d="M7 13h18l-5-5M27 21H9l5 5" />
            </svg>
            <h3>Easy size exchange</h3>
            <p>
              She grew faster than expected? Exchange the size within 7 days.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandFeatures;
