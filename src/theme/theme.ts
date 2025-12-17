/*
  Deprecated MUI theme: replaced by Tailwind utilities and shadcn tokens.
  Keeping colorPalette for legacy references; removing MUI dependencies.
*/

type ColorPaletteType = {
  blue: string;
  blueOpaque: (
    opacity:
      | "0"
      | "1"
      | "2"
      | "3"
      | "4"
      | "5"
      | "6"
      | "7"
      | "8"
      | "9"
      | "a"
      | "b"
      | "c"
      | "d"
      | "e"
      | "f"
  ) => string;
  dark: string;
  deepBlue: string;
  darkBlue: string;
  white: string;
};

export const colorPalette: ColorPaletteType = {
  blue: "#007ed2",
  blueOpaque: (opacity) => "#007ed2" + opacity + opacity,
  dark: "#00060a",
  deepBlue: "#015893",
  darkBlue: "#00497a",
  white: "#fff",
};

export const lightTheme = {
  colors: {
    colorPalette,
    iconColor: colorPalette.white,
    backgroundColor: colorPalette.blue,
  },
} as const;

export const darkTheme = {
  colors: {
    colorPalette,
    iconColor: colorPalette.blue,
    backgroundColor: colorPalette.dark,
  },
} as const;
