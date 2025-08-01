import {
  Address,
  HeaderDetails,
  HeaderDetailsH2,
  BackButton,
  DetailsPageButtonsContainer,
  DetailsPageBackButtonContainer,
} from "../../../styled_components";

import CompleteCheckBox from "./components/CompleteCheckbox";

import { back } from "../../../../services/navigation";
import { useAtomValue } from "jotai";
import { useLocation } from "wouter";
import {
  detailsQueryAtom,
  getAllMarkerProgressAtom,
  allMarkersQueryAtom,
} from "../../../../atoms";

function DetailsSubHeader() {
  const [, setLocation] = useLocation();
  const markerProgressStates = useAtomValue(getAllMarkerProgressAtom);

  const detail = useAtomValue(detailsQueryAtom);
  const { markers } = useAtomValue(allMarkersQueryAtom);

  const marker = markers[detail.id];

  return (
    <>
      <DetailsPageButtonsContainer>
        <DetailsPageBackButtonContainer>
          <BackButton
            title="Back"
            aria-label="Back"
            onClick={() => back(setLocation)}
          >
            Back
          </BackButton>
        </DetailsPageBackButtonContainer>
        <CompleteCheckBox
          id={marker.id}
          markerProgress={markerProgressStates[marker.id] ?? false}
        />
      </DetailsPageButtonsContainer>
      <HeaderDetails>
        <HeaderDetailsH2>{marker.name}</HeaderDetailsH2>
        {marker.address ? <Address>{marker.address}</Address> : <></>}
      </HeaderDetails>
    </>
  );
}

export default DetailsSubHeader;
