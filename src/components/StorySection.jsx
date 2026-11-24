import React from "react";

export const StorySection = () => {
  return (
    <section className="band story" id="story">
      <div className="wrap">
        <svg
          className="logo-big"
          viewBox="0 0 1000 1140"
          role="img"
          aria-label="Libaasan Yuwaari logo: a mother and daughter under an arch"
        >
          <use href="#lyLogo" width="1000" height="1140" />
        </svg>
        <div>
          <h2>Our name means “clothing that covers”</h2>
          <p>
            The words Libaasan Yuwaari are taken from the Qur'an (Surah Al-A'raf,
            7:26). They speak of clothing as a blessing from Allah that covers.
            We make clothes in that spirit, for the girls you love most.
          </p>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
