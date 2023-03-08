import React from "react";
import splash from "../../assets/27Rnd.gif";
import { Splash, SplashImage } from "./splashscreen.styles";

export const SplashScreen = () => {
  return (
    <>
      <Splash>
        <SplashImage src={splash} />
      </Splash>
    </>
  );
};
