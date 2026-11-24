import React from "react";
import OpeningScreen from "../components/OpeningScreen";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import WhatsNewSection from "../components/WhatsNewSection";
import StyleHerStudio from "../components/StyleHerStudio";
import BrandFeatures from "../components/BrandFeatures";
import StorySection from "../components/StorySection";
import JoinSection from "../components/JoinSection";
// import NotesSection from "../components/NotesSection";
import Footer from "../components/Footer";

export const HomePage = () => {
  return (
    <>
      <OpeningScreen />
      <Header />
      <main id="top">
        <HeroSection />
        <WhatsNewSection />
        <StyleHerStudio />
        <BrandFeatures />
        <StorySection />
        <JoinSection />
        {/* <NotesSection /> */}
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
