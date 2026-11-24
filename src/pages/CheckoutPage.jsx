import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectBagItems,
  selectBagSubtotal,
  selectBagDiscountAmount,
  selectBagShipping,
  selectBagTotal,
  selectBagCode,
  selectBagCodeMessage,
  applyDiscountCode,
  clearBag,
} from "../store/bagSlice";
import { miniSVG } from "../utils/figureGenerator";

const formatPrice = (n) => "Rs " + Math.round(n).toLocaleString("en-PK");

export const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const items = useSelector(selectBagItems);
  const subtotal = useSelector(selectBagSubtotal);
  const discountAmount = useSelector(selectBagDiscountAmount);
  const shipping = useSelector(selectBagShipping);
  const total = useSelector(selectBagTotal);
  const code = useSelector(selectBagCode);
  const codeMessage = useSelector(selectBagCodeMessage);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");
  const [landmark, setLandmark] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [orderNote, setOrderNote] = useState("");
  const [promoInput, setPromoInput] = useState(code || "");

  // Errors state
  const [errors, setErrors] = useState({});

  // Confirmation state
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [doneMsg, setDoneMsg] = useState("");

  const handleApplyCode = () => {
    dispatch(applyDiscountCode(promoInput));
  };

  const handleClearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!items.length) return;

    const trimmedName = name.trim();
    const cleanPhone = phone.replace(/\D/g, "");
    const trimmedAddress = address.trim();

    const newErrors = {};
    if (!trimmedName) {
      newErrors.name = "Please enter the name for delivery.";
    }
    if (!cleanPhone || !/^(03\d{9}|923\d{9})$/.test(cleanPhone)) {
      newErrors.phone =
        "Enter a Pakistani mobile number, like 0300 1234567.";
    }
    if (!city) {
      newErrors.city = "Choose a city.";
    }
    if (!trimmedAddress || trimmedAddress.length <= 8) {
      newErrors.address =
        "Add the house number and street so the rider can find you.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Generate Order
    const randomNum = 1000 + Math.floor(Math.random() * 9000);
    const orderNo = `LY-${randomNum}`;
    setOrderNumber(`Order ${orderNo}`);

    let msg = "";
    if (paymentMethod === "cod") {
      msg = `We'll send a WhatsApp message to ${phone.trim()} to confirm your order before we dispatch it. Please keep the cash ready for the rider.`;
    } else if (paymentMethod === "card") {
      msg =
        "In the real shop you'd now go to PayFast or Safepay to pay. Then we'll confirm on WhatsApp.";
    } else {
      msg =
        "We'll WhatsApp you our bank details. Your order is dispatched once the transfer arrives.";
    }
    setDoneMsg(msg);
    setOrderComplete(true);
    dispatch(clearBag());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const placeBtnText = !items.length
    ? "Your bag is empty"
    : paymentMethod === "cod"
    ? `Place order · pay ${formatPrice(total)} on delivery`
    : paymentMethod === "card"
    ? `Pay ${formatPrice(total)} now`
    : `Place order · ${formatPrice(total)}`;

  return (
    <section className="checkout" id="checkoutView">
      <div className="co-top">
        <div className="wrap">
          <a
            href="#grow"
            id="coBack"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            ‹ Back to shop
          </a>
          <b>Checkout</b>
          <small>Cash on Delivery across Pakistan</small>
        </div>
      </div>

      {!orderComplete ? (
        <div className="co" id="coMain">
          <div className="wrap">
            {/* Checkout Form */}
            <form id="coForm" onSubmit={handleSubmit} noValidate>
              <div className="steps">
                <span className="on">1 Delivery</span>
                <span>›</span>
                <span className="on">2 Payment</span>
                <span>›</span>
                <span>3 Confirm on WhatsApp</span>
              </div>

              {/* Who is it for */}
              <fieldset className="fs">
                <legend>Who is it for?</legend>
                <div className="f2">
                  <div className={`fld2 ${errors.name ? "bad" : ""}`} id="f-name">
                    <label htmlFor="coName">Full name</label>
                    <input
                      id="coName"
                      autoComplete="name"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        handleClearError("name");
                      }}
                    />
                    <span className="err">{errors.name}</span>
                  </div>
                  <div
                    className={`fld2 ${errors.phone ? "bad" : ""}`}
                    id="f-phone"
                  >
                    <label htmlFor="coPhone">
                      Mobile number <em>(WhatsApp)</em>
                    </label>
                    <input
                      id="coPhone"
                      inputMode="tel"
                      autoComplete="tel"
                      placeholder="03xx xxxxxxx"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value);
                        handleClearError("phone");
                      }}
                    />
                    <span className="err">{errors.phone}</span>
                  </div>
                </div>
                <div className="fld2">
                  <label htmlFor="coEmail">
                    Email <em>(optional, for the receipt)</em>
                  </label>
                  <input
                    id="coEmail"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </fieldset>

              {/* Delivery address */}
              <fieldset className="fs">
                <legend>Delivery address</legend>
                <div className="f2">
                  <div className={`fld2 ${errors.city ? "bad" : ""}`} id="f-city">
                    <label htmlFor="coCity">City</label>
                    <select
                      id="coCity"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        handleClearError("city");
                      }}
                    >
                      <option value="">Choose city</option>
                      <option>Karachi</option>
                      <option>Lahore</option>
                      <option>Islamabad</option>
                      <option>Rawalpindi</option>
                      <option>Faisalabad</option>
                      <option>Multan</option>
                      <option>Peshawar</option>
                      <option>Quetta</option>
                      <option>Hyderabad</option>
                      <option>Sialkot</option>
                      <option>Other city</option>
                    </select>
                    <span className="err">{errors.city}</span>
                  </div>
                  <div className="fld2">
                    <label htmlFor="coArea">Area / sector</label>
                    <input
                      id="coArea"
                      placeholder="e.g. DHA Phase 5"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                    />
                  </div>
                </div>
                <div className={`fld2 ${errors.address ? "bad" : ""}`} id="f-addr">
                  <label htmlFor="coAddr">House and street</label>
                  <textarea
                    id="coAddr"
                    autoComplete="street-address"
                    value={address}
                    onChange={(e) => {
                      setAddress(e.target.value);
                      handleClearError("address");
                    }}
                  />
                  <span className="err">{errors.address}</span>
                </div>
                <div className="fld2">
                  <label htmlFor="coLand">
                    Nearest landmark <em>(helps the rider)</em>
                  </label>
                  <input
                    id="coLand"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                  />
                </div>
              </fieldset>

              {/* Payment */}
              <fieldset className="fs">
                <legend>Payment</legend>
                <label className="opt">
                  <input
                    type="radio"
                    name="pay"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <span>
                    <b>Cash on Delivery</b>
                    <small>
                      Pay the rider when it arrives. We'll WhatsApp you to confirm
                      before dispatch.
                    </small>
                  </span>
                </label>
                <label className="opt">
                  <input
                    type="radio"
                    name="pay"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <span>
                    <b>Card, JazzCash or Easypaisa</b>
                    <small>
                      Pay securely online through PayFast or Safepay.
                    </small>
                  </span>
                </label>
                <label className="opt">
                  <input
                    type="radio"
                    name="pay"
                    value="bank"
                    checked={paymentMethod === "bank"}
                    onChange={() => setPaymentMethod("bank")}
                  />
                  <span>
                    <b>Bank transfer</b>
                    <small>
                      We'll send our account details on WhatsApp.
                    </small>
                  </span>
                </label>
              </fieldset>

              {/* Order note */}
              <fieldset className="fs">
                <legend>Anything we should know?</legend>
                <div className="fld2">
                  <label htmlFor="coNote">
                    Order note <em>(optional)</em>
                  </label>
                  <textarea
                    id="coNote"
                    placeholder="e.g. Please call before delivery"
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                  />
                </div>
              </fieldset>

              <button
                type="submit"
                className="place"
                id="placeBtn"
                disabled={!items.length}
                style={{ opacity: items.length ? 1 : 0.5 }}
              >
                {placeBtnText}
              </button>
            </form>

            {/* Order Summary */}
            <aside className="co-sum" aria-label="Order summary">
              <h2>Your order</h2>
              <div id="coLines">
                {!items.length ? (
                  <p className="empty">Your bag is empty.</p>
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
                        <small>Qty {it.qty}</small>
                      </div>
                      <div className="amt">
                        {formatPrice(it.price * it.qty)}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="code">
                <input
                  id="coCode"
                  placeholder="Discount code"
                  aria-label="Discount code"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                />
                <button type="button" id="coApply" onClick={handleApplyCode}>
                  Apply
                </button>
              </div>

              {codeMessage && (
                <div className="codemsg" id="coCodeMsg" aria-live="polite">
                  {codeMessage}
                </div>
              )}

              <div id="coTotals">
                <div className="rowp">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="rowp">
                    <span>Discount (SALAM10)</span>
                    <span>− {formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="rowp">
                  <span>Delivery</span>
                  <span>{shipping ? formatPrice(shipping) : "Free"}</span>
                </div>
                <div className="rowp big">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <div className="trust">
                <span>✓ Easy size exchange within 7 days</span>
                <span>✓ Delivery in 2–5 working days</span>
                <span>✓ Your number is only used for this order</span>
              </div>
            </aside>
          </div>
        </div>
      ) : (
        /* Order Done View */
        <div className="done" id="coDone">
          <svg
            viewBox="235 28 530 570"
            width="120"
            style={{ margin: "0 auto" }}
            aria-hidden="true"
          >
            <use href="#lyLogo" width="1000" height="1140" />
          </svg>
          <h2>JazakAllah khair!</h2>
          <p className="ord" id="ordNo">
            {orderNumber}
          </p>
          <p id="doneMsg">{doneMsg}</p>
          <a
            href="#grow"
            className="go"
            id="doneBack"
            onClick={(e) => {
              e.preventDefault();
              setOrderComplete(false);
              navigate("/");
            }}
          >
            Back to the shop
          </a>
        </div>
      )}
    </section>
  );
};

export default CheckoutPage;
