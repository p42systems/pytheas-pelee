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
          divided into{" "}
          <a href="#picnics" style={{ color: "#000", fontWeight: "600" }}>
            Picnic Sites
          </a>
          ,{" "}
          <a href="#beaches" style={{ color: "#000", fontWeight: "600" }}>
            Beaches
          </a>
          , and{" "}
          <a href="#attractions" style={{ color: "#000", fontWeight: "600" }}>
            Attractions
          </a>
          {/* , and{" "}
          <a href="#restaurants" style={{ color: "#000", fontWeight: "600" }}>
            Restaurants
          </a> */}
          . To view the content of any stop, click the{" "}
          <StaticheaderBackgroundButton>View Stop</StaticheaderBackgroundButton>{" "}
          button. If you are near the site and would like to begin your Point
          Pelee adventure, click{" "}
          <StaticheaderBackgroundButton style={{ backgroundColor: "#2b2d42" }}>
            Select Route
          </StaticheaderBackgroundButton>{" "}
          to find your route and begin.
        </ListParagraph>
        <MarkerList />
      </ListMainContainer>
      <Footer />
    </>
  );
}

export default Content;
