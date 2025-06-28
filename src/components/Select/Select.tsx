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
  TourSelectButton,
} from "../styled_components";
import SelectCard from "./SelectCard";
import { featureFiltersAtom, allMarkersQueryAtom } from "../../atoms";
import { back } from "../../services/navigation";

function Select() {
  const { markers } = useAtomValue(allMarkersQueryAtom);

  const [, setLocation] = useLocation();
  const filtersAtomValue = useAtomValue(featureFiltersAtom);
  const [filters, setFilters] = useState({ ...filtersAtomValue });

  const handleChange =
    (feature: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({ ...filters, [feature]: e.target.checked });
      console.log(filters);
    };

  const featuresList = {
    picnic: "Picnic sites",
    beach: "Beaches",
  };

  const routes = [
    {
      id: "route1",
      name: "Route 1",
      stops: [
        { id: "stop1", name: "Stop 1" },
        { id: "picnicSite", name: "Picnic Site" },
        { id: "stop3", name: "Stop 3" },
        { id: "beach", name: "Beach" },
        { id: "stop5", name: "Stop 5" },
      ],
      features: ["picnic", "beach", "attraction"],
    },
    {
      id: "route2",
      name: "Route 2",
      stops: [
        { id: "stop1", name: "Stop 1" },
        { id: "restaurant", name: "Restaurant" },
        { id: "stop3", name: "Stop 3" },
        { id: "beach", name: "Beach" },
        { id: "stop6", name: "Stop 6" },
      ],
      features: ["restaurants", "beach", "attraction"],
    },
    {
      id: "route3",
      name: "Route 3",
      stops: [
        { id: "stop1", name: "Stop 1" },
        { id: "picnic", name: "Picnic Site" },
        { id: "stop3", name: "Stop 3" },
        { id: "stop4", name: "Stop 4" },
        { id: "restaurant", name: "Restaurant" },
      ],
      features: ["restaurants", "picnic", "attraction"],
    }
    // Add more routes as needed
  ];

  // Filter routes based on selected features in filters
  const filteredRoutes = routes.filter((route) =>
    Object.entries(filters)
      .filter(([_, checked]) => checked)
      .every(([feature]) => route.features.includes(feature))
  );

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
                checked={filters[key] ?? filtersAtomValue[key] ?? false}
                onChange={handleChange(key)}
              />
              {value}
            </SelectCheckboxLabel>
          ))}
        </div>
        <SelectionsContainer>
          {filteredRoutes.map((route) => (
            <div
              key={route.id}
              style={{
                border: "2px solid #24422A",
                padding: "1rem",
                borderRadius: "5px",
                backgroundColor: "#CE8751",
                margin: "0.5rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-start",
              }}
            >
              <h3>{route.name}</h3>
              <ul style={{ paddingLeft: "15px" }}>
                {route.stops.map((stop) => (
                  <li key={stop.id}>{stop.name}</li>
                ))}
              </ul>
              <p>
                {route.features.includes("picnic") ? "Picnic site | " : ""}
                {route.features.includes("beach") ? "Beach | " : ""}
                {route.features.includes("restaurants") ? "Restaurants | " : ""}
                {route.features.includes("attraction") ? "Attractions" : ""}
              </p>
              <TourSelectButton
                title="Start Tour"
                aria-label="Start Tour"
                tabIndex={0}
                // onClick={() => {
                //   loadTour(sequence, setTourPreference, setLocation);
                // }}
              >
                Start Tour
              </TourSelectButton>
            </div>
          ))}
          {filteredRoutes.length === 0 && (
            <div
              style={{ padding: "1rem", color: "#24422A", fontWeight: "bold" }}
            >
              No routes match the selected filters.
            </div>
          )}

          {/* <div
            style={{
              border: "2px solid #24422A",
              padding: "1rem",
              borderRadius: "5px",
              backgroundColor: "#CE8751",
            }}
          >
            <h3>Route 1</h3>
            <ul style={{ paddingLeft: "15px" }}>
              <li>Stop 1</li>
              <li>Picnic site</li>
              <li>Stop 3</li>
              <li>Beach</li>
              <li>Stop 5</li>
            </ul>
            <p>Picnic site | Beach</p>
          </div> */}
        </SelectionsContainer>
      </MainContainer>
      <Footer />
    </>
  );
}

export default Select;
