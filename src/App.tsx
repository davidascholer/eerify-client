import "./App.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import lightTheme, { darkTheme } from "./theme";
import AppRouter from "./router/AppRouter";
import { useAppSelector } from "./redux/hooks";

const Content = () => {
  const colorTheme = useAppSelector((state) => state.settings.colorTheme);
  return (
    <ThemeProvider theme={colorTheme==="light"?lightTheme:darkTheme}>
    <CssBaseline />
    <RouterProvider router={AppRouter} />
  </ThemeProvider>
  )
}

const App = () => {

  return (
    <div>
      <Provider store={store}>
        <Content/>
      </Provider>
    </div>
  );
}

export default App;
