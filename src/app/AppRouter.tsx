/* Send the browser router object to the react router wrapper */
import { PATHS } from "./paths";
import Root from "../components/routes-deprecated/Root";
import Activate from "../components/routes-deprecated/Activate";
import PasswordReset from "../components/routes-deprecated/PasswordReset";
import UserAuth from "../components/routes-deprecated/UserAuth";
import Settings from "../components/routes-deprecated/Settings";
import ErrorPage from "../components/routes-deprecated/ErrorPage";
import ReactRouterWrapper from "../lib/react-router/ReactRouterWrapper";
import Notifications from "../components/routes-deprecated/Notifications";
import Favorites from "../components/routes-deprecated/Favorites";
import FilmPage from "./film";
import BooksPage from "./books";
import Home from "./home";

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
        element: <FilmPage />,
        errorElement: <ErrorPage />,
        // children: [
        //   { index: true, element: <Film /> },
        //   { path: PATHS.FILM + "/:slug", element: <FilmDetail /> },
        // ],
      },
      // {
      //   path: PATHS.GAMES,
      //   element: <GamesLayout />,
      //   errorElement: <ErrorPage />,
      //   children: [
      //     { index: true, element: <Games /> },
      //     { path: PATHS.GAMES + "/:slug", element: <GamesDetail /> },
      //   ],
      // },
      // {
      // Books route (simple page component)
      {
        path: PATHS.BOOKS,
        element: <BooksPage />,
        errorElement: <ErrorPage />,
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
