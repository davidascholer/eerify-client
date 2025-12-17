import { store } from "../lib/redux-toolkit/store";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import AppRouter from "./AppRouter";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ReactQueryContainer from "../lib/react-query/ReactQueryProvider";
import { useAppSelector } from "../lib/redux-toolkit/hooks";
import { useEffect } from "react";

const Content = () => {
  const colorTheme = useAppSelector((state) => state.settings.colorTheme);

  useEffect(() => {
    const root = document.documentElement;
    if (colorTheme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [colorTheme]);

  return <RouterProvider router={AppRouter} />;
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
