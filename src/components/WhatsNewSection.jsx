import React from "react";
import { useDispatch } from "react-redux";
import { setTargetAge, showToast } from "../store/appSlice";
import { PRODUCTS } from "../data/catalog";
import { miniSVG } from "../utils/figureGenerator";

export const WhatsNewSection = () => {
  const dispatch = useDispatch();

  const handleCopyCode = () => {
    const code = "SALAM10";
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code).then(
        () => dispatch(showToast("Code SALAM10 copied. Use it at checkout.")),
        () => dispatch(showToast("Your code is SALAM10"))
      );
    } else {
      dispatch(showToast("Your code is SALAM10"));
    }
  };

  const o1Product = PRODUCTS.find((p) => p.id === "o1");
  const k5Product = PRODUCTS.find((p) => p.id === "k5");

  return (
    <section className="news" id="new">
      <div className="wrap">
        <h2>What's new</h2>
        <div className="tiles">
          {/* Tile 1: Winter abayas */}
          <div className="tile t-new">
            <span className="k">New this week</span>
            <h3>Winter abayas</h3>
            <p>Warm, soft and fully covered, for Older Girls 11 to 15.</p>
            <a
              href="#grow"
              id="newGo"
              onClick={(e) => {
                e.preventDefault();
                dispatch(setTargetAge(13));
                document.getElementById("grow")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Shop new arrivals
            </a>
            <div className="minis" id="newMinis" aria-hidden="true">
              {o1Product && (
                <span
                  dangerouslySetInnerHTML={{
                    __html: miniSVG(13, o1Product),
                  }}
                />
              )}
              {k5Product && (
                <span
                  dangerouslySetInnerHTML={{
                    __html: miniSVG(7, k5Product),
                  }}
                />
              )}
            </div>
          </div>

          {/* Tile 2: Welcome Offer */}
          <div className="tile t-offer">
            <span className="k">Welcome offer</span>
            <h3>10% off your first order</h3>
            <span className="code">SALAM10</span>
            <button type="button" id="copyCode" onClick={handleCopyCode}>
              Copy code
            </button>
          </div>

          {/* Tile 3: Coming Soon */}
          <div className="tile t-soon">
            <span className="k">Coming soon</span>
            <h3>New designs every month</h3>
            <p>Join us on WhatsApp and see them before anyone else.</p>
            <button
              type="button"
              id="soonGo"
              onClick={() => {
                const el = document.getElementById("join");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Tell me first
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatsNewSection;
