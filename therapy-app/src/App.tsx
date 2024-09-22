import React from "react";
// Components
import Home from "./app/pages/Home";
import Container from "@mui/material/Container";
import { styled } from "@mui/material/styles";
import "./index.css";
import "./App.css";

const StyledContainer = styled(Container)({
  width: "100%",
});

const App: React.FC = () => {
  return (
    <StyledContainer fixed>
      <Home />
    </StyledContainer>
  );
};

export default App;
