import { useLocation } from "wouter";
import { useRef } from "react";

import Header from "../General/Header";
import Footer from "../General/Footer";
import TourInstructionsIntro from "./components/TourInstructionsIntro";
import IntroNav from "./components/IntroNav";
import About from "./components/About";

import { MainContainer, BackButton } from "../styled_components";

import { intro } from "../../services/navigation";

function Introduction() {
  const [, setLocation] = useLocation();
  const howToRef = useRef<HTMLHeadingElement>(null);
  const aboutRef = useRef<HTMLHeadingElement>(null);

  return (
    <>
      <Header size="short">
        <BackButton
          title="Back"
          aria-label="Back"
          onClick={() => {
            intro.backCheck(setLocation);
          }}
        >
          Back
        </BackButton>
      </Header>
      <MainContainer>
        <article>
          <IntroNav
            howToRef={howToRef}
            aboutRef={aboutRef}
          />
          <TourInstructionsIntro howToRef={howToRef} />
          <About aboutRef={aboutRef} />
        </article>
      </MainContainer>
      <Footer />
    </>
  );
}

export default Introduction;
