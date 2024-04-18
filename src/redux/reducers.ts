import gamesReducer from "./slices/gamesSlice";
import settingsReducer from "./slices/settingsSlice";
import userReducer from "./slices/userSlice";

export default {
  settings: settingsReducer,
  games: gamesReducer,
  user: userReducer,
};
