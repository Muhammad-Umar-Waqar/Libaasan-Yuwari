import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import {
  selectTargetAge,
  selectChosenGarments,
  selectCategoryFilter,
  selectSizeChartOpen,
  selectHasSeenOpening,
  setTargetAge,
  setChosenGarment,
  setCategoryFilter,
  setSizeChartOpen,
  showToast,
} from "../store/appSlice";
import { addItem, selectIsBagDrawerOpen } from "../store/bagSlice";
import {
  HEIGHTS,
  PRODUCTS,
  CHECKOUT_COLORS,
} from "../data/catalog";
import {
  sizeOf,
  sizeTxt,
  stageOf,
  lineOf,
  both,
  figure,
  miniSVG,
  STAGE_CONFIG,
  ARCH_PATH,
  GOLD,
  f,
} from "../utils/figureGenerator";

export const FIVE_HERO_COLORS = [
  { name: "Blush", hex: "#E8BBAA", hj: "#6A9486" },
  { name: "Mint", hex: "#A9CBB7", hj: "#3D6B5E" },
  { name: "Rose", hex: "#C99A9E", hj: "#7E5560" },
  { name: "Sage", hex: "#8FA89A", hj: "#2E5D50" },
  { name: "Plum", hex: "#7E4A63", hj: "#5E8B7E" },
];

