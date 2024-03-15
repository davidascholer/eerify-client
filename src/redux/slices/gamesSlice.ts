import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { GamesState } from "../types";

const initialState = {
  searchText: undefined,
  genreId: undefined,
  platformId: undefined,
  sortOrder: undefined,
} as GamesState;

export const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<GamesState["searchText"]>) => {
      state.searchText = action.payload;
    },
    setGenreId: (state, action: PayloadAction<GamesState["genreId"]>) => {
      state.genreId = action.payload;
    },
    setPlatformId: (state, action: PayloadAction<GamesState["platformId"]>) => {
      state.platformId = action.payload;
    },
    setSortOrder: (state, action: PayloadAction<GamesState["sortOrder"]>) => {
      state.sortOrder = action.payload;
    },
  },
});

export const { setSearchText, setGenreId, setPlatformId, setSortOrder } =
  gamesSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectGamesSearchText = (state: RootState) =>
  state.games.searchText;
export const selectGamesGengreId = (state: RootState) => state.games.searchText;
export const selectGamesPlatformId = (state: RootState) =>
  state.games.searchText;
export const selectGamesOrder = (state: RootState) => state.games.searchText;

export default gamesSlice.reducer;
