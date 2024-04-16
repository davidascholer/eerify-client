/*
    MUI v5 Default theme: https://mui.com/material-ui/customization/default-theme/
*/

import { createTheme, responsiveFontSizes } from "@mui/material/styles";
// import { grey } from '@mui/material/colors';

export const colorPalette = {
  blue: "#007ed2",
  dark: "#00060a",
  deepBlue: "#015893",
  darkBlue: "#00497a",
  white: "#fff",
};

// default
const defaultTheme = responsiveFontSizes(
  createTheme({
    typography: {
      fontFamily: "Roboto",
      allVariants: {
        // color: colorPalette.blue,
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
        contrastText: colorPalette.dark,
      },
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
        contrastText: colorPalette.dark,
      },
    },
  })
);
