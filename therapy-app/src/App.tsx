import React, { useState, useEffect } from "react";
// Components
import Home from "./app/pages/Home";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";

const StyledContainer = styled(Container)({
  width: "100%",
});

const App = () => {
  return (
    <StyledContainer fixed>
      <Home />
    </StyledContainer>
  );
};

export default App;
