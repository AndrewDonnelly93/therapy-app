import React from "react";
// Components
import Box from "@mui/material/Box";
// Styles
import { styled } from "@mui/material/styles";

interface IErrorAlert {
  errorMessage: string;
}

const ErrorAlert: React.FC<IErrorAlert> = ({ errorMessage }) => {
  return (
    <Box>
      <p>{errorMessage}</p>
    </Box>
  );
};

const StyledErrorAlert = styled(ErrorAlert)`
  width: 100%;
  border: 1px solid vars.$colour--red;
  background: vars.$color--lightest-gray;
  text-align: center;
  padding: 15px;
  margin-bottom: 15px;
  color: vars.$colour--red;
  font-size: 14px;
`;

export default StyledErrorAlert;
