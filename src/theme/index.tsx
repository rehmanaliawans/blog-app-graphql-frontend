import React from "react";
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider
} from "@mui/material/styles";
import palette from "./palette";

export default function ThemeProvider({
  children
}: {
  children: React.ReactNode;
}) {
  const themeOptions = createTheme({
    palette,
    shape: { borderRadius: 8 }
  });

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={themeOptions}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
