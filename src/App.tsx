import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import lightTheme from "./theme";
import AppRouter from "./router/AppRouter";

function App() {
  return (
    <div>
      <Provider store={store}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <RouterProvider router={AppRouter} />
        </ThemeProvider>
      </Provider>
    </div>
  );
}

export default App;
