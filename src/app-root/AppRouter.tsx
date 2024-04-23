/* Send the browser router object to the react router wrapper */
import Root from "../components/routes/Root";
import Home from "../components/routes/Home";
import Film from "../components/routes/Film";
import GamesMain from "../components/routes/video-games/pages/Main";
import Books from "../components/routes/Books";
import Activate from "../components/routes/Activate";
import PasswordReset from "../components/routes/PasswordReset";
import UserAuth from "../components/routes/UserAuth";
import Settings from "../components/routes/Settings";
import ErrorPage from "../components/routes/ErrorPage";
import GameDetailPage from "../components/routes/video-games/pages/GameDetailPage";
import Layout from "../components/routes/video-games/pages/Layout";
import ReactRouterWrapper from "../lib/react-router/ReactRouterWrapper";
import Notifications from "../components/routes/Notifications";
import Favorites from "../components/routes/Favorites";
import { PATHS } from "./paths";

const routes = [
  {
    path: PATHS.ROOT,
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PATHS.ROOT,
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
        path: PATHS.ACTIVATE,
        element: <Activate />,
      },
      {
        path: PATHS.PASSWORD_RESET,
        element: <PasswordReset />,
      },
      {
        path: PATHS.BOOKS,
        element: <Books />,
      },
      {
        path: PATHS.USER_AUTH,
        element: <UserAuth />,
      },
      {
        path: PATHS.SETTINGS,
        element: <Settings />,
      },
      {
        path: PATHS.NOTIFICATIONS,
        element: <Notifications />,
      },
      {
        path: PATHS.FAVORITES,
        element: <Favorites />,
      },
    ],
  },
];

const AppRouter = ReactRouterWrapper(routes);

export default AppRouter;
