import Header from "../General/Header";
import Footer from "../General/Footer";
import NavigationButtons from "./components/Navigation/NavigationButtons";
import SponsorPartner from "./components/SponsorPartner";
import TourInstructionsHome from "./components/TourInstructionsHome";

import { MainContainer } from "../styled_components";

function Home() {
  return (
    <>
      <Header />
      <MainContainer>
        <NavigationButtons />
        <article>
          <section>
            <TourInstructionsHome />
          </section>
          <section>
            <SponsorPartner />
          </section>
        </article>
      </MainContainer>
      <Footer />
    </>
  );
}

export default Home;
