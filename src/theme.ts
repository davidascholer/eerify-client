/*
    MUI v5 Default theme: https://mui.com/material-ui/customization/default-theme/
*/

import { createTheme, responsiveFontSizes} from '@mui/material/styles';
// import { grey } from '@mui/material/colors';

export const colorPalette = {
    white: "#F4F4F4",
    black: "#1E1E1E",
    grey: "#123456"
}

// Light mode && default
const lightTheme = responsiveFontSizes(createTheme({
    palette: {
        mode: "light",
        primary: {
            main: colorPalette.black,
            contrastText: colorPalette.white
        }, 
    secondary: {
            main: colorPalette.grey,
            contrastText: colorPalette.grey
        }

    },
    typography: {
        fontFamily: "Roboto",
    },
})); 

// Override the theme for dark mode colors
export const darkTheme = responsiveFontSizes(createTheme({
    ...lightTheme,
    palette: {
        mode: "dark",
        primary: {
            main: colorPalette.white,
            contrastText: colorPalette.black
        },
    }
    
}));

export default lightTheme;
