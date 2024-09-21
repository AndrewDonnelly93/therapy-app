import React from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
// Components
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import type { Navigation, Router } from "@toolpad/core";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { createTheme } from "@mui/material/styles";

const NavigationMenu: Navigation = [
  {
    segment: "dashboard",
    title: "Home",
    icon: <DashboardIcon />,
  },
  {
    segment: "appointments",
    title: "Book an appointment",
    icon: <ShoppingCartIcon />,
  },
];

const appTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: true },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

const Home: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid2 container>
        <AppProvider navigation={NavigationMenu} theme={appTheme}>
          <DashboardLayout>Dashboard</DashboardLayout>
        </AppProvider>
      </Grid2>
    </Box>
  );
};

export default Home;
