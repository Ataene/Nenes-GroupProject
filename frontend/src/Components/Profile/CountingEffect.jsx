import { Container } from "@mui/system";
import React from "react";
import Typewriter from "typewriter-effect";

const CountingEffect = () => {
  const typingStyle = {
    color: "green",
    fontSize: "20px",
    alignItems: "center",
    justifyContent: "center",
    display: "flex"
  };
  return (
    <>
      <Container  style={typingStyle}>
        <Typewriter
          style={typingStyle}
          options={{
            strings: [
              "Welcome to Hundie",
              "The social marketplace to trade items under a hundred.",
              "World's first product dating app",
              "A big thanks to the facilitating team @INCEPTIONU"
            ],
            autoStart: true,
            loop: true,
          }}
        />
      </Container>
    </>
  );
};

export default CountingEffect;
