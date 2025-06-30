import { useLocation } from "wouter";
import React, { useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";
import Header from "../General/Header";
import Footer from "../General/Footer";

import {
  PageHeader,
  ListMainContainer,
  BackButton,
  SelectionsContainer,
  SelectCheckbox,
  SelectCheckboxLabel,
  TourSelectButton,
  ListParagraph,
  StaticheaderBackgroundButton,
  SelectRouteCardContainer,
  RouteImage,
  RouteList,
  RouteListItem,
  RouteListLink,
  RouteLine,
  RouteBullet,
  RouteFeatures,
} from "../styled_components";
import {
  featureFiltersAtom,
  allMarkersQueryAtom,
  routesQueryAtom,
  tourPreferenceAtom,
} from "../../atoms";
import { back, loadTour } from "../../services/navigation";

function Select() {
  const [, setLocation] = useLocation();
  const filtersAtomValue = useAtomValue(featureFiltersAtom);
  const [filters, setFilters] = useState({ ...filtersAtomValue });
  const setTourPreference = useSetAtom(tourPreferenceAtom);
  const routesAtomValue = useAtomValue(routesQueryAtom);
  const { routes } = routesAtomValue;
  const { markers } = useAtomValue(allMarkersQueryAtom);

  const handleChange =
    (feature: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFilters({ ...filters, [feature]: e.target.checked });
    };

  const featuresList = {
    picnic: "Picnic site",
    beach: "Beach",
  };

  const routesWithImages = routes.map((route) => {
    const firstStop =
      route.stops && route.stops.length > 0 ? route.stops[0] : null;
    const marker =
      firstStop && markers && markers[firstStop.id]
        ? markers[firstStop.id]
        : null;
    return {
      ...route,
      firstStopImage: marker && marker.image ? marker.image : null,
      firstStopImageAlt: marker && marker.imageAlt ? marker.imageAlt : null,
    };
  });

  const filteredRoutes = routesWithImages.filter((route) =>
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
      <ListMainContainer>
        <PageHeader>Select your route</PageHeader>
        <ListParagraph>
          Welcome to the route selection page. We have curated a variety of
          routes offering the best of Point Pelee and Leamington. You can filter
          for routes featuring picnic sites and/or beaches using the checkboxes
          below. Click on any of the stops to view more information, and when
          you are ready to begin the tour, click the{" "}
          <StaticheaderBackgroundButton>
            Start Tour
          </StaticheaderBackgroundButton>
          button and it will instruct you as to where to start.
        </ListParagraph>
        <SelectionsContainer>
          <div
            style={{
              width: "95%",
              marginBottom: "0.25rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <p
              style={{
                fontWeight: "600",
              }}
            >
              Must include:
            </p>
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
          {filteredRoutes.map((route) => (
            <SelectRouteCardContainer key={route.id}>
              <RouteImage
                src={route.firstStopImage ? route.firstStopImage : ""}
                alt={route.firstStopImageAlt ? route.firstStopImageAlt : ""}
              />
              <h3 style={{ fontSize: "1.2rem" }}>{route.name}</h3>
              <RouteList>
                <RouteLine />
                {route.stops.map((stop) => (
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
                  marginTop: "auto",
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
                  onClick={() => {
                    loadTour(route.id, setTourPreference, setLocation);
                  }}
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
        </SelectionsContainer>
      </ListMainContainer>
      <Footer />
    </>
  );
}

export default Select;
