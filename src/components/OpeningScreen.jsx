import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectHasSeenOpening, setSeenOpening } from "../store/appSlice";

export const OpeningScreen = () => {
  const hasSeen = useSelector(selectHasSeenOpening);
  const dispatch = useDispatch();
  const [skipped, setSkipped] = useState(false);

  if (hasSeen) return null;

  const handleDismiss = () => {
    setSkipped(true);
    dispatch(setSeenOpening());
    document.querySelectorAll(".stage, .intro").forEach((el) => {
      el.style.animation = "none";
    });
  };

  return (
    <div
      id="opening"
      className={skipped ? "skip" : ""}
      aria-hidden="true"
      onClick={handleDismiss}
    >
      <svg viewBox="235 28 530 570">
        <use className="op-logo" href="#lyLogo" width="1000" height="1140" />
        <path
          className="op-draw"
          d="M330,478 L330,262 C330,160 440,118 500,42 C560,118 670,160 670,262 L670,478"
        />
      </svg>
      <div className="op-name">
        <span style={{ animationDelay: "1.50s" }}>L</span>
        <span style={{ animationDelay: "1.56s" }}>I</span>
        <span style={{ animationDelay: "1.62s" }}>B</span>
        <span style={{ animationDelay: "1.68s" }}>A</span>
        <span style={{ animationDelay: "1.74s" }}>A</span>
        <span style={{ animationDelay: "1.80s" }}>S</span>
        <span style={{ animationDelay: "1.86s" }}>A</span>
        <span style={{ animationDelay: "1.92s" }}>N</span>
        <span className="sp"></span>
        <span style={{ animationDelay: "2.04s" }}>Y</span>
        <span style={{ animationDelay: "2.10s" }}>U</span>
        <span style={{ animationDelay: "2.16s" }}>W</span>
        <span style={{ animationDelay: "2.22s" }}>A</span>
        <span style={{ animationDelay: "2.28s" }}>A</span>
        <span style={{ animationDelay: "2.34s" }}>R</span>
        <span style={{ animationDelay: "2.40s" }}>I</span>
      </div>
      <div className="op-tag">Growing in Grace</div>
    </div>
  );
};

export default OpeningScreen;
