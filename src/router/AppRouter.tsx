import { createBrowserRouter } from "react-router-dom";
import Root from "../components/routes/Root";
import Home from "../components/routes/Home";
import Film from "../components/routes/Film";
import GamesMain from "../components/routes/video-games/pages/Main";
import Books from "../components/routes/Books";
import SignIn from "../components/routes/SignIn";
import Settings from "../components/routes/Settings";
import ErrorPage from "../components/views/ErrorPage";
import PATHS from "../router/paths";
import GameDetailPage from "../components/routes/video-games/pages/GameDetailPage";
import Layout from "../components/routes/video-games/pages/Layout";

const AppRouter = createBrowserRouter([
  {
    path: PATHS.ROOT,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PATHS.HOME,
        element: <Home />,
      },
      {
        path: PATHS.FILM,
        element: <Film />,
      },
      {
        path: PATHS.VIDEO_GAMES,
        element: <Layout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <GamesMain /> },
          { path: PATHS.VIDEO_GAMES + "/:slug", element: <GameDetailPage /> },
        ],
      },
      {
        path: PATHS.BOOKS,
        element: <Books />,
      },
      {
        path: PATHS.SIGN_IN,
        element: <SignIn />,
      },
      {
        path: PATHS.SETTINGS,
        element: <Settings />,
      },
    ],
  },
]);

export default AppRouter;
