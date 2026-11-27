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
  selectFreeShippingRemaining,
  applyDiscountCode,
  clearBag,
  setBagDrawerOpen,
} from "../store/bagSlice";
import { miniSVG } from "../utils/figureGenerator";

const formatPrice = (n) => "Rs " + Math.round(n).toLocaleString("en-PK");

const POPULAR_CITIES = [
  "Karachi",
  "Lahore",
  "Islamabad",
  "Rawalpindi",
  "Faisalabad",
  "Multan",
  "Peshawar",
  "Quetta",
  "Sialkot",
  "Hyderabad",
];

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
  const freeRemaining = useSelector(selectFreeShippingRemaining);

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

  // Mobile order summary accordion toggle state (collapsed by default on mobile)
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);

  // Errors state
  const [errors, setErrors] = useState({});

  // Confirmation state
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [doneMsg, setDoneMsg] = useState("");

  const handleApplyCode = (codeToApply) => {
    const val = typeof codeToApply === "string" ? codeToApply : promoInput;
    dispatch(applyDiscountCode(val));
    if (typeof codeToApply === "string") {
      setPromoInput(codeToApply);
    }
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
      newErrors.name = "Please enter the recipient full name.";
    }
    if (!cleanPhone || !/^(03\d{9}|923\d{9})$/.test(cleanPhone)) {
      newErrors.phone =
        "Enter a valid 11-digit Pakistani mobile number (e.g. 0300 1234567).";
    }
    if (!city) {
      newErrors.city = "Please select or enter your delivery city.";
    }
    if (!trimmedAddress || trimmedAddress.length <= 8) {
      newErrors.address =
        "Please provide complete house number, street or building details.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrEl = document.querySelector(
        ".fld2.bad input, .fld2.bad select, .fld2.bad textarea"
      );
      if (firstErrEl) {
        firstErrEl.focus();
        firstErrEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Generate Order
    const randomNum = 1000 + Math.floor(Math.random() * 9000);
    const orderNo = `LY-${randomNum}`;
    setOrderNumber(`Order ${orderNo}`);

    let msg = "";
    if (paymentMethod === "cod") {
      msg = `We have received your order! A WhatsApp confirmation message will be sent to ${phone.trim()} before dispatch. Please keep cash ready for the courier rider.`;
    } else if (paymentMethod === "card") {
      msg =
        "Online payment initiated. Our customer care team will verify your payment and WhatsApp your dispatch tracking link.";
    } else {
      msg =
        "We'll WhatsApp you our official Meezan Bank account details shortly. Your parcel will be dispatched as soon as the transfer slip is received.";
    }
    setDoneMsg(msg);
    setOrderComplete(true);
    dispatch(clearBag());
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const placeBtnText = !items.length
    ? "Your bag is empty"
    : paymentMethod === "cod"
    ? `Confirm Order · Pay ${formatPrice(total)} on Delivery`
    : paymentMethod === "card"
    ? `Pay ${formatPrice(total)} Online`
    : `Place Order · ${formatPrice(total)}`;

  const totalItemsCount = items.reduce((s, it) => s + it.qty, 0);

  // Render Order Summary Items List (Clean, Shopify / BabyPlanet inspired)
  const renderSummaryContent = () => (
    <>
      <div className="co-items-list" id="coLines">
        {!items.length ? (
          <div className="empty-cart-box">
            <div className="empty-cart-icon">🛍️</div>
            <p className="empty-title">Your bag is empty</p>
            <button
              type="button"
              className="return-shop-btn"
              onClick={() => navigate("/")}
            >
              Browse Outfits
            </button>
          </div>
        ) : (
          items.map((it) => {
            const currentColorHex = it.p?.c || "#E8BBAA";
            const currentColorName = it.colorName || "Original";

            return (
              <div key={it.key} className="co-summary-line-item">
                {/* Thumbnail with floating circular quantity badge */}
                <div className="co-item-thumb-box">
                  <div
                    className="co-item-mini-fig"
                    dangerouslySetInnerHTML={{
                      __html: miniSVG(it.age, it.p),
                    }}
                  />
                  <span className="co-item-qty-badge">{it.qty}</span>
                </div>

                {/* Details */}
                <div className="co-item-text-col">
                  <b className="co-item-name">{it.name}</b>
                  <div className="co-item-variant-label">
                    <span>Size {it.size}</span>
                    <span className="dot-sep">·</span>
                    <span className="co-color-preview">
                      <span
                        className="color-dot-sm"
                        style={{ backgroundColor: currentColorHex }}
                      />
                      {currentColorName}
                    </span>
                  </div>
                </div>

                {/* Line total price */}
                <div className="co-item-price-col">
                  <span className="co-line-price">
                    {formatPrice(it.price * it.qty)}
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Free Delivery Tracker Bar */}
      {items.length > 0 && (
        <div className="shipping-progress-card">
          <div className="shipping-progress-header">
            {freeRemaining > 0 ? (
              <span>
                Add <b>{formatPrice(freeRemaining)}</b> more for <b>Free Delivery</b>
              </span>
            ) : (
              <span className="free-unlocked-text">
                ✨ <b>Free Delivery Unlocked!</b> You saved Rs 250
              </span>
            )}
          </div>
          <div className="progress-track">
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(100, (subtotal / 5000) * 100)}%`,
              }}
            />
          </div>
        </div>
      )}

      {/* Promo / Discount Code */}
      <div className="code-box-wrap">
        <div className="code">
          <input
            id="coCode"
            placeholder="Discount code (e.g. SALAM10)"
            aria-label="Discount code"
            value={promoInput}
            onChange={(e) => setPromoInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleApplyCode();
              }
            }}
          />
          <button type="button" id="coApply" onClick={() => handleApplyCode()}>
            Apply
          </button>
        </div>

        {!code && (
          <button
            type="button"
            className="quick-code-pill"
            onClick={() => handleApplyCode("SALAM10")}
          >
            🏷️ Tap to apply <b>SALAM10</b> (10% OFF first order)
          </button>
        )}

        {codeMessage && (
          <div
            className={`codemsg ${code === "SALAM10" ? "success" : "error"}`}
            id="coCodeMsg"
            aria-live="polite"
          >
            {codeMessage}
          </div>
        )}
      </div>

      {/* Price Breakdown Totals */}
      <div id="coTotals" className="co-totals-block">
        <div className="rowp">
          <span className="row-label">Subtotal</span>
          <span className="row-val">{formatPrice(subtotal)}</span>
        </div>

        {discountAmount > 0 && (
          <div className="rowp discount-row">
            <span className="row-label">
              Discount ({code || "SALAM10"})
            </span>
            <span className="row-val">− {formatPrice(discountAmount)}</span>
          </div>
        )}

        <div className="rowp">
          <span className="row-label">Delivery (Pakistan)</span>
          <span className="row-val">
            {shipping ? (
              formatPrice(shipping)
            ) : (
              <span className="free-shipping-tag">FREE</span>
            )}
          </span>
        </div>

        <div className="rowp big total-row">
          <span className="row-label">Total Amount</span>
          <span className="row-val">{formatPrice(total)}</span>
        </div>
      </div>
    </>
  );

  return (
    <section className="checkout" id="checkoutView">
      {/* Top Luxury Navigation Header */}
      <div className="co-top">
        <div className="wrap">
          <a
            href="#grow"
            id="coBack"
            className="co-back-link"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            <span className="back-arrow">‹</span>
            <span className="co-back-text-full">Continue Shopping</span>
            <span className="co-back-text-short">Shop</span>
          </a>
          <div className="co-brand-title">
            <b>Libaasan Yuwaari</b>
            <span className="brand-dot">·</span>
            <span className="co-subheading">Checkout</span>
          </div>
          <div className="co-top-badges">
            <span className="secure-badge">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              Verified Cash on Delivery
            </span>
          </div>
        </div>
      </div>

      {!orderComplete ? (
        <div className="co" id="coMain">
          {/* Mobile Collapsible Order Summary Bar (Image 4 Inspiration) */}
          <div
            className={`mobile-order-summary-bar ${isMobileSummaryOpen ? "expanded" : ""}`}
            onClick={() => setIsMobileSummaryOpen((prev) => !prev)}
            role="button"
            tabIndex={0}
            aria-expanded={isMobileSummaryOpen}
            aria-label="Toggle order summary"
          >
            <div className="mob-summary-left">
              <span className="mob-summary-icon">🛍️</span>
              <span className="mob-summary-title">
                {isMobileSummaryOpen ? "Hide order summary" : "Show order summary"}
              </span>
              <svg
                className={`mob-summary-chevron ${isMobileSummaryOpen ? "flipped" : ""}`}
                viewBox="0 0 24 24"
                width="14"
                height="14"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </div>
            <div className="mob-summary-right">
              <span className="mob-pkr-label">PKR</span>
              <span className="mob-total-val">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Mobile Expanded Summary Drawer / Accordion */}
          {isMobileSummaryOpen && (
            <div className="mobile-order-summary-content">
              {renderSummaryContent()}
            </div>
          )}

          <div className="wrap">
            {/* Left Column: Delivery Details Form */}
            <form id="coForm" onSubmit={handleSubmit} noValidate>
              <div className="checkout-step-pills">
                <div className="step-pill active">
                  <span className="step-num">1</span>
                  <span>Delivery Details</span>
                </div>
                <div className="step-divider">›</div>
                <div className="step-pill active">
                  <span className="step-num">2</span>
                  <span>Payment</span>
                </div>
                <div className="step-divider">›</div>
                <div className="step-pill">
                  <span className="step-num">3</span>
                  <span>Confirmation</span>
                </div>
              </div>

              {/* Recipient Details */}
              <fieldset className="fs">
                <legend>
                  <span className="fs-svg-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  <span>Contact & Recipient Details</span>
                </legend>
                <p className="fs-subtitle">
                  We use your mobile number exclusively for WhatsApp updates and courier delivery dispatch.
                </p>

                <div className="f2">
                  <div
                    className={`fld2 ${errors.name ? "bad" : ""}`}
                    id="f-name"
                  >
                    <label htmlFor="coName">
                      Full Name <span className="req">*</span>
                    </label>
                    <input
                      id="coName"
                      autoComplete="name"
                      placeholder="e.g. Ayesha Khan"
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
                      Mobile & WhatsApp Number <span className="req">*</span>
                    </label>
                    <div className="phone-input-wrap">
                      <span className="pk-flag" title="Pakistan (+92)">
                        🇵🇰 +92
                      </span>
                      <input
                        id="coPhone"
                        inputMode="tel"
                        autoComplete="tel"
                        placeholder="0300 1234567"
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          handleClearError("phone");
                        }}
                      />
                    </div>
                    <span className="err">{errors.phone}</span>
                  </div>
                </div>

                <div className="fld2">
                  <label htmlFor="coEmail">
                    Email Address <em>(optional · for order receipt)</em>
                  </label>
                  <input
                    id="coEmail"
                    type="email"
                    autoComplete="email"
                    placeholder="e.g. ayesha@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </fieldset>

              {/* Delivery Address */}
              <fieldset className="fs">
                <legend>
                  <span className="fs-svg-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <span>Delivery Address</span>
                </legend>
                <p className="fs-subtitle">
                  Dispatched within 24 hours via TCS / Leopard Courier across Pakistan in 2–5 days.
                </p>

                {/* Popular Cities quick-chips */}
                <div className="city-quick-chips">
                  <span className="chips-label">Quick select city:</span>
                  <div className="chips-scroll">
                    {POPULAR_CITIES.map((c) => (
                      <button
                        key={c}
                        type="button"
                        className={`city-chip ${city === c ? "on" : ""}`}
                        onClick={() => {
                          setCity(c);
                          handleClearError("city");
                        }}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="f2">
                  <div
                    className={`fld2 ${errors.city ? "bad" : ""}`}
                    id="f-city"
                  >
                    <label htmlFor="coCity">
                      City <span className="req">*</span>
                    </label>
                    <select
                      id="coCity"
                      value={city}
                      onChange={(e) => {
                        setCity(e.target.value);
                        handleClearError("city");
                      }}
                    >
                      <option value="">Select your city</option>
                      {POPULAR_CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                      <option value="Other city">Other city across Pakistan</option>
                    </select>
                    <span className="err">{errors.city}</span>
                  </div>

                  <div className="fld2">
                    <label htmlFor="coArea">
                      Area / Sector / Colony
                    </label>
                    <input
                      id="coArea"
                      placeholder="e.g. DHA Phase 5 / Gulberg III"
                      value={area}
                      onChange={(e) => setArea(e.target.value)}
                    />
                  </div>
                </div>

                <div
                  className={`fld2 ${errors.address ? "bad" : ""}`}
                  id="f-addr"
                >
                  <label htmlFor="coAddr">
                    Complete Street Address & House / Flat No. <span className="req">*</span>
                  </label>
                  <textarea
                    id="coAddr"
                    rows="2"
                    placeholder="e.g. House #14, Street 7, Block B"
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
                    Nearest Landmark <em>(helps rider find your doorstep)</em>
                  </label>
                  <input
                    id="coLand"
                    placeholder="e.g. Near Jamia Masjid, opposite City School"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                  />
                </div>
              </fieldset>

              {/* Payment Methods */}
              <fieldset className="fs">
                <legend>
                  <span className="fs-svg-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="3" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  </span>
                  <span>Payment Method</span>
                </legend>
                <p className="fs-subtitle">
                  No extra delivery fees on Cash on Delivery.
                </p>

                <div className="payment-options-grid">
                  {/* COD */}
                  <label
                    className={`opt-card ${paymentMethod === "cod" ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="pay"
                      value="cod"
                      checked={paymentMethod === "cod"}
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <div className="opt-content">
                      <div className="opt-header">
                        <span className="opt-title">
                          <span className="pay-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="6" width="20" height="12" rx="2" />
                              <circle cx="12" cy="12" r="3" />
                              <path d="M6 12h.01M18 12h.01" />
                            </svg>
                          </span>
                          Cash on Delivery (COD)
                        </span>
                        <span className="popular-badge">Recommended</span>
                      </div>
                      <p className="opt-desc">
                        Pay cash directly to courier at your doorstep. We WhatsApp your tracking link upon dispatch.
                      </p>
                    </div>
                  </label>

                  {/* Card / JazzCash / Easypaisa */}
                  <label
                    className={`opt-card ${paymentMethod === "card" ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="pay"
                      value="card"
                      checked={paymentMethod === "card"}
                      onChange={() => setPaymentMethod("card")}
                    />
                    <div className="opt-content">
                      <div className="opt-header">
                        <span className="opt-title">
                          <span className="pay-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="2" y="5" width="20" height="14" rx="2" />
                              <line x1="2" y1="10" x2="22" y2="10" />
                              <line x1="6" y1="15" x2="10" y2="15" />
                            </svg>
                          </span>
                          Debit / Credit Card, JazzCash or Easypaisa
                        </span>
                        <span className="instant-badge">Instant</span>
                      </div>
                      <p className="opt-desc">
                        Pay securely online via encrypted payment gateway.
                      </p>
                    </div>
                  </label>

                  {/* Bank Transfer */}
                  <label
                    className={`opt-card ${paymentMethod === "bank" ? "selected" : ""}`}
                  >
                    <input
                      type="radio"
                      name="pay"
                      value="bank"
                      checked={paymentMethod === "bank"}
                      onChange={() => setPaymentMethod("bank")}
                    />
                    <div className="opt-content">
                      <div className="opt-header">
                        <span className="opt-title">
                          <span className="pay-icon" aria-hidden="true">
                            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3l9 7H3l9-7z" />
                            </svg>
                          </span>
                          Direct Bank Transfer
                        </span>
                      </div>
                      <p className="opt-desc">
                        Transfer to our official Meezan Bank account. Instant dispatch once receipt slip is shared.
                      </p>
                    </div>
                  </label>
                </div>
              </fieldset>

              {/* Order Notes */}
              <fieldset className="fs">
                <legend>
                  <span className="fs-svg-icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <polyline points="10 9 9 9 8 9" />
                    </svg>
                  </span>
                  <span>Special Delivery Instructions</span> <em>(optional)</em>
                </legend>
                <div className="fld2">
                  <textarea
                    id="coNote"
                    placeholder="e.g. Please call before arriving, deliver after 2 PM, or leave with gate security..."
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                  />
                </div>
              </fieldset>

              {/* Action Button */}
              <div className="co-action-wrap">
                <button
                  type="submit"
                  className="place-order-cta"
                  id="placeBtn"
                  disabled={!items.length}
                >
                  <span className="lock-icon">🔒</span> {placeBtnText}
                </button>
                <p className="co-guarantee-note">
                  🛡️ 7-Day Hassle-Free Size Exchange · Cash on Delivery · Handcrafted Modest Fits
                </p>
              </div>
            </form>

            {/* Right Column: Order Summary (Visible on Desktop) */}
            <aside className="co-sum desktop-order-summary" aria-label="Order summary">
              <div className="co-sum-header">
                <h2>
                  Order Summary
                  <span className="item-count-badge">
                    {totalItemsCount} {totalItemsCount === 1 ? "item" : "items"}
                  </span>
                </h2>
                <button
                  type="button"
                  className="clear-bag-btn"
                  onClick={() => dispatch(clearBag())}
                  title="Clear all items"
                >
                  Clear Bag
                </button>
              </div>

              {renderSummaryContent()}

              {/* Trust Badges */}
              <div className="checkout-trust-grid">
                <div className="trust-item">
                  <span className="trust-icon">🔄</span>
                  <div>
                    <b>7-Day Easy Size Exchange</b>
                    <small>Size doesn't fit? We exchange hassle-free.</small>
                  </div>
                </div>
                <div className="trust-item">
                  <span className="trust-icon">🚚</span>
                  <div>
                    <b>2–5 Days TCS / Leopard Delivery</b>
                    <small>Express doorstep delivery across Pakistan.</small>
                  </div>
                </div>
                <div className="trust-item">
                  <span className="trust-icon">💬</span>
                  <div>
                    <b>WhatsApp Order Updates</b>
                    <small>Real human care before and after dispatch.</small>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      ) : (
        /* Order Completed Celebration View */
        <div className="done-celebration-container" id="coDone">
          <div className="done-card">
            <div className="done-icon-wrap">
              <span className="celebration-badge">🎉</span>
            </div>
            <h2>JazakAllah Khair!</h2>
            <p className="order-tagline">
              Your order has been placed successfully.
            </p>

            <div className="order-receipt-pill">
              <span className="pill-label">Order Reference</span>
              <b className="pill-number">{orderNumber}</b>
            </div>

            <div className="done-instructions-box">
              <p id="doneMsg">{doneMsg}</p>
            </div>

            <div className="done-steps-preview">
              <div className="done-step-item">
                <span className="step-circle">1</span>
                <span>Order Packed with Care</span>
              </div>
              <div className="done-step-item">
                <span className="step-circle">2</span>
                <span>WhatsApp Dispatch Notice</span>
              </div>
              <div className="done-step-item">
                <span className="step-circle">3</span>
                <span>Delivery at Your Door</span>
              </div>
            </div>

            <button
              type="button"
              className="back-to-shop-cta"
              onClick={() => {
                setOrderComplete(false);
                navigate("/");
              }}
            >
              Continue Exploring Shop
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default CheckoutPage;
