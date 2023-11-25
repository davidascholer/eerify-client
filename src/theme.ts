import { createTheme } from "@mui/material";

export const colorPalette = {
    white: "#F4F4F4",
    orange: "#E15634",
    //Light to dark
    purple: ["#F4EFFF", "#E5D9F1", "#CDC1FD", "#A493F8", "#7270FC"],
    black: "#1E1E1E",
}

export default createTheme({

    palette: {
        mode: "light",
        primary: {
            main: colorPalette.purple[4],
            contrastText: colorPalette.white
        }
    },
    typography: {
        fontFamily: "Roboto",
    },

});