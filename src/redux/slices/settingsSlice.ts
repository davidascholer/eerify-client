import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { SettingsState } from '../types'


// Define the initial state using that type
const initialState = {
    orientation: "horizontal",
    colorMode: "light"
} as SettingsState;

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setColorMode: (state, action: PayloadAction<SettingsState["colorMode"]>) => {
      state.colorMode = action.payload
    },
    setOrientation: (state, action: PayloadAction<SettingsState["orientation"]>) => {
      state.orientation = action.payload
    },
  },
})

export const { setColorMode, setOrientation } = settingsSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectColorMode = (state: RootState) => state.settings.colorMode
export const selectOrientation = (state: RootState) => state.settings.orientation

export default settingsSlice.reducer