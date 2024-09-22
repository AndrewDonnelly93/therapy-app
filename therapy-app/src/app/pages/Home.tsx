import React, { useState } from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
// Components
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import type { Navigation, Router } from "@toolpad/core";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { createTheme } from "@mui/material/styles";
import psychologyIcon from "../assets/psychology.svg";
import { Typography } from "@mui/material";

const navigationMenu: Navigation = [
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

interface IDashboardContent {
  pathname: string;
}

const DashboardContent: React.FC<IDashboardContent> = ({ pathname }) => {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography>Dashboard content for {pathname}</Typography>
    </Box>
  );
};

const Home: React.FC = () => {
  const [pathname, setPathname] = useState("/dashboard");

  const router = React.useMemo<Router>(() => {
    return {
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return (
    <Box>
      <Grid2 container>
        <AppProvider
          navigation={navigationMenu}
          theme={appTheme}
          router={router}
          branding={{
            logo: <img src={psychologyIcon} alt="Trish Bourke's app" />,
            title: "Trish Bourke's app",
          }}
        >
          <DashboardLayout>
            <DashboardContent pathname={pathname} />
          </DashboardLayout>
        </AppProvider>
      </Grid2>
    </Box>
  );
};

export default Home;
