import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTargetAge, showToast } from "../store/appSlice";
import { addItem } from "../store/bagSlice";
import {
  STUDIO_COLORS,
  STUDIO_BOTTOMS,
  STUDIO_KHIMARS,
  STUDIO_STYLES,
} from "../data/catalog";
import { sizeOf, lineOf, figure } from "../utils/figureGenerator";

export const StyleHerStudio = () => {
  const dispatch = useDispatch();
  const targetAge = useSelector(selectTargetAge);

  const [styleName, setStyleName] = useState("Frock");
  const [colorIndex, setColorIndex] = useState(0);
  const [bottomIndex, setBottomIndex] = useState(0);
  const [khimarIndex, setKhimarIndex] = useState(0);

  const currentLine = lineOf(targetAge);
  const S = STUDIO_STYLES[styleName];
  const sz = sizeOf(targetAge)[2];

  const studioProduct = {
    c: STUDIO_COLORS[colorIndex][1],
    hj: STUDIO_KHIMARS[khimarIndex][1],
    type: S.type,
    len: S.len[currentLine],
    flare: S.flare,
    bottom: S.bottom,
    bc: STUDIO_BOTTOMS[bottomIndex][1],
    trim: S.trim,
    buttons: S.buttons,
  };

  const scale = targetAge <= 6 ? 2.6 : targetAge <= 10 ? 2.25 : 2.0;
  const studioFig = figure(targetAge, studioProduct, 150, 385, scale);

  const lookDesc = `${STUDIO_COLORS[colorIndex][0]} ${styleName.toLowerCase()}${
    S.bottom
      ? ` with ${STUDIO_BOTTOMS[bottomIndex][0].toLowerCase()} ${S.bottom}`
      : ""
  } and a ${STUDIO_KHIMARS[khimarIndex][0].toLowerCase()} khimar`;

  const totalPrice = S.price[currentLine] + 600;

  const handleAddLook = () => {
    dispatch(
      addItem({
        key: `look|${styleName}|${colorIndex}|${bottomIndex}|${khimarIndex}|${sz}`,
        name: `${STUDIO_COLORS[colorIndex][0]} ${styleName} look`,
        note: `with ${STUDIO_KHIMARS[khimarIndex][0].toLowerCase()} khimar`,
        size: sz,
        price: totalPrice,
        age: targetAge,
        p: studioProduct,
      })
    );
    dispatch(
      showToast(
        `Added ${STUDIO_COLORS[colorIndex][0]} ${styleName} look, size ${sz}`
      )
    );
  };

  return (
    <section className="studio" id="studio" hidden>
      <div className="wrap">
        <div className="s-fig">
          <svg
            id="s4fig"
            viewBox="0 0 300 400"
            aria-hidden="true"
            dangerouslySetInnerHTML={{ __html: studioFig.svg }}
          />
        </div>
        <div className="s-ctrl">
          <h2>Style her look</h2>
          <p>
            Choose the style, the colours and her khimar together, then add the
            whole look in her size.
          </p>
          <p className="s-age" id="s4age">
            Styling for <b>{targetAge} years · size {sz}</b> (
            {currentLine === "k" ? "Girls" : "Older Girls"}).{" "}
            <a href="#grow">Change her age</a>
          </p>

          {/* Style Selector */}
          <div className="s-row">
            <span className="s-lbl">Style</span>
            <div className="seg" role="group" aria-label="Style" id="st4">
              {Object.keys(STUDIO_STYLES).map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={k === styleName}
                  onClick={() => setStyleName(k)}
                >
                  {k}
                </button>
              ))}
            </div>
          </div>

          {/* Dress Colour */}
          <div className="s-row">
            <span className="s-lbl">Dress colour</span>
            <div className="sw" role="group" aria-label="Dress colour">
              {STUDIO_COLORS.map((c, i) => (
                <button
                  key={c[0]}
                  type="button"
                  style={{ background: c[1] }}
                  aria-label={c[0]}
                  aria-pressed={colorIndex === i}
                  onClick={() => setColorIndex(i)}
                />
              ))}
            </div>
          </div>

          {/* Shalwar or Trouser Colour */}
          {S.bottom && (
            <div className="s-row" id="row-b">
              <span className="s-lbl" id="lbl-b">
                {S.bottom === "shalwar" ? "Shalwar colour" : "Trouser colour"}
              </span>
              <div
                className="sw"
                role="group"
                aria-label="Shalwar or trouser colour"
              >
                {STUDIO_BOTTOMS.map((c, i) => (
                  <button
                    key={c[0]}
                    type="button"
                    style={{ background: c[1] }}
                    aria-label={c[0]}
                    aria-pressed={bottomIndex === i}
                    onClick={() => setBottomIndex(i)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Khimar Colour */}
          <div className="s-row">
            <span className="s-lbl">Khimar colour</span>
            <div className="sw" role="group" aria-label="Khimar colour">
              {STUDIO_KHIMARS.map((c, i) => (
                <button
                  key={c[0]}
                  type="button"
                  style={{ background: c[1] }}
                  aria-label={c[0]}
                  aria-pressed={khimarIndex === i}
                  onClick={() => setKhimarIndex(i)}
                />
              ))}
            </div>
          </div>

          {/* Look Summary & Add */}
          <div className="s-sum">
            <p id="sum4">
              <b>Her look:</b> {lookDesc}
              <br />
              Size {sz} · from Rs {totalPrice.toLocaleString("en-PK")} with khimar (draft price)
            </p>
            <button type="button" id="add4" onClick={handleAddLook}>
              Add this look
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StyleHerStudio;
