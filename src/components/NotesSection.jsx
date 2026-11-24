import React from "react";

export const NotesSection = () => {
  return (
    <section className="band notes">
      <div className="wrap">
        <details>
          <summary>Notes for the website team</summary>
          <ul>
            <li>
              <b>The age slider runs the shop.</b> Age gives a size from the
              tailor's chart (sizes 1 to 9: one size per year up to age 8, then
              9–10, 11–12 and 13–15). The rail shows only products stocked in
              that size, and every Add button adds that size.
            </li>
            <li>
              <b>Two lines in one slider.</b> Ages 3 to 10 show the Girls
              designs. Ages 11 to 15 switch to the separate Older Girls designs.
            </li>
            <li>
              <b>Remember her.</b> Save the last age on the device, so a
              returning mother lands on her daughter's size. Later, ask for the
              birth month and move her up a size each year.
            </li>
            <li>
              <b>The girl is drawn in code</b>, not a photo or video, so the
              page stays fast on mobile data. An illustrator should redraw her
              in the logo's style. Real product photos go on the product pages.
            </li>
            <li>
              <b>Height finder</b> uses the brand size chart. Between two
              sizes, it picks the bigger one.
            </li>
            <li>
              <b>The gold bar at the top and the three "What's new" tiles</b>{" "}
              (new arrivals, offer code, coming soon) are edited from the admin
              panel, without a developer.
            </li>
            <li>
              <b>Size chart is a pop-up</b>, not a home page section. It opens
              from the menu, from the line under the age, from every product's
              size link and from the footer. It has English and اردو, opens on
              her size, and the numbers come from one table the team can edit
              in admin. Show the same pop-up on every product page next to the
              size buttons.
            </li>
          </ul>
        </details>
      </div>
    </section>
  );
};

export default NotesSection;
