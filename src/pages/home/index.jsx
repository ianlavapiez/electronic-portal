import React from "react";
import FirstSection from "./components/FirstSection";
import SecondSection from "./components/SecondSection";
import ThirdSection from "./components/ThirdSection";
import { HomeContainer } from "./Home.styles";

const HomePage = () => {
  return (
    <HomeContainer>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
    </HomeContainer>
  );
};

export default HomePage;
