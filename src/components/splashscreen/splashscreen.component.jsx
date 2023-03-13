import React from "react";
import { SpinnerContainer, SpinnerOverlay } from "./splashscreen.styles";

export const SplashScreen = () => {
  return (
    <>
      <SpinnerOverlay>
        <SpinnerContainer></SpinnerContainer>
      </SpinnerOverlay>
    </>
  );
};
