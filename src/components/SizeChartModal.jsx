import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectSizeChartOpen,
  selectSizeChartLang,
  selectTargetAge,
  setSizeChartOpen,
  setSizeChartLang,
} from "../store/appSlice";
import { SIZE_CHART, SIZE_CHART_TEXT } from "../data/catalog";
import { sizeOf, ftc } from "../utils/figureGenerator";

export const SizeChartModal = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectSizeChartOpen);
  const lang = useSelector(selectSizeChartLang);
  const targetAge = useSelector(selectTargetAge);
  const highlightedRowRef = useRef(null);

  const L = SIZE_CHART_TEXT[lang];
  const isUrdu = lang === "ur";
  const mySize = sizeOf(targetAge)[2];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (highlightedRowRef.current) {
          highlightedRowRef.current.scrollIntoView({
            block: "nearest",
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [isOpen]);

  const handleClose = () => {
    dispatch(setSizeChartOpen(false));
  };

  return (
    <div
      className={`sc ${isOpen ? "on" : ""}`}
      id="sc"
      role="dialog"
      aria-modal="true"
      aria-labelledby="scTitle"
      aria-hidden={!isOpen}
    >
      <div
        className={`sc-box ${isUrdu ? "ur" : ""}`}
        id="scBox"
        dir={isUrdu ? "rtl" : "ltr"}
      >
        <div className="sc-head">
          <div>
            <h2 id="scTitle">{L.t}</h2>
            <p id="scSub">{L.sub}</p>
          </div>
          <div className="sc-tools">
            <div
              className="seg"
              id="scLang"
              role="group"
              aria-label="Language"
            >
              <button
                type="button"
                data-l="en"
                aria-pressed={lang === "en"}
                onClick={() => dispatch(setSizeChartLang("en"))}
              >
                English
              </button>
              <button
                type="button"
                data-l="ur"
                className="urb"
                lang="ur"
                aria-pressed={lang === "ur"}
                onClick={() => dispatch(setSizeChartLang("ur"))}
              >
                اردو
              </button>
            </div>
            <button
              type="button"
              className="x"
              id="scClose"
              aria-label="Close size chart"
              onClick={handleClose}
            >
              ×
            </button>
          </div>
        </div>

        <div className="sc-body">
          <div className="sc-tbl" id="scTable">
            <table>
              <thead>
                <tr>
                  <th>{L.size}</th>
                  <th className="ag">{L.age}</th>
                  <th>
                    {L.len}
                    <small>{L.lenS}</small>
                  </th>
                  <th>{L.sl}</th>
                  <th>
                    {L.w}
                    <small>{L.wS}</small>
                  </th>
                  <th>
                    {L.h}
                    <small>{L.wS}</small>
                  </th>
                </tr>
              </thead>
              <tbody>
                {SIZE_CHART.map((r) => {
                  const isCurrent = r[0] === mySize;
                  return (
                    <tr
                      key={r[0]}
                      className={isCurrent ? "hi" : ""}
                      ref={isCurrent ? highlightedRowRef : null}
                    >
                      <th>
                        <span className="szb">{r[0]}</span>
                      </th>
                      <td className="ag">
                        <span className="a">
                          {isUrdu ? r[2] : r[1]} {L.yrs}
                        </span>
                        {isCurrent && <span className="her">{L.her}</span>}
                        <small dir="ltr">
                          {r[3][0]}–{r[3][1]} cm · {ftc(r[3][0])}–{ftc(r[3][1])}
                        </small>
                      </td>
                      <td>
                        <b dir="ltr">{r[4]}″</b>
                        <small dir="ltr">{Math.round(r[4] * 2.54)} cm</small>
                      </td>
                      <td>
                        <b dir="ltr">{r[5]}″</b>
                        <small dir="ltr">{Math.round(r[5] * 2.54)} cm</small>
                      </td>
                      <td>
                        <b dir="ltr">{r[6]}″</b>
                        <small dir="ltr">{Math.round(r[6] * 2.54)} cm</small>
                      </td>
                      <td>
                        <b dir="ltr">{r[7]}″</b>
                        <small dir="ltr">{Math.round(r[7] * 2.54)} cm</small>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="sc-tips" id="scTips">
            {L.tips.map((tip, idx) => (
              <p key={idx} dangerouslySetInnerHTML={{ __html: tip }} />
            ))}
            <p className="ask">
              {L.ask}{" "}
              <a
                href="#join"
                onClick={() => {
                  handleClose();
                  const el = document.getElementById("join");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
              >
                WhatsApp
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeChartModal;
