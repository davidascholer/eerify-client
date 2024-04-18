import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../lib/redux-toolkit/store";
import { UserState } from "../types";

// Define the initial state using that type
const initialState = {
  email: null,
} as UserState;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userSetEmail: (state, action: PayloadAction<UserState["email"]>) => {
      state.email = action.payload;
    },
    clearUser: (state) => {
      state.email = null;
    },
  },
});

export const { userSetEmail, clearUser } = userSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectColorTheme = (state: RootState) => state.user.email;

export default userSlice.reducer;
