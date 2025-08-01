import { RefObject } from "react";

import { AboutHeader, GeneralLink } from "../../styled_components";

import { intro } from "../../../services/navigation";

function IntroNav(props: {
  howToRef: RefObject<HTMLHeadingElement>;
  aboutRef: RefObject<HTMLHeadingElement>;
}) {
  const { howToRef, aboutRef } = props;

  return (
    <>
      <AboutHeader>Information about the Tour</AboutHeader>
      {/* <ul>
        <li>
          <GeneralLink
            href="#about"
            onClick={() => {
              intro.clickLink(aboutRef);
            }}
          >
            About the Site
          </GeneralLink>
        </li>
        <li>
          <GeneralLink
            href="#how-to-take-the-tour"
            onClick={() => {
              intro.clickLink(howToRef);
            }}
          >
            How to Take the Tour
          </GeneralLink>
        </li>
      </ul> */}
    </>
  );
}

export default IntroNav;
