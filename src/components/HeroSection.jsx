import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectTargetAge,
  selectChosenGarments,
  selectCategoryFilter,
  setTargetAge,
  setChosenGarment,
  setCategoryFilter,
  setSizeChartOpen,
  showToast,
} from "../store/appSlice";
import { addItem } from "../store/bagSlice";
import {
  HEIGHTS,
  PRODUCTS,
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

export const HeroSection = () => {
  const dispatch = useDispatch();
  const targetAge = useSelector(selectTargetAge);
  const chosenGarments = useSelector(selectChosenGarments);
  const categoryFilter = useSelector(selectCategoryFilter);

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
  const currentStageProduct =
    PRODUCTS.find((p) => p.id === chosenGarments[lineOf(Math.round(shownAge))]) ||
    activeProduct;

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
            fontFamily="Caveat, cursive"
            fontSize="16"
            fill={GOLD}
          >
            {a} yrs · {both(HEIGHTS[a])}
          </text>
        ) : (
          <text
            x="93"
            y={f(y + 4.5)}
            fontFamily="Caveat, cursive"
            fontSize="13"
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

  return (
    <section className="hero" id="grow">
      <div className="wrap">
        {/* Sticky Stage */}
        <div className="stage" aria-hidden="true">
          <svg id="stage" ref={svgRef} viewBox="0 0 360 540">
            <defs>
              <clipPath id="archClip">
                <path d={`${ARCH_PATH}Z`} />
              </clipPath>
              <linearGradient id="archFill" x1="0" y1="0" x2="0" y2="1">
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
            <path d={`${ARCH_PATH}Z`} fill="url(#archFill)" />
            <g clipPath="url(#archClip)">
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
        </div>

        {/* Control Panel */}
        <div className="panel">
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
          <div className="shop">
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

            <div className="rail" id="rail">
              {filteredProducts.map((p) => {
                const isWearing = p.id === chosenGarments[currentLine];
                return (
                  <div key={p.id} className={`card ${isWearing ? "on" : ""}`}>
                    <button
                      className="try"
                      type="button"
                      aria-label={`See her in the ${p.name}`}
                      onClick={() =>
                        dispatch(setChosenGarment({ line: currentLine, id: p.id }))
                      }
                    >
                      <span className="pic">
                        <span
                          dangerouslySetInnerHTML={{
                            __html: miniSVG(targetAge, p),
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
                            key: `${p.id}|${sz[2]}`,
                            name: p.name,
                            size: sizeTxt(targetAge),
                            price: +p.price.replace(/,/g, ""),
                            age: targetAge,
                            p,
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
