export type SettingsState = {
  orientation: "horizontal" | "vertical"; //Sets the orientation to vertical if the portrait view is a ratio of 3/2 or longer.
  colorTheme: "light" | "dark";
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
