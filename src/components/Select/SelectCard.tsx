import useMeasure from "react-use-measure";
import { ResizeObserver } from "@juggle/resize-observer";
import { mergeRefs } from "react-merge-refs";
import { useRef } from "react";
import { useSetAtom } from "jotai";
import { useLocation } from "wouter";
import { tourPreferenceAtom } from "../../atoms";

import { loadTour } from "../../services/navigation";

import {
  SelectCardContainer,
  SelectCardContent,
  CardHeader,
  CardAddress,
  TourSelectButton,
} from "../styled_components";

import { SelectCardItemProps } from "../../types";

function SelectCard({ marker, sequence }: SelectCardItemProps) {
  const [, setLocation] = useLocation();
  const setTourPreference = useSetAtom(tourPreferenceAtom);
  const [markerMeasureRef] = useMeasure({
    scroll: true,
    polyfill: ResizeObserver,
  });
  const markerRef = useRef<HTMLLIElement>(null);

  return (
    <SelectCardContainer
      aria-label={marker.name}
      ref={mergeRefs([markerRef, markerMeasureRef])}
    >
      <SelectCardContent>
        <CardHeader>{marker.name}</CardHeader>
        {marker.address ? <CardAddress>{marker.address}</CardAddress> : <></>}
        {/* <NavigationTourButton
          title="Start Tour"
          aria-label="Start Tour"
          onClick={() => {
            loadTour(sequence, setTourPreference, setLocation);
          }}
        ></NavigationTourButton> */}
        <TourSelectButton
          title="Start Tour"
          aria-label="Start Tour"
          tabIndex={0}
          onClick={() => {
            loadTour(sequence, setTourPreference, setLocation);
          }}
        >
          Start Tour
        </TourSelectButton>
      </SelectCardContent>
    </SelectCardContainer>
  );
}

export default SelectCard;
