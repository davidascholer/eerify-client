import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../lib/redux-toolkit/store";
import { SettingsState } from "../types";

// Define the initial state using that type
const initialState = {
  orientation: "horizontal",
  colorTheme: "dark",
} as SettingsState;

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setColorTheme: (
      state,
      action: PayloadAction<SettingsState["colorTheme"]>
    ) => {
      state.colorTheme = action.payload;
    },
    setOrientation: (
      state,
      action: PayloadAction<SettingsState["orientation"]>
    ) => {
      state.orientation = action.payload;
    },
  },
});

export const { setColorTheme, setOrientation } = settingsSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectColorTheme = (state: RootState) => state.settings.colorTheme;
export const selectOrientation = (state: RootState) =>
  state.settings.orientation;

export default settingsSlice.reducer;
