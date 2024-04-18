//Sets the orientation to vertical if the portrait view is a ratio of 3/2 or larger.
export type OrientationType = "horizontal" | "vertical";
export type ColorThemeType = "light" | "dark";
export type appBarExtendedType = boolean;

export type SettingsState = {
  /*To be saved to/fetched from the server*/
  orientation: OrientationType;
  colorTheme: ColorThemeType;
  /*Local only. These are safe to be reset when user logs out.*/
  appBarExtended: appBarExtendedType; // Extends the app bar to full the full options menu.
};

export type GamesState = {
  gameQuery: {
    genreId?: number;
    platformId?: number;
    sortOrder?: string;
    searchText?: string;
  };
  searchText?: string;
  genreId?: number;
  platformId?: number;
  sortOrder?: string;
};

export type UserState = {
  email: string | null;
};
