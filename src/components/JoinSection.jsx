import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../store/appSlice";

export const JoinSection = () => {
  const dispatch = useDispatch();
  const waNumRef = useRef(null);
  const emailRef = useRef(null);

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

  const handleCopyEmail = () => {
    const email = "contact@libaasanyuwaari.com";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(email).then(
        () => dispatch(showToast("Email copied")),
        () => selectEmail()
      );
    } else {
      selectEmail();
    }
  };

  const selectEmail = () => {
    if (emailRef.current) {
      const r = document.createRange();
      r.selectNodeContents(emailRef.current);
      const s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
      dispatch(showToast("Email selected. Copy it from here."));
    }
  };

  return (
    <section className="band join" id="join">
      <div className="wrap">
        <div>
          <h2>Be the first to see new designs</h2>
          <p>Join us on WhatsApp or reach out via Email for new arrivals and size help.</p>
        </div>
        <div className="wa-wrap">
          <a
            className="wa-go"
            href="https://wa.me/923223073779?text=Assalamu%20alaikum%21%20I%27d%20like%20help%20choosing%20a%20size."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp with 0322 3073779"
          >
            <svg
              className="wa-icon"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M17.472 14.382c-.301-.15-1.78-.879-2.056-.98-.276-.1-.476-.15-.677.15-.2.301-.777.98-.953 1.18-.175.201-.351.226-.652.075-.301-.15-1.272-.469-2.423-1.496-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.131-.614.136-.135.301-.351.452-.527.15-.176.2-.301.3-.502.101-.2.05-.376-.025-.526-.075-.15-.677-1.633-.928-2.238-.244-.59-.493-.51-.677-.52l-.578-.01c-.2 0-.527.075-.803.376-.276.301-1.054 1.03-1.054 2.512 0 1.482 1.079 2.912 1.23 3.113.15.2 2.124 3.243 5.145 4.549.719.311 1.28.497 1.718.636.722.23 1.378.197 1.898.12.579-.087 1.78-.727 2.031-1.431.251-.703.251-1.306.176-1.431-.076-.126-.276-.201-.577-.352zM12.042 21.879h-.008a9.837 9.837 0 0 1-5.01-1.376l-.359-.214-3.727.977.994-3.633-.234-.372a9.845 9.845 0 0 1-1.512-5.215c0-5.438 4.425-9.863 9.871-9.863 2.635.001 5.112 1.028 6.974 2.892a9.816 9.816 0 0 1 2.89 6.973c-.001 5.439-4.426 9.863-9.878 9.863zm8.388-18.256A11.777 11.777 0 0 0 12.042 0C5.402 0 .004 5.397.004 12.038a11.77 11.77 0 0 0 1.583 5.922L0 24l6.19-1.624a11.783 11.783 0 0 0 5.844 1.554h.008c6.638 0 12.036-5.398 12.038-12.04a11.764 11.764 0 0 0-3.65-8.267z"/>
            </svg>
            <span>Chat on WhatsApp</span>
          </a>

          <div className="wa wa-mail">
            <svg
              className="mail-icon"
              viewBox="0 0 24 24"
              width="20"
              height="20"
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
            <a
              href="mailto:contact@libaasanyuwaari.com"
              className="wa-mail-link"
              ref={emailRef}
              title="Send email to contact@libaasanyuwaari.com"
            >
              contact@libaasanyuwaari.com
            </a>
            <button type="button" onClick={handleCopyEmail} aria-label="Copy Email">
              Copy
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JoinSection;
