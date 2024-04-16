/*
    MUI v5 Default theme: https://mui.com/material-ui/customization/default-theme/
*/

import { createTheme, responsiveFontSizes } from "@mui/material/styles";
// import TiffanyGothicCC from "../assets/fonts/TiffanyGothicCC-Regular.ttf";

export const colorPalette = {
  blue: "#007ed2",
  dark: "#00060a",
  deepBlue: "#015893",
  darkBlue: "#00497a",
  white: "#fff",
};

declare module "@mui/material/styles" {
  interface Theme {
    colors: {
      iconColor: string;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colors?: {
      iconColor?: string;
    };
  }
}

// default
const defaultTheme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: "TiffanyGothicCC, Roboto",
      // allVariants: {
      //   color: colorPalette.blue,
      // },
    },
  })
);

export const lightTheme = responsiveFontSizes(
  createTheme({
    ...defaultTheme,
    palette: {
      mode: "light",
      primary: {
        main: colorPalette.blue,
        contrastText: colorPalette.white,
      },
    },
    colors: {
      iconColor: colorPalette.white,
    },
  })
);

export const darkTheme = responsiveFontSizes(
  createTheme({
    ...defaultTheme,
    palette: {
      mode: "dark",
      primary: {
        main: colorPalette.dark,
        contrastText: colorPalette.white,
      },
    },
    colors: {
      iconColor: colorPalette.blue,
    },
  })
);
