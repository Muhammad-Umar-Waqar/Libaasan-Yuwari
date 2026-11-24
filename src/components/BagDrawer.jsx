import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectBagItems,
  selectBagSubtotal,
  selectFreeShippingRemaining,
  selectIsBagDrawerOpen,
  setBagDrawerOpen,
  updateQty,
  removeItem,
} from "../store/bagSlice";
import { miniSVG } from "../utils/figureGenerator";

const formatPrice = (n) => "Rs " + Math.round(n).toLocaleString("en-PK");

export const BagDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector(selectIsBagDrawerOpen);
  const items = useSelector(selectBagItems);
  const subtotal = useSelector(selectBagSubtotal);
  const freeRemaining = useSelector(selectFreeShippingRemaining);

  const handleCheckoutClick = (e) => {
    e.preventDefault();
    dispatch(setBagDrawerOpen(false));
    navigate("/checkout");
  };

  return (
    <aside
      className={`drawer ${isOpen ? "on" : ""}`}
      id="drawer"
      aria-label="Your bag"
      aria-hidden={!isOpen}
    >
      <div className="dr-head">
        <h2>Your bag</h2>
        <button
          type="button"
          className="x"
          id="drClose"
          aria-label="Close bag"
          onClick={() => dispatch(setBagDrawerOpen(false))}
        >
          ×
        </button>
      </div>

      <div className="dr-body" id="drBody">
        {!items.length ? (
          <p className="empty">
            Your bag is empty.
            <br />
            Move the slider to her age and pick something she'll love.
          </p>
        ) : (
          items.map((it) => (
            <div key={it.key} className="line">
              <div
                className="pic"
                dangerouslySetInnerHTML={{
                  __html: miniSVG(it.age, it.p),
                }}
              />
              <div>
                <b>{it.name}</b>
                <small>
                  Size {it.size}
                  {it.note ? ` · ${it.note}` : ""}
                </small>
                <div className="qty">
                  <button
                    type="button"
                    aria-label="One less"
                    onClick={() =>
                      dispatch(updateQty({ key: it.key, delta: -1 }))
                    }
                  >
                    −
                  </button>
                  <span>{it.qty}</span>
                  <button
                    type="button"
                    aria-label="One more"
                    onClick={() =>
                      dispatch(updateQty({ key: it.key, delta: 1 }))
                    }
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="amt">
                {formatPrice(it.price * it.qty)}
                <button
                  type="button"
                  className="rm"
                  onClick={() => dispatch(removeItem(it.key))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="dr-foot" id="drFoot">
        {!items.length ? (
          <button
            type="button"
            className="go alt"
            onClick={() => dispatch(setBagDrawerOpen(false))}
          >
            Keep shopping
          </button>
        ) : (
          <>
            <div className="freebar">
              {freeRemaining
                ? `Add ${formatPrice(freeRemaining)} more for free delivery`
                : "You've got free delivery"}
              <i>
                <b
                  style={{
                    width: `${Math.min(100, (subtotal / 5000) * 100)}%`,
                  }}
                />
              </i>
            </div>
            <div className="tot">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <a href="#checkout" className="go" onClick={handleCheckoutClick}>
              Checkout
            </a>
            <button
              type="button"
              className="go alt"
              onClick={() => dispatch(setBagDrawerOpen(false))}
            >
              Keep shopping
            </button>
          </>
        )}
      </div>
    </aside>
  );
};

export default BagDrawer;
