import React from "react";
import { useDispatch } from "react-redux";
import { setSizeChartOpen } from "../store/appSlice";

export const Footer = () => {
  const dispatch = useDispatch();

  return (
    <footer>
      <div className="wrap">
        <span>
          <b>Libaasan Yuwaari</b> · Growing in Grace
        </span>
        <span>
          Online only · Cash on Delivery across Pakistan ·{" "}
          <a href="mailto:contact@libaasanyuwaari.com">contact@libaasanyuwaari.com</a> ·{" "}
          www.libaasanyuwaari.com · @libaasanyuwaari ·{" "}
          <a
            href="#sizechart"
            onClick={(e) => {
              e.preventDefault();
              dispatch(setSizeChartOpen(true));
            }}
          >
            Size chart
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