export const HeroSection = () => {
  const dispatch = useDispatch();
  const targetAge = useSelector(selectTargetAge);
  const chosenGarments = useSelector(selectChosenGarments);
  const categoryFilter = useSelector(selectCategoryFilter);
  const isBagDrawerOpen = useSelector(selectIsBagDrawerOpen);
  const isSizeChartOpen = useSelector(selectSizeChartOpen);
  const hasSeenOpening = useSelector(selectHasSeenOpening);

  // Smooth stage interpolation animation
  const [shownAge, setShownAge] = useState(targetAge);
  const shownAgeRef = useRef(targetAge);
  const targetAgeRef = useRef(targetAge);
  const rafRef = useRef(null);
  const svgRef = useRef(null);

  targetAgeRef.current = targetAge;

  const currentLine = lineOf(targetAge);
  const currentGarmentId = chosenGarments[currentLine];
  const activeProduct =
    PRODUCTS.find((p) => p.id === currentGarmentId) || PRODUCTS[0];

  useEffect(() => {
    const isReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const animate = () => {
      const d = targetAgeRef.current - shownAgeRef.current;
      if (Math.abs(d) < 0.02 || isReduced) {
        shownAgeRef.current = targetAgeRef.current;
        setShownAge(targetAgeRef.current);
      } else {
        shownAgeRef.current += d * 0.18;
        setShownAge(shownAgeRef.current);
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    if (shownAgeRef.current !== targetAge) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [targetAge]);

  // Height finder local state
  const [heightUnit, setHeightUnit] = useState("cm");
  const [hgtVal, setHgtVal] = useState("");
  const [hgtInchesVal, setHgtInchesVal] = useState("");
  const [finderMsg, setFinderMsg] = useState("");

  // Mobile drawer, age slider & categories states
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAgeSliderOpen, setIsAgeSliderOpen] = useState(false);
  const [isCategorySliderOpen, setIsCategorySliderOpen] = useState(false);
  const [isColorSliderOpen, setIsColorSliderOpen] = useState(false);
  const [heroSelectedColor, setHeroSelectedColor] = useState(null);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [draggingAge, setDraggingAge] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const autoScrollTimerRef = useRef(null);
  const isAutoScrollingRef = useRef(false);
  const drawerOpenTimeRef = useRef(0);
  const shopRef = useRef(null);
  const stepperBodyRef = useRef(null);
  const isPointerDownRef = useRef(false);
  const pointerStartYRef = useRef(0);
  const hasMovedRef = useRef(false);

  const MOBILE_CATEGORIES = [
    { id: "all", label: "All Outfits", short: "All" },
    { id: "Shalwar Qameez", label: "Shalwar Qameez", short: "Kurta" },
    { id: "Maxi", label: "Maxi", short: "Maxi" },
    { id: "Abaya", label: "Abaya", short: "Abaya" },
  ];

  const renderCategoryIcon = (catId) => {
    switch (catId) {
      case "Shalwar Qameez":
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 3L3 7L7 9L7 21L17 21L17 9L21 7L18 3L14 5C13 6 11 6 10 5L6 3Z" />
          </svg>
        );
      case "Maxi":
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 3H15L17 8L20 21H4L7 8L9 3Z" />
            <path d="M9 3C10 5 14 5 15 3" />
          </svg>
        );
      case "Abaya":
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M8 3H16L19 21H5L8 3Z" />
            <path d="M12 7V21" strokeDasharray="2 2" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="3" width="7" height="7" rx="1.5" />
            <rect x="14" y="3" width="7" height="7" rx="1.5" />
            <rect x="3" y="14" width="7" height="7" rx="1.5" />
            <rect x="14" y="14" width="7" height="7" rx="1.5" />
          </svg>
        );
    }
  };

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsCategoriesOpen(true);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleAgeChange = (newAge) => {
    dispatch(setTargetAge(newAge));
    setDraggingAge(null);
    setIsAgeSliderOpen(false);
    setIsCategorySliderOpen(false);
    setIsColorSliderOpen(false);

    // If category filter is active, update chosen garment for new line
    const newLine = newAge <= 8 ? "k" : "o";
    if (categoryFilter !== "all") {
      const match = PRODUCTS.find((p) => p.line === newLine && p.tag === categoryFilter);
      if (match) {
        dispatch(setChosenGarment({ line: newLine, id: match.id }));
      }
    }

    setIsMobileDrawerOpen(true);
    drawerOpenTimeRef.current = Date.now();
  };

  const handleCategorySelect = (catId) => {
    dispatch(setCategoryFilter(catId));
    setIsCategorySliderOpen(false);
    setIsAgeSliderOpen(false);
    setIsColorSliderOpen(false);

    // Find matching garment for current line
    let targetGarment = null;
    if (catId === "all") {
      targetGarment = currentLine === "k" ? "k1" : "o2";
    } else {
      const match = PRODUCTS.find((p) => p.line === currentLine && p.tag === catId);
      if (match) targetGarment = match.id;
    }
    if (targetGarment) {
      dispatch(setChosenGarment({ line: currentLine, id: targetGarment }));
    }

    setIsMobileDrawerOpen(true);
    drawerOpenTimeRef.current = Date.now();
  };

  const handleColorSelect = (col) => {
    setHeroSelectedColor(col);
    setIsColorSliderOpen(false);
    setIsAgeSliderOpen(false);
    setIsCategorySliderOpen(false);
    setIsMobileDrawerOpen(true);
    drawerOpenTimeRef.current = Date.now();
  };

  const handleApplyAndShop = () => {
    setIsMobileDrawerOpen(false);
    setIsAgeSliderOpen(false);
    setIsCategorySliderOpen(false);
    setIsColorSliderOpen(false);
    setIsCategoriesOpen(true);

    setTimeout(() => {
      if (shopRef.current) {
        const top = shopRef.current.getBoundingClientRect().top + (window.pageYOffset || window.scrollY || 0) - 72;
        window.scrollTo({
          top: Math.max(0, top),
          behavior: "smooth",
        });
      }
    }, 60);

    const catObj = MOBILE_CATEGORIES.find((c) => c.id === categoryFilter);
    dispatch(
      showToast(
        `Showing ${catObj ? catObj.label : "Outfits"} for Age ${targetAge}`
      )
    );
  };

  const handleOpenDrawer = () => {
    if (autoScrollTimerRef.current) {
      clearTimeout(autoScrollTimerRef.current);
    }
    isAutoScrollingRef.current = false;
    setIsLoading(false);
    setIsMobileDrawerOpen(true);
    drawerOpenTimeRef.current = Date.now();
  };

  const handleCardTry = (p) => {
    dispatch(setChosenGarment({ line: currentLine, id: p.id }));
    if (typeof window !== "undefined" && (window.innerWidth <= 768 || isMobile)) {
      handleOpenDrawer();
    }
  };

  const handleCloseDrawer = () => {
    // Prevent immediate synthetic click tap-through on mobile
    if (Date.now() - drawerOpenTimeRef.current < 300) return;
    if (autoScrollTimerRef.current) {
      clearTimeout(autoScrollTimerRef.current);
    }
    isAutoScrollingRef.current = false;
    setIsLoading(false);
    setIsMobileDrawerOpen(false);
  };

  const getAgeFromClientY = (clientY) => {
    if (!stepperBodyRef.current) return targetAge;
    const rect = stepperBodyRef.current.getBoundingClientRect();
    const relativeY = clientY - rect.top;
    const rowHeight = rect.height / 13;
    const rowIndex = Math.floor(relativeY / rowHeight);
    const clampedRow = Math.max(0, Math.min(12, rowIndex));
    return 15 - clampedRow;
  };

  const handlePointerDown = (e) => {
    if (e.button !== undefined && e.button !== 0) return;
    isPointerDownRef.current = true;
    pointerStartYRef.current = e.clientY;
    hasMovedRef.current = false;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch (err) {}

    const age = getAgeFromClientY(e.clientY);
    setDraggingAge(age);
  };

  const handlePointerMove = (e) => {
    if (!isPointerDownRef.current) return;
    const deltaY = Math.abs(e.clientY - pointerStartYRef.current);
    if (deltaY > 3) {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        setIsDragging(true);
      }
      const age = getAgeFromClientY(e.clientY);
      setDraggingAge((prev) => {
        if (prev !== age && typeof navigator !== "undefined" && navigator.vibrate) {
          try { navigator.vibrate(6); } catch (err) {}
        }
        return age;
      });
    }
  };

  const handlePointerUp = (e) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}

    const finalAge = getAgeFromClientY(e.clientY);
    setIsDragging(false);

    // Keep draggingAge locked at finalAge so it doesn't temporarily revert to old targetAge
    setDraggingAge(finalAge);

    // Commit only on drop or tap with short tick so synthetic click events expire
    setTimeout(() => {
      handleAgeChange(finalAge);
      setDraggingAge(null);
    }, 40);
  };

  const handlePointerCancel = (e) => {
    if (!isPointerDownRef.current) return;
    isPointerDownRef.current = false;

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch (err) {}

    setDraggingAge(null);
    setIsDragging(false);
  };

  useEffect(() => {
    return () => {
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current);
      }
      isAutoScrollingRef.current = false;
    };
  }, []);

  const handleFinderSubmit = (e) => {
    e.preventDefault();
    const raw = parseFloat(hgtVal);
    if (!raw) {
      setFinderMsg(
        heightUnit === "cm"
          ? "Type her height in centimetres, for example 126."
          : "Type her height in feet and inches, for example 4 ft 2 in."
      );
      return;
    }
    const h =
      heightUnit === "cm"
        ? raw
        : (raw * 12 + (parseFloat(hgtInchesVal) || 0)) * 2.54;
    const hs = both(h);

    if (h < HEIGHTS[3] - 6) {
      dispatch(setTargetAge(3));
      setFinderMsg(
        `${hs} is smaller than our smallest size (for age 3). Message us on WhatsApp and we will help.`
      );
      return;
    }
    if (h > HEIGHTS[15] + 4) {
      dispatch(setTargetAge(15));
      setFinderMsg(
        `${hs} is taller than our largest size (ages 13 to 15). Message us on WhatsApp and we will help.`
      );
      return;
    }
    let matchedAge = 3;
    for (let i = 3; i <= 15; i++) {
      if (HEIGHTS[i] >= h) {
        matchedAge = i;
        break;
      }
      matchedAge = 15;
    }
    const sz = sizeOf(matchedAge);
    const upper = sz[1];
    dispatch(setTargetAge(upper));
    setFinderMsg(
      `${hs} fits size ${sizeTxt(
        sz[1]
      )}. If she is between sizes, choose the bigger one so she has room to grow.`
    );
  };

  // Garment lookup for current display
  const baseStageProduct =
    PRODUCTS.find((p) => p.id === chosenGarments[lineOf(Math.round(shownAge))]) ||
    activeProduct;

  const currentStageProduct = heroSelectedColor
    ? {
        ...baseStageProduct,
        c: heroSelectedColor.hex,
        sl: heroSelectedColor.hex,
        ...(heroSelectedColor.hj ? { hj: heroSelectedColor.hj } : {}),
        colorName: heroSelectedColor.name,
      }
    : baseStageProduct;

  const fig = figure(
    shownAge,
    currentStageProduct,
    STAGE_CONFIG.cx,
    STAGE_CONFIG.ground,
    STAGE_CONFIG.scale
  );

  // Stage ruler marks
  const stageMarks = [];
  const roundedShown = Math.round(shownAge);
  for (let a = 3; a <= roundedShown; a++) {
    const y = STAGE_CONFIG.ground - HEIGHTS[a] * STAGE_CONFIG.scale;
    const cur = a === roundedShown;
    stageMarks.push(
      <g key={a}>
        <path
          d={`M70 ${f(y)} h${cur ? 26 : 18}`}
          stroke={cur ? GOLD : "#7A8583"}
          strokeWidth={cur ? 2.4 : 1.3}
          strokeLinecap="round"
        />
        {cur ? (
          <text
            x="72"
            y={f(y - 7)}
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontWeight="700"
            fontSize="13"
            letterSpacing="0.02em"
            fill={GOLD}
          >
            {a} yrs · {both(HEIGHTS[a])}
          </text>
        ) : (
          <text
            x="93"
            y={f(y + 4.5)}
            fontFamily="Plus Jakarta Sans, sans-serif"
            fontWeight="600"
            fontSize="12"
            fill="#7A8583"
          >
            {a}
          </text>
        )}
      </g>
    );
  }

  // Filter chips available for current line
  const availableChips = [
    "all",
    ...Array.from(
      new Set(
        PRODUCTS.filter((p) => p.line === currentLine).map((p) => p.tag)
      )
    ),
  ];

  const filteredProducts = PRODUCTS.filter(
    (p) =>
      p.line === currentLine &&
      (categoryFilter === "all" || p.tag === categoryFilter)
  );

  const sz = sizeOf(targetAge);
  const st = stageOf(targetAge);

  const currentMobileAge = draggingAge !== null ? draggingAge : targetAge;
  const mobileSz = sizeOf(currentMobileAge);
  const mobileSt = stageOf(currentMobileAge);

  const renderStageSvg = (isMobile = false) => (
    <svg
      id={isMobile ? "stageMobile" : "stage"}
      ref={isMobile ? null : svgRef}
      viewBox="0 0 360 540"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={isMobile ? "archClipMobile" : "archClip"}>
          <path d={`${ARCH_PATH}Z`} />
        </clipPath>
        <linearGradient
          id={isMobile ? "archFillMobile" : "archFill"}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0" stopColor="#FBF8F1" />
          <stop offset="1" stopColor="#EFE3CF" />
        </linearGradient>
      </defs>
      <path
        d="M14 540 L14 192 C14 108 118 74 180 0 C242 74 346 108 346 192 L346 540"
        fill="none"
        stroke={GOLD}
        strokeWidth="3"
      />
      <path
        d={`${ARCH_PATH}Z`}
        fill={`url(#${isMobile ? "archFillMobile" : "archFill"})`}
      />
      <g clipPath={`url(#${isMobile ? "archClipMobile" : "archClip"})`}>
        <rect
          x="0"
          y={STAGE_CONFIG.ground}
          width="360"
          height="40"
          fill="#E6D6BC"
        />
        <path
          d={`M28 ${STAGE_CONFIG.ground}H332`}
          stroke="#D6C3A3"
          strokeWidth="1.5"
        />
        <path
          d={`M66 ${STAGE_CONFIG.ground}V110`}
          stroke="#E0CFB2"
          strokeWidth="1"
        />
        {stageMarks}
        <g dangerouslySetInnerHTML={{ __html: fig.svg }} />
      </g>
      <path
        d="M180 36 l7 9 -7 9 -7 -9z"
        fill={GOLD}
        opacity=".9"
      />
    </svg>
  );

  return (
    <section className="hero" id="grow">
      {/* Mobile Stage Drawer (Slides from Right to Left) */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <div className="mobile-drawer-overlay" onClick={handleCloseDrawer}>
            <motion.div
              className="mobile-stage-drawer"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 280 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mobile-drawer-header">
                <div className="mobile-drawer-badge">
                  <span>Age {targetAge}</span>
                  <span className="dot">·</span>
                  <span>Size {sz[2]}</span>
                </div>
                <button
                  type="button"
                  className="mobile-drawer-close"
                  onClick={handleCloseDrawer}
                  aria-label="Close stage drawer"
                >
                  ✕
                </button>
              </div>

              <div className="mobile-drawer-stage-wrap">
                {renderStageSvg(true)}
              </div>

              <div className="mobile-drawer-footer">
                {isLoading && (
                  <div className="gold-dots-loader" role="status" aria-label="Loading collection">
                    <span />
                    <span />
                    <span />
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="wrap">
        {/* Desktop Sticky Stage */}
        <div className="stage desktop-stage" aria-hidden="true">
          {renderStageSvg(false)}
        </div>

        {/* Control Panel */}
        <div className="panel">
          {/* Desktop Panel Top (hidden on mobile <= 768px) */}
          <div className="desktop-panel-top">
            <div className="intro">
              <p className="eyebrow">Modest clothing for girls, 3 to 15</p>
              <h1>
                She grows. <em>Her modesty grows with her.</em>
              </h1>
              <p className="lede">
                Move the slider to her age. She grows in front of you, and the
                shop shows only the clothes and the size made for her right now.
              </p>
            </div>

            <div className="readout">
              <div className="age-num" id="ageNum">
                {targetAge}
              </div>
              <div className="age-meta">
                <span className="yrs" id="ageYrs">
                  {targetAge === 1 ? "year old" : "years old"}
                </span>
                <span className="size" id="ageSize">
                  Size <b>{sz[2]}</b> · about {both(HEIGHTS[targetAge])} tall{" "}
                  <a
                    className="size-link"
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
              <span className="line-pill" id="linePill">
                {targetAge <= 10 ? "Girls · 3 to 10" : "Older Girls · 11 to 15"}
              </span>
            </div>

            <div className="stage-copy" aria-live="polite">
              <h3 id="stTitle">{st[2]}</h3>
              <p id="stText">{st[3]}</p>
            </div>

            <div className="slider">
              <label htmlFor="age">Her age</label>
              <input
                type="range"
                id="age"
                min="3"
                max="15"
                step="1"
                value={targetAge}
                onChange={(e) => dispatch(setTargetAge(+e.target.value))}
                aria-valuetext={`${targetAge} years, size ${sz[2]}`}
              />
              <div className="ticks" id="ticks">
                {Array.from({ length: 13 }, (_, i) => {
                  const a = i + 3;
                  return (
                    <span
                      key={a}
                      className={a === targetAge ? "on" : ""}
                      onClick={() => dispatch(setTargetAge(a))}
                    >
                      {a}
                    </span>
                  );
                })}
              </div>
              <div className="lines">
                <span>
                  Girls <i>3 to 10</i>
                </span>
                <span>
                  Older Girls <i>11 to 15</i>
                </span>
              </div>
            </div>

            {/* Desktop Color Swatches directly below Age Slider - Pure Circles */}
            <div className="desktop-color-circles" role="group" aria-label="Select outfit color">
              {FIVE_HERO_COLORS.map((col) => {
                const isActive = heroSelectedColor
                  ? heroSelectedColor.name === col.name
                  : (currentStageProduct?.colorName === col.name || currentStageProduct?.c === col.hex);
                return (
                  <button
                    key={col.name}
                    type="button"
                    className={`desktop-color-circle-btn ${isActive ? "active" : ""}`}
                    onClick={() => handleColorSelect(col)}
                    aria-label={`Select ${col.name} color`}
                    title={col.name}
                    style={{ backgroundColor: col.hex }}
                  />
                );
              })}
            </div>
          </div>

          {/* Mobile Hero Container (visible only on mobile <= 768px) */}
          <div className="mobile-hero-container">
            <div className="mobile-intro">
              <p className="eyebrow">Modest clothing for girls, 3 to 15</p>
              <h1>
                She grows. <em>Her modesty grows with her.</em>
              </h1>
            </div>

            {/* Left Fixed Mobile Dual Sliders Dock */}
            {!isBagDrawerOpen && !isSizeChartOpen && hasSeenOpening && (
              <div className="mobile-dual-sliders-dock" onClick={(e) => e.stopPropagation()}>
                {/* 1. Age Slider */}
                <div className={`mobile-vert-stepper ${isAgeSliderOpen ? "expanded" : "collapsed"}`}>
                  <button
                    type="button"
                    className="stepper-toggle-head"
                    onClick={() => {
                      const willOpen = !isAgeSliderOpen;
                      setIsAgeSliderOpen(willOpen);
                      if (willOpen) {
                        setIsCategorySliderOpen(false);
                        setIsColorSliderOpen(false);
                      }
                      setIsMobileDrawerOpen(true);
                      drawerOpenTimeRef.current = Date.now();
                    }}
                    aria-expanded={isAgeSliderOpen}
                    aria-label={isAgeSliderOpen ? "Collapse age slider" : "Expand age slider"}
                  >
                    <div className="stepper-age-circle">
                      <span className="stepper-age-val">{currentMobileAge}</span>
                      <svg
                        className="stepper-chevron"
                        viewBox="0 0 24 24"
                        width="13"
                        height="13"
                        fill="none"
                        stroke="#C5923B"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points={isAgeSliderOpen ? "6 15 12 9 18 15" : "6 9 12 15 18 9"} />
                      </svg>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isAgeSliderOpen && (
                      <motion.div
                        className="stepper-expandable-wrap"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="stepper-tag top">
                          <span>Older</span>
                          <i>11–15</i>
                        </div>

                        <div
                          className={`stepper-body ${isDragging ? "is-dragging" : ""}`}
                          ref={stepperBodyRef}
                          onPointerDown={handlePointerDown}
                          onPointerMove={handlePointerMove}
                          onPointerUp={handlePointerUp}
                          onPointerCancel={handlePointerCancel}
                        >
                          <div className="stepper-center-line" />

                          <div className="stepper-steps">
                            {Array.from({ length: 13 }, (_, i) => {
                              const a = 15 - i;
                              const isActive = a === currentMobileAge;
                              return (
                                <div
                                  key={a}
                                  className={`stepper-step-row ${isActive ? "active" : ""}`}
                                  role="button"
                                  tabIndex={0}
                                  aria-label={`Select age ${a}`}
                                  onClick={() => handleAgeChange(a)}
                                >
                                  <div className="step-node">
                                    <span className="step-dot" />
                                    {isActive && (
                                      <span
                                        className={`step-active-thumb ${
                                          isDragging ? "is-dragging" : ""
                                        }`}
                                      >
                                        {a}
                                      </span>
                                    )}
                                  </div>
                                  <span className={`step-label ${isActive ? "on" : ""}`}>
                                    {a}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        <div className="stepper-tag btm">
                          <span>Girls</span>
                          <i>3–10</i>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 2. Categories Slider */}
                <div className={`mobile-cat-stepper ${isCategorySliderOpen ? "expanded" : "collapsed"}`}>
                  <button
                    type="button"
                    className="cat-stepper-toggle-head"
                    onClick={() => {
                      const willOpen = !isCategorySliderOpen;
                      setIsCategorySliderOpen(willOpen);
                      if (willOpen) {
                        setIsAgeSliderOpen(false);
                        setIsColorSliderOpen(false);
                      }
                      setIsMobileDrawerOpen(true);
                      drawerOpenTimeRef.current = Date.now();
                    }}
                    aria-expanded={isCategorySliderOpen}
                    aria-label={isCategorySliderOpen ? "Collapse categories slider" : "Expand categories slider"}
                  >
                    <div className="cat-stepper-circle">
                      <span className="cat-toggle-icon">
                        {renderCategoryIcon(categoryFilter)}
                      </span>
                      <span className="cat-stepper-short-label">
                        {MOBILE_CATEGORIES.find((c) => c.id === categoryFilter)?.short || "All"}
                      </span>
                      <svg
                        className="stepper-chevron"
                        viewBox="0 0 24 24"
                        width="12"
                        height="12"
                        fill="none"
                        stroke="#8A6428"
                        strokeWidth="3.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                      >
                        <polyline points={isCategorySliderOpen ? "6 15 12 9 18 15" : "6 9 12 15 18 9"} />
                      </svg>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isCategorySliderOpen && (
                      <motion.div
                        className="cat-stepper-expandable-wrap"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="stepper-tag top">
                          <span>Styles</span>
                          <i>Choice</i>
                        </div>

                        <div className="cat-options-list">
                          {MOBILE_CATEGORIES.map((cat) => {
                            const isActive = categoryFilter === cat.id;
                            return (
                              <button
                                key={cat.id}
                                type="button"
                                className={`cat-option-btn ${isActive ? "active" : ""}`}
                                onClick={() => handleCategorySelect(cat.id)}
                              >
                                <span className="cat-opt-icon">{renderCategoryIcon(cat.id)}</span>
                                <span className="cat-opt-label">{cat.label}</span>
                                {isActive && <span className="cat-active-indicator">✓</span>}
                              </button>
                            );
                          })}
                        </div>

                        <div className="stepper-tag btm">
                          <span>Shop</span>
                          <i>Now</i>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 3. Color Slider */}
                <div className={`mobile-color-stepper ${isColorSliderOpen ? "expanded" : "collapsed"}`}>
                  <button
                    type="button"
                    className="color-stepper-toggle-head"
                    onClick={() => {
                      const willOpen = !isColorSliderOpen;
                      setIsColorSliderOpen(willOpen);
                      if (willOpen) {
                        setIsAgeSliderOpen(false);
                        setIsCategorySliderOpen(false);
                      }
                      setIsMobileDrawerOpen(true);
                      drawerOpenTimeRef.current = Date.now();
                    }}
                    aria-expanded={isColorSliderOpen}
                    aria-label={isColorSliderOpen ? "Collapse color slider" : "Expand color slider"}
                  >
                    <div
                      className="color-stepper-circle color-only-circle"
                      style={{
                        backgroundColor: heroSelectedColor
                          ? heroSelectedColor.hex
                          : (currentStageProduct?.c || "#E8BBAA"),
                      }}
                    >
                      <svg
                        className="stepper-chevron"
                        viewBox="0 0 24 24"
                        width="12"
                        height="12"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="3.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        style={{ filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.55))" }}
                      >
                        <polyline points={isColorSliderOpen ? "6 15 12 9 18 15" : "6 9 12 15 18 9"} />
                      </svg>
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isColorSliderOpen && (
                      <motion.div
                        className="color-stepper-expandable-wrap"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="stepper-tag top">
                          <span>Colors</span>
                          <i>Palette</i>
                        </div>

                        <div className="color-options-list">
                          {FIVE_HERO_COLORS.map((col) => {
                            const isActive = heroSelectedColor
                              ? heroSelectedColor.name === col.name
                              : (currentStageProduct?.colorName === col.name || currentStageProduct?.c === col.hex || currentStageProduct?.sl === col.hex);
                            return (
                              <button
                                key={col.name}
                                type="button"
                                className={`color-option-btn color-only-btn ${isActive ? "active" : ""}`}
                                onClick={() => handleColorSelect(col)}
                                title={col.name}
                                aria-label={`Select ${col.name}`}
                              >
                                <span
                                  className="color-opt-swatch"
                                  style={{ backgroundColor: col.hex }}
                                />
                                {isActive && <span className="color-active-indicator">✓</span>}
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* 4. Next / Shop Button */}
                <button
                  type="button"
                  className={`mobile-slider-next-btn ${isMobileDrawerOpen ? "drawer-open" : ""}`}
                  onClick={handleApplyAndShop}
                  aria-label="Shop now and jump down to outfits"
                  title="Shop Outfits"
                >
                  <div className="next-btn-inner">
                    <span className="next-btn-text">NEXT</span>
                    <svg
                      className="next-btn-arrow down-arrow"
                      viewBox="0 0 24 24"
                      width="14"
                      height="14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </button>
              </div>
            )}

            <div className="mobile-hero-hub">
              {/* Right: Option A Hero Card */}
              <div className="mobile-hero-card">
                {/* Clean Sizing Hero Card (Image 3) */}
                <div
                  className="mobile-size-card"
                  onClick={handleOpenDrawer}
                  style={{ cursor: "pointer" }}
                  role="button"
                  tabIndex={0}
                  aria-label={`Size ${mobileSz[2]}, About ${both(HEIGHTS[currentMobileAge])} tall`}
                >
                  <div className="size-badge-box">
                    <span className="size-badge-label">SIZE</span>
                    <span className="size-badge-val">{mobileSz[2]}</span>
                  </div>
                  <div className="size-info-col">
                    <span className="size-info-height">
                      About {both(HEIGHTS[currentMobileAge])} tall
                    </span>
                    <div className="size-stage-row">
                      <span className="stage-pill">{mobileSt[2]}</span>
                      
                      <a
                        className="mobile-sc-link pl-1 text-white no-underline hover:underline"
                        href="#sizechart"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          dispatch(setSizeChartOpen(true));
                        }}
                      >
                        Size chart ›
                      </a>
                    </div>
                  </div>
                </div>

                <div className="mobile-trust-pills">
                  <span>✓ Cash on Delivery</span>
                  <span>✓ 7-Day Size Exchange</span>
                </div>

                {/* Compact Mobile Height Finder */}
                <form
                  className="mobile-finder-row"
                  onSubmit={handleFinderSubmit}
                  noValidate
                >
                  <div className="mf-input-cluster">
                    <input
                      type="number"
                      inputMode="decimal"
                      step="any"
                      placeholder={heightUnit === "cm" ? "e.g. 126" : "ft"}
                      aria-label="Her height"
                      value={hgtVal}
                      onChange={(e) => setHgtVal(e.target.value)}
                    />
                    {heightUnit === "ft" && (
                      <input
                        type="number"
                        inputMode="numeric"
                        step="any"
                        placeholder="in"
                        aria-label="Inches"
                        value={hgtInchesVal}
                        onChange={(e) => setHgtInchesVal(e.target.value)}
                      />
                    )}
                    <div className="mf-unit-group" role="group" aria-label="Height unit">
                      <button
                        type="button"
                        className={heightUnit === "cm" ? "active" : ""}
                        onClick={() => setHeightUnit("cm")}
                      >
                        cm
                      </button>
                      <button
                        type="button"
                        className={heightUnit === "ft" ? "active" : ""}
                        onClick={() => setHeightUnit("ft")}
                      >
                        ft / in
                      </button>
                    </div>
                  </div>
                  <button type="submit" className="mf-submit-btn">
                    Find size
                  </button>
                </form>
                {finderMsg && (
                  <p className="mobile-finder-msg" aria-live="polite">
                    {finderMsg}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Height Finder */}
          <form className="finder" id="finder" onSubmit={handleFinderSubmit} noValidate>
            <label htmlFor="hgt">Not sure of her size? Enter her height.</label>
            <div className="fld">
              <input
                id="hgt"
                type="number"
                inputMode="decimal"
                step="any"
                placeholder={heightUnit === "cm" ? "e.g. 126" : "ft"}
                aria-label="Her height"
                value={hgtVal}
                onChange={(e) => setHgtVal(e.target.value)}
              />
              <input
                id="hgt2"
                type="number"
                inputMode="numeric"
                step="any"
                placeholder="in"
                aria-label="Inches"
                hidden={heightUnit === "cm"}
                value={hgtInchesVal}
                onChange={(e) => setHgtInchesVal(e.target.value)}
              />
              <div className="useg" role="group" aria-label="Height unit">
                <button
                  type="button"
                  data-hu="cm"
                  aria-pressed={heightUnit === "cm"}
                  onClick={() => setHeightUnit("cm")}
                >
                  cm
                </button>
                <button
                  type="button"
                  data-hu="ft"
                  aria-pressed={heightUnit === "ft"}
                  onClick={() => setHeightUnit("ft")}
                >
                  ft / in
                </button>
              </div>
            </div>
            <button type="submit">Find size</button>
            {finderMsg && (
              <p className="finder-msg" id="finderMsg" aria-live="polite">
                {finderMsg}
              </p>
            )}
          </form>

          {/* Shop Strip */}
          <div className="shop" ref={shopRef}>
            <div className="shop-head">
              <h2 id="shopTitle">Made for her at {targetAge}</h2>
              <div className="chips" role="group" aria-label="Filter">
                <button
                  type="button"
                  aria-pressed={categoryFilter === "all"}
                  onClick={() => dispatch(setCategoryFilter("all"))}
                >
                  All
                </button>
                {["Shalwar Qameez", "Frock", "Maxi", "Abaya"].map((tag) => {
                  const isPresent = availableChips.includes(tag);
                  return (
                    <button
                      key={tag}
                      type="button"
                      hidden={!isPresent}
                      aria-pressed={categoryFilter === tag}
                      onClick={() => dispatch(setCategoryFilter(tag))}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Outfits Product Rail (Direct on both mobile and desktop) */}
            <div className="rail" id="rail">
              {filteredProducts.map((p) => {
                const isWearing = p.id === chosenGarments[currentLine];
                const displayProduct = heroSelectedColor
                  ? {
                      ...p,
                      c: heroSelectedColor.hex,
                      sl: heroSelectedColor.hex,
                      ...(heroSelectedColor.hj ? { hj: heroSelectedColor.hj } : {}),
                      colorName: heroSelectedColor.name,
                    }
                  : p;
                return (
                  <div key={p.id} className={`card ${isWearing ? "on" : ""}`}>
                    <button
                      className="try"
                      type="button"
                      aria-label={`See her in the ${p.name}`}
                      onClick={() => handleCardTry(displayProduct)}
                    >
                      <span className="pic">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: miniSVG(targetAge, displayProduct),
                          }}
                        />
                        {isWearing && <span className="wearing">Wearing</span>}
                      </span>
                      <span className="txt">
                        <span className="tag">{p.tag}</span>
                        <span className="nm">{p.name}</span>
                        <span className="pr">Rs {p.price} · draft price</span>
                      </span>
                    </button>
                    <button
                      className="add"
                      type="button"
                      onClick={() => {
                        dispatch(
                          addItem({
                            key: `${p.id}|${sz[2]}|${heroSelectedColor ? heroSelectedColor.name : "default"}`,
                            name: p.name,
                            size: sizeTxt(targetAge),
                            price: +p.price.replace(/,/g, ""),
                            age: targetAge,
                            p: displayProduct,
                          })
                        );
                        dispatch(
                          showToast(`Added ${p.name}, size ${sizeTxt(targetAge)}`)
                        );
                      }}
                    >
                      Add size {sizeTxt(targetAge)}
                    </button>
                  </div>
                );
              })}
            </div>
            <p className="rail-sc">
              Not sure of her size?{" "}
              <a
                href="#sizechart"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(setSizeChartOpen(true));
                }}
              >
                Open the size chart
              </a>{" "}
              · English and اردو
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
