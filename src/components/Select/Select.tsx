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
  SelectRouteCardContainer,
  RouteList,
  RouteListItem,
  RouteListLink,
  RouteLine,
  RouteBullet,
  RouteFeatures,
} from "../styled_components";
// import SelectCard from "./SelectCard";
import {
  featureFiltersAtom,
  allMarkersQueryAtom,
  routesQueryAtom,
} from "../../atoms";
import { back } from "../../services/navigation";

function Select() {
  // const { markers } = useAtomValue(allMarkersQueryAtom);

  const [, setLocation] = useLocation();
  const filtersAtomValue = useAtomValue(featureFiltersAtom);
  const [filters, setFilters] = useState({ ...filtersAtomValue });

  const routesAtomValue = useAtomValue(routesQueryAtom);
  const { routes } = routesAtomValue;

  const handleChange =
    (feature: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({ ...filters, [feature]: e.target.checked });
    };

  const featuresList = {
    picnic: "Picnic sites",
    beach: "Beaches",
  };

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
        <p>Must include:</p>
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
            <SelectRouteCardContainer key={route.id}>
              <h3 style={{ fontSize: "1.2rem" }}>{route.name}</h3>
              <RouteList>
                <RouteLine />
                {route.stops.map((stop, index) => (
                  <RouteListItem key={stop.id}>
                    <RouteBullet />
                    <RouteListLink href={`./tour/details/${stop.id}`}>
                      {stop.name}
                    </RouteListLink>
                  </RouteListItem>
                ))}
              </RouteList>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "stretch",
                }}
              >
                <RouteFeatures>
                  {route.features.includes("picnic") ? "Picnic site | " : ""}
                  {route.features.includes("beach") ? "Beach | " : ""}
                  {route.features.includes("restaurants")
                    ? "Restaurants | "
                    : ""}
                  {route.features.includes("attraction") ? "Attractions" : ""}
                </RouteFeatures>
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
            </SelectRouteCardContainer>
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
