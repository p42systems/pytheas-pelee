import { useLocation } from "wouter";
import {
  NavigationSelectButton,
  NavigationButtonsContainer,
  NavigationContentButton,
} from "../../../styled_components";

function NavigationButtons() {
  const [, setLocation] = useLocation();

  return (
    <NavigationButtonsContainer>
      <NavigationContentButton
        title="Content"
        aria-label="Content"
        onClick={() => {
          setLocation("/list");
        }}
      >
        Content
      </NavigationContentButton>
      <NavigationSelectButton
        title="Select"
        aria-label="Select"
        onClick={() => {
          setLocation("/select");
        }}
      >
        Select Route
      </NavigationSelectButton>
    </NavigationButtonsContainer>
  );
}

export default NavigationButtons;
