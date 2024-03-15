import { CssBaseline, ThemeProvider } from "@mui/material";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import lightTheme, { darkTheme } from "./theme";
import AppRouter from "./router/AppRouter";
import { useAppSelector } from "./redux/hooks";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const Content = () => {
  const colorTheme = useAppSelector((state) => state.settings.colorTheme);
  return (
    <ThemeProvider theme={colorTheme === "light" ? lightTheme : darkTheme}>
      <CssBaseline />
      <RouterProvider router={AppRouter} />
    </ThemeProvider>
  );
};

const queryClient = new QueryClient();

const App = () => {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <Content />
        </Provider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </div>
  );
};

export default App;
