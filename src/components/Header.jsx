import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectBagCount, setBagDrawerOpen } from "../store/bagSlice";
import { setSizeChartOpen } from "../store/appSlice";
import { ANNOUNCEMENTS } from "../data/catalog";

export const Header = () => {
  const dispatch = useDispatch();
  const bagCount = useSelector(selectBagCount);
  const [annIndex, setAnnIndex] = useState(0);
  const [annOpacity, setAnnOpacity] = useState(1);

  useEffect(() => {
    const isReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    const interval = setInterval(() => {
      setAnnOpacity(0);
      setTimeout(() => {
        setAnnIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
        setAnnOpacity(1);
      }, 400);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${targetId}`);
    } else {
      window.location.href = `/#${targetId}`;
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    const el = document.getElementById("top");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", "#top");
    } else {
      window.location.href = "/#top";
    }
  };

  return (
    <>


      <div className="announce" role="region" aria-label="Announcements">
        <div className="wrap">
          <span id="annText" style={{ opacity: annOpacity, transition: "opacity .4s" }}>
            {ANNOUNCEMENTS[annIndex]}
          </span>
        </div>
      </div>

      <header className="top">
        <div className="wrap">
          <a className="brand" href="#top" onClick={handleBrandClick}>
            <svg className="mark" viewBox="235 28 530 570" aria-hidden="true">
              <use href="#lyLogo" width="1000" height="1140" />
            </svg>
            <span>
              <b>Libaasan Yuwaari</b>
              <small>Growing in Grace</small>
            </span>
          </a>

          <nav className="links" aria-label="Main">
            <a href="#grow" onClick={(e) => handleNavClick(e, "grow")}>
              Shop by age
            </a>
            <a
              href="#sizechart"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setSizeChartOpen(true));
              }}
            >
              Size chart
            </a>
            <a href="#story" onClick={(e) => handleNavClick(e, "story")}>
              Our name
            </a>
            <a href="#join" onClick={(e) => handleNavClick(e, "join")}>
              Contact
            </a>
          </nav>

          <button
            className="bag"
            id="bagBtn"
            type="button"
            aria-label="Bag"
            onClick={() => dispatch(setBagDrawerOpen(true))}
          >
            Bag <span id="bagCount">{bagCount}</span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
