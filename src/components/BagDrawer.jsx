import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  selectBagItems,
  selectBagSubtotal,
  selectFreeShippingRemaining,
  selectIsBagDrawerOpen,
  setBagDrawerOpen,
  updateQty,
  updateItemVariant,
  removeItem,
} from "../store/bagSlice";
import { showToast } from "../store/appSlice";
import { CHECKOUT_SIZES, CHECKOUT_COLORS } from "../data/catalog";
import { miniSVG } from "../utils/figureGenerator";

const formatPrice = (n) => "Rs " + Math.round(n).toLocaleString("en-PK");

export const BagDrawer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector(selectIsBagDrawerOpen);
  const items = useSelector(selectBagItems);
  const subtotal = useSelector(selectBagSubtotal);
  const freeRemaining = useSelector(selectFreeShippingRemaining);

  // Edit Modal State
  const [editingItem, setEditingItem] = useState(null);
  const [editSize, setEditSize] = useState("");
  const [editAge, setEditAge] = useState(3);
  const [editColor, setEditColor] = useState(CHECKOUT_COLORS[0]);
  const [editQty, setEditQty] = useState(1);

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setEditSize(item.size);
    setEditAge(item.age || 7);
    const existingColorHex = item.p?.c || "#E8BBAA";
    const matchedColor =
      CHECKOUT_COLORS.find(
        (c) => c.hex.toLowerCase() === existingColorHex.toLowerCase()
      ) || { name: item.colorName || "Original", hex: existingColorHex };
    setEditColor(matchedColor);
    setEditQty(item.qty || 1);
  };

  const handleCloseEditModal = () => {
    setEditingItem(null);
  };

  const handleSaveItemEdit = () => {
    if (!editingItem) return;

    dispatch(
      updateItemVariant({
        key: editingItem.key,
        newSize: editSize,
        newAge: editAge,
        newColor: editColor.hex,
        newColorName: editColor.name,
        newQty: editQty,
      })
    );

    dispatch(showToast(`Updated ${editingItem.name} (Size ${editSize}) in bag`));
    setEditingItem(null);
  };

  const handleCheckoutClick = (e) => {
    e.preventDefault();
    dispatch(setBagDrawerOpen(false));
    navigate("/checkout");
  };

  return (
    <aside
      className={`drawer ${isOpen ? "on" : ""}`}
      id="drawer"
      aria-label="Your shopping bag"
      aria-hidden={!isOpen}
    >
      <div className="dr-head">
        <div className="dr-title-group">
          <h2>Your Bag</h2>
          <span className="dr-item-count">
            ({items.reduce((acc, it) => acc + it.qty, 0)} {items.reduce((acc, it) => acc + it.qty, 0) === 1 ? "item" : "items"})
          </span>
        </div>
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
          <div className="empty-bag-wrap">
            <div className="empty-bag-icon">🛍️</div>
            <p className="empty">
              Your bag is currently empty.
              <br />
              Explore our collection and pick something she'll love.
            </p>
          </div>
        ) : (
          items.map((it) => {
            const currentColorHex = it.p?.c || "#E8BBAA";
            const currentColorName = it.colorName || "Original";

            return (
              <div key={it.key} className="drawer-item-card">
                {/* Visual Thumbnail */}
                <div
                  className="drawer-item-pic"
                  dangerouslySetInnerHTML={{
                    __html: miniSVG(it.age, it.p),
                  }}
                />

                {/* Info & Details */}
                <div className="drawer-item-info">
                  <div className="drawer-item-title-row">
                    <b className="drawer-item-name">{it.name}</b>
                    <span className="drawer-item-price">
                      {formatPrice(it.price * it.qty)}
                    </span>
                  </div>

                  <div className="drawer-item-meta">
                    <span className="drawer-meta-pill size">
                      Size {it.size}
                    </span>
                    <span className="drawer-meta-pill color">
                      <span
                        className="drawer-color-dot"
                        style={{ backgroundColor: currentColorHex }}
                      />
                      {currentColorName}
                    </span>
                  </div>

                  {/* Quantity Stepper & Action Icons */}
                  <div className="drawer-item-bottom">
                    <div className="drawer-qty-pill">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          dispatch(updateQty({ key: it.key, delta: -1 }))
                        }
                      >
                        −
                      </button>
                      <span>{it.qty}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() =>
                          dispatch(updateQty({ key: it.key, delta: 1 }))
                        }
                      >
                        +
                      </button>
                    </div>

                    <div className="drawer-item-actions">
                      {/* Edit Variant Button (Pencil Icon) */}
                      <button
                        type="button"
                        className="drawer-action-btn edit"
                        title="Edit size or color"
                        aria-label={`Edit ${it.name}`}
                        onClick={() => handleOpenEditModal(it)}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                        </svg>
                      </button>

                      {/* Remove Button (Trash Icon) */}
                      <button
                        type="button"
                        className="drawer-action-btn delete"
                        title="Remove from bag"
                        aria-label={`Remove ${it.name}`}
                        onClick={() => dispatch(removeItem(it.key))}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <div className="dr-foot" id="drFoot">
        {!items.length ? (
          <button
            type="button"
            className="go alt"
            onClick={() => dispatch(setBagDrawerOpen(false))}
          >
            Keep Shopping
          </button>
        ) : (
          <>
            <div className="freebar">
              <span className="freebar-text">
                {freeRemaining
                  ? `Add ${formatPrice(freeRemaining)} more for Free Delivery`
                  : "✨ Free Delivery Unlocked across Pakistan"}
              </span>
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
              Proceed to Checkout →
            </a>

            <button
              type="button"
              className="go alt"
              onClick={() => dispatch(setBagDrawerOpen(false))}
            >
              Continue Shopping
            </button>
          </>
        )}
      </div>

      {/* Edit Item Variant Modal / Bottom Sheet */}
      {editingItem && (
        <div className="bag-edit-modal-backdrop" onClick={handleCloseEditModal}>
          <div className="bag-edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="bag-edit-header">
              <div className="bag-edit-title-wrap">
                <span className="bag-edit-eyebrow">Modify Garment Variant</span>
                <h3>{editingItem.name}</h3>
              </div>
              <button
                type="button"
                className="bag-edit-close"
                onClick={handleCloseEditModal}
                aria-label="Close editor"
              >
                ×
              </button>
            </div>

            <div className="bag-edit-body">
              {/* Dynamic Live SVG Preview & Price */}
              <div className="bag-edit-preview-card">
                <div
                  className="bag-edit-preview-pic"
                  dangerouslySetInnerHTML={{
                    __html: miniSVG(editAge, { ...editingItem.p, c: editColor.hex }),
                  }}
                />
                <div className="bag-edit-preview-info">
                  <div className="bag-edit-price-row">
                    <span className="bag-edit-curr-price">
                      {formatPrice(editingItem.price * editQty)}
                    </span>
                    {editQty > 1 && (
                      <span className="bag-edit-unit-price">
                        ({formatPrice(editingItem.price)} each)
                      </span>
                    )}
                  </div>
                  <span className="bag-edit-save-badge">
                    ✨ Modest Fit · 7-Day Size Exchange
                  </span>
                  <div className="bag-edit-active-tags">
                    <span className="active-tag-size">Size {editSize}</span>
                    <span className="active-tag-color">
                      <span
                        className="color-dot-inline"
                        style={{ backgroundColor: editColor.hex }}
                      />
                      {editColor.name}
                    </span>
                  </div>
                </div>
              </div>

              {/* Size Selector */}
              <div className="bag-edit-section">
                <div className="bag-edit-sec-head">
                  <span className="bag-edit-sec-title">SELECT SIZE</span>
                  <span className="bag-edit-sec-val">Size {editSize}</span>
                </div>
                <div className="bag-edit-sizes-grid">
                  {CHECKOUT_SIZES.map((sz) => {
                    const isSelected = sz.size === editSize;
                    return (
                      <button
                        key={sz.size}
                        type="button"
                        className={`bag-edit-size-pill ${isSelected ? "active" : ""}`}
                        onClick={() => {
                          setEditSize(sz.size);
                          setEditAge(sz.age);
                        }}
                      >
                        <span className="sz-num">Size {sz.size}</span>
                        <span className="sz-sub">{sz.label.split("(")[1]?.replace(")", "") || `Age ${sz.age}`}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Color Selector */}
              <div className="bag-edit-section">
                <div className="bag-edit-sec-head">
                  <span className="bag-edit-sec-title">SELECT COLOR</span>
                  <span className="bag-edit-sec-val">{editColor.name}</span>
                </div>
                <div className="bag-edit-colors-grid">
                  {CHECKOUT_COLORS.map((col) => {
                    const isSelected =
                      editColor.hex.toLowerCase() === col.hex.toLowerCase();
                    return (
                      <button
                        key={col.name}
                        type="button"
                        className={`bag-edit-color-swatch ${isSelected ? "active" : ""}`}
                        style={{ backgroundColor: col.hex }}
                        title={col.name}
                        onClick={() => setEditColor(col)}
                      >
                        {isSelected && <span className="swatch-check">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="bag-edit-section qty-section">
                <span className="bag-edit-sec-title">QUANTITY</span>
                <div className="bag-edit-qty-stepper">
                  <button
                    type="button"
                    disabled={editQty <= 1}
                    onClick={() => setEditQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <span>{editQty}</span>
                  <button
                    type="button"
                    onClick={() => setEditQty((q) => q + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div className="bag-edit-footer">
              <button
                type="button"
                className="bag-edit-update-btn"
                onClick={handleSaveItemEdit}
              >
                REPLACE ITEM · {formatPrice(editingItem.price * editQty)}
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default BagDrawer;
