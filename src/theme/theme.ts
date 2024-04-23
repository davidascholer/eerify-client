/*
    MUI v5 Default theme: https://mui.com/material-ui/customization/default-theme/
*/

import { createTheme, responsiveFontSizes } from "@mui/material/styles";
// import TiffanyGothicCC from "../assets/fonts/TiffanyGothicCC-Regular.ttf";

type ColorPaletteType = {
  blue: string;
  dark: string;
  deepBlue: string;
  darkBlue: string;
  white: string;
};

export const colorPalette: ColorPaletteType = {
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
      backgroundColor: string;
      colorPalette: ColorPaletteType;
    };
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    colors?: {
      colorPalette?: ColorPaletteType;
      iconColor?: string;
      backgroundColor?: string;
    };
  }
}

// default
const defaultTheme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: "TiffanyGothicCC, Roboto",
    },
    colors: {
      colorPalette: colorPalette,
    },
    components: {
      MuiInputLabel: {
        styleOverrides: {
          root: {
            // userSelect: "text",
            "::selection, *::selection": {
              borderColor: colorPalette.blue,
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          contained: {
            backgroundColor: colorPalette.blue,
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "::selection, *::selection": {
              borderColor: colorPalette.blue,
              background: colorPalette.blue,
            },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          switchBase: {
            // Controls default (unchecked) color for the thumb
            color: colorPalette.blue,
          },
          colorPrimary: {
            "&.Mui-checked": {
              // Controls checked color for the thumb
              color: colorPalette.blue,
            },
          },
          track: {
            // Controls default (unchecked) color for the track
            opacity: 0.2,
            backgroundColor: colorPalette.blue,
            ".Mui-checked.Mui-checked + &": {
              // Controls checked color for the track
              opacity: 0.7,
              backgroundColor: colorPalette.blue,
            },
          },
        },
      },
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
      divider: colorPalette.blue,
    },
    colors: {
      ...defaultTheme.colors,
      iconColor: colorPalette.white,
      backgroundColor: colorPalette.blue,
    },
  })
);

export const darkTheme = responsiveFontSizes(
  createTheme({
    ...defaultTheme,
    palette: {
      mode: "dark",
      primary: {
        main: colorPalette.blue,
        contrastText: colorPalette.white,
      },
      divider: colorPalette.dark,
    },
    colors: {
      ...defaultTheme.colors,
      iconColor: colorPalette.blue,
      backgroundColor: colorPalette.dark,
    },
  })
);
