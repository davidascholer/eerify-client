export type SettingsState = {
  /*To be saved to/fetched from the server*/
  orientation: "horizontal" | "vertical"; //Sets the orientation to vertical if the portrait view is a ratio of 3/2 or larger.
  colorTheme: "light" | "dark";
  /*Local only. These are safe to be reset when user logs out.*/
  appBarExtended: boolean; // Extends the app bar to full the full options menu.
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
