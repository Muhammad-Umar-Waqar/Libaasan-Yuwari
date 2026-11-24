import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../store/appSlice";

export const JoinSection = () => {
  const dispatch = useDispatch();
  const waNumRef = useRef(null);

  const handleCopyWa = () => {
    const num = "03223073779";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(num).then(
        () => dispatch(showToast("Number copied")),
        () => selectWa()
      );
    } else {
      selectWa();
    }
  };

  const selectWa = () => {
    if (waNumRef.current) {
      const r = document.createRange();
      r.selectNodeContents(waNumRef.current);
      const s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
      dispatch(showToast("Number selected. Copy it from here."));
    }
  };

  return (
    <section className="band join" id="join">
      <div className="wrap">
        <div>
          <h2>Be the first to see new designs</h2>
          <p>Join us on WhatsApp for new arrivals and size help.</p>
        </div>
        <div className="wa-wrap">
          <a
            className="wa-go"
            href="https://wa.me/923223073779?text=Assalamu%20alaikum%21%20I%27d%20like%20help%20choosing%20a%20size."
            target="_blank"
            rel="noopener noreferrer"
          >
            Chat on WhatsApp
          </a>
          <div className="wa">
            <b id="waNum" ref={waNumRef}>
              0322 3073779
            </b>
            <button type="button" id="copyWa" onClick={handleCopyWa}>
              Copy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
