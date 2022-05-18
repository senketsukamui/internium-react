import { createTheme } from "@mui/material/styles";
import shadows, { Shadows } from "@mui/material/styles/shadows";

export const theme = createTheme({
  shadows: shadows.map(() => "none") as Shadows,
  typography: {
    fontFamily: ['"Open Sans"', '"Roboto"'].join(','),
  }
});

export type Theme = typeof theme;
