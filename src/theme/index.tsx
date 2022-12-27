import React from "react";
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider as MUIThemeProvider,
  createTheme,
  StyledEngineProvider,
  responsiveFontSizes
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
  const theme = responsiveFontSizes(themeOptions);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}
