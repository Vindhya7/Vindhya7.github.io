import React from "react";

import "../css/particleBackground.css";
import Particles from "react-particles-js";
import particleConfig from "../config/particle-config";

const ParticleBackground = ({ children, subComponents }) => {
  return (
    <>
      <Particles className="particle" params={particleConfig} />
      {children || subComponents ? (
        <div
          className="mob-main-container"
          style={{
            alignItems: "center",
            flexDirection: "column",
            paddingBottom: "10%",
          }}
        >
          {children}
          {subComponents}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default ParticleBackground;
