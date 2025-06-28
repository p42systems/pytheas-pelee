import { useLocation } from "wouter";

import {
  PageHeader,
  ListParagraph,
  StaticheaderBackgroundButton,
  BackButton,
  ListMainContainer,
} from "../styled_components";
import Header from "../General/Header";
import Footer from "../General/Footer";
import MarkerList from "./components/MarkerList";
import { back } from "../../services/navigation";

function Content() {
  const [, setLocation] = useLocation();

  return (
    <>
      <Header>
        <BackButton
          title="Back"
          aria-label="Back"
          onClick={() => back(setLocation)}
        >
          Back
        </BackButton>
      </Header>
      <ListMainContainer>
        <PageHeader>Content</PageHeader>
        <ListParagraph>
          Welcome to the content page. For your convenience, the stops have been
          divided into Picnic Sites, Beaches, Attractions, and Restaurants. To
          view the content of any stop, click the{" "}
          <StaticheaderBackgroundButton>View</StaticheaderBackgroundButton>
          button. If you are near the site and would like to begin your Point
          Pelee adventure, navigate to the{" "}
          <a href="./select" style={{ color: "#000", fontWeight: "600" }}>
            Selections page
          </a>{" "}
          and find your route.
        </ListParagraph>
        <MarkerList />
      </ListMainContainer>
      <Footer />
    </>
  );
}

export default Content;
