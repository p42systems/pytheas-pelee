import { useAtomValue } from "jotai";
import { useCallback } from "react";
import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";

import { CardsContainer, ContentSubHeader } from "../../styled_components";
import MarkerCard from "./MarkerCard";
import { lastViewedMarkerIdAtom, allMarkersQueryAtom } from "../../../atoms";

function MarkerList() {
  const lastViewedMarker = useAtomValue(lastViewedMarkerIdAtom);
  const [scrollableRef, scrollableBounds] = useMeasure({
    scroll: false,
    polyfill: ResizeObserver,
  });

  const shouldScroll = useCallback(
    (top: number, bottom: number) => {
      // Note: scrollableBounds propperties will be all be zero when the component is first mounted.
      return top < scrollableBounds.top || bottom > scrollableBounds.bottom;
    },
    [scrollableBounds]
  );

  const { markers, order } = useAtomValue(allMarkersQueryAtom);

  const filterMarkersByType = (type: string) =>
    Object.entries(markers)
      .filter(([_, marker]) => marker.type === type)
      .reduce((acc, [key, marker]) => {
        acc[key] = marker;
        return acc;
      }, {} as Record<string, typeof markers[keyof typeof markers]>);

  const attractions = filterMarkersByType("attraction");
  const picnicSites = filterMarkersByType("picnic");
  const beaches = filterMarkersByType("beach");
  const restaurants = filterMarkersByType("restaurant");

  return (
    <>
      <ContentSubHeader>Picnic Sites</ContentSubHeader>
      <CardsContainer
        ref={scrollableRef}
        aria-label="List of markers with picnic sites"
      >
        {Object.values(picnicSites).map((marker) => (
          <MarkerCard
            key={marker.id}
            marker={marker}
            selected={marker.id === lastViewedMarker}
            shouldScroll={shouldScroll}
          />
        ))}
      </CardsContainer>
      
      <ContentSubHeader>Beaches</ContentSubHeader>
      <CardsContainer
        ref={scrollableRef}
        aria-label="List of markers with beaches"
      >
        {Object.values(beaches).map((marker) => (
          <MarkerCard
            key={marker.id}
            marker={marker}
            selected={marker.id === lastViewedMarker}
            shouldScroll={shouldScroll}
          />
        ))}
      </CardsContainer>

      <ContentSubHeader>Attractions</ContentSubHeader>
      <CardsContainer
        ref={scrollableRef}
        aria-label="List of markers with attractions"
      >
        {Object.values(attractions).map((marker) => (
          <MarkerCard
            key={marker.id}
            marker={marker}
            selected={marker.id === lastViewedMarker}
            shouldScroll={shouldScroll}
          />
        ))}
      </CardsContainer>

      <ContentSubHeader>Restaurants</ContentSubHeader>
      <CardsContainer
        ref={scrollableRef}
        aria-label="List of markers with restaurants"
      >
        {Object.values(restaurants).map((marker) => (
          <MarkerCard
            key={marker.id}
            marker={marker}
            selected={marker.id === lastViewedMarker}
            shouldScroll={shouldScroll}
          />
        ))}
      </CardsContainer>
    </>
  );
}

export default MarkerList;
