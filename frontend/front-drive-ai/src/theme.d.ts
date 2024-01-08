import { PaletteColor, ThemeOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  // To create new object inside theme
  interface Theme {
    status: {
      wrong: string;
      correct: string;
    };
  }

  // To create new object inside theme
  interface ThemeOptions {
    status: {
      wrong: React.CSSProperties["color"];
      correct: React.CSSProperties["color"];
    };
  }

  // To create new object inside palette
  interface Palette {
    accent: PaletteColor;
    tertiary: PaletteColor;
  }

  // To create new object inside palette
  interface PaletteOptions {
    accent?: PaletteColorOptions;
    tertiary?: PaletteColorOptions;
  }

  // To create new option inside a color in palette
  interface SimplePaletteColorOptions {
    darker?: string;
  }

  // To create new option inside a color in palette
  interface PaletteColor {
    darker?: string;
  }
}
