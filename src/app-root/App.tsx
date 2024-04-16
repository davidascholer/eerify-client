import { CssBaseline, ThemeProvider } from "@mui/material";
import { store } from "../lib/redux/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { darkTheme } from "../theme/theme";
import AppRouter from "./AppRouter";
// import { useAppSelector } from "../lib/redux/hooks";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryContainer from "../lib/react-query/ReactQueryProvider";

const Content = () => {
  // const colorTheme = useAppSelector((state) => state.settings.colorTheme);
  return (
    <ThemeProvider theme={darkTheme}>
      {/* <ThemeProvider theme={colorTheme === "light" ? lightTheme : darkTheme}> */}
      <CssBaseline />
      <RouterProvider router={AppRouter} />
    </ThemeProvider>
  );
};

const App = () => {
  return (
    <div>
      <ReactQueryContainer>
        <Provider store={store}>
          <Content />
        </Provider>
        <ReactQueryDevtools />
      </ReactQueryContainer>
    </div>
  );
};

export default App;
