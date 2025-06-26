import { useLocation } from "wouter";
import { useAtom } from "jotai";
import Header from "../General/Header";
import Footer from "../General/Footer";

import {
  MainContainer,
  BackButton,
  SelectionsContainer,
  SelectCheckbox,
  SelectCheckboxLabel,
} from "../styled_components";
// import SelectCard from "./SelectCard";
// import { allMarkersQueryAtom } from "../../atoms";
import { featureFiltersAtom } from "../../atoms";
import { back } from "../../services/navigation";

function Select() {
  const [, setLocation] = useLocation();
  const [filters, setFilters] = useAtom(featureFiltersAtom);

  const handleChange =
    (feature: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({ ...filters, [feature]: e.target.checked });
      console.log({ ...filters, [feature]: e.target.checked });
    };

  const featuresList = {
    attraction: "Attractions",
    picnic: "Picnic sites",
    beach: "Beaches",
    restaurants: "Restaurants",
  };

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
      <MainContainer>
        <h2>Select your route</h2>
        <p>
          Filter different routes by the features you would like to be included:
        </p>
        <div style={{ minWidth: "90%", marginBottom: "1rem" }}>
          {Object.entries(featuresList).map(([key, value]) => (
            <>
              <SelectCheckboxLabel key={key}>
                <SelectCheckbox
                  type="checkbox"
                  name={key}
                  checked={filters[key] || false}
                  onChange={handleChange(key)}
                />
                {value}
              </SelectCheckboxLabel>
              <br />
            </>
          ))}
        </div>
        <SelectionsContainer></SelectionsContainer>
      </MainContainer>
      <Footer />
    </>
  );
}

export default Select;
