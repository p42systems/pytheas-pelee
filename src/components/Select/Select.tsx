import { useLocation } from "wouter";
import React, { useState } from "react";
import { useAtomValue } from "jotai";
import Header from "../General/Header";
import Footer from "../General/Footer";

import {
  MainContainer,
  BackButton,
  SelectionsContainer,
  SelectCheckbox,
  SelectCheckboxLabel,
} from "../styled_components";
import SelectCard from "./SelectCard";
import { featureFiltersAtom, allMarkersQueryAtom } from "../../atoms";
import { back } from "../../services/navigation";

function Select() {
  const { markers } = useAtomValue(allMarkersQueryAtom);

  const [, setLocation] = useLocation();
  const [filters, setFilters] = useState({ ...featureFiltersAtom });

  const handleChange =
    (feature: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({ ...filters, [feature]: e.target.checked });
      console.log(filters);
    };

  const featuresList = {
    attraction: "Attractions",
    picnic: "Picnic sites",
    beach: "Beaches",
    restaurants: "Restaurants",
  };

  // const filterMarkersByType = (type: string) =>
  //   Object.entries(markers)
  //     .filter(([_, marker]) => marker.type === type)
  //     .reduce((acc, [key, marker]) => {
  //       acc[key] = marker;
  //       return acc;
  //     }, {} as Record<string, typeof markers[keyof typeof markers]>);

  // const attractions = filterMarkersByType("attraction");
  // const picnicSites = filterMarkersByType("picnic");
  // const beaches = filterMarkersByType("beach");
  // const restaurants = filterMarkersByType("restaurant");

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
        <div
          style={{
            minWidth: "90%",
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {Object.entries(featuresList).map(([key, value]) => (
            <SelectCheckboxLabel key={key}>
              <SelectCheckbox
                type="checkbox"
                name={key}
                key={key}
                checked={filters[key] || false}
                onChange={handleChange(key)}
              />
              {value}
            </SelectCheckboxLabel>
          ))}
        </div>
        <SelectionsContainer></SelectionsContainer>
      </MainContainer>
      <Footer />
    </>
  );
}

export default Select;
