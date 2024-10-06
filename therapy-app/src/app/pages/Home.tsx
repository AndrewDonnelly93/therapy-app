import React, { useState } from "react";
import { AppProvider } from "@toolpad/core/AppProvider";
// Components
import Box from "@mui/material/Box";
import Grid2 from "@mui/material/Grid2";
import DashboardIcon from "@mui/icons-material/Dashboard";
import RssFeedIcon from "@mui/icons-material/RssFeed";
import type { Navigation, Router } from "@toolpad/core";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { createTheme } from "@mui/material/styles";
import psychologyIcon from "../assets/psychology.svg";
import BlogEntriesList from "app/components/ui/blog-entry/BlogEntriesList";

const navigationMenu: Navigation = [
  {
    segment: "main",
    title: "About me",
    icon: <DashboardIcon />,
  },
  {
    segment: "blog",
    title: "My blog",
    icon: <RssFeedIcon />,
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
      <BlogEntriesList pathname={pathname} />
    </Box>
  );
};

const Home: React.FC = () => {
  const [pathname, setPathname] = useState("/main");

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
            logo: <img src={psychologyIcon} alt="Trish Bourke therapy" />,
            title: "Trish Bourke therapy",
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
