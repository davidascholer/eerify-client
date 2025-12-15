/* Send the browser router object to the react router wrapper */
import { PATHS } from "./paths";
import Root from "../components/routes/Root";
import Home from "../components/routes/Home";
import Games from "../components/routes/games/pages/GamesInfiniteScroll";
import Activate from "../components/routes/Activate";
import PasswordReset from "../components/routes/PasswordReset";
import UserAuth from "../components/routes/UserAuth";
import Settings from "../components/routes/Settings";
import ErrorPage from "../components/routes/ErrorPage";
import ReactRouterWrapper from "../lib/react-router/ReactRouterWrapper";
import Notifications from "../components/routes/Notifications";
import Favorites from "../components/routes/Favorites";
import GamesDetail from "../components/routes/games/pages/GamesDetail";
import GamesLayout from "../components/routes/games/GamesLayout";
import BookDetail from "../components/routes/books/pages/BookDetail";
import FilmLayout from "../components/routes/film/FilmLayout";
import FilmDetail from "../components/routes/film/pages/FilmDetail";
import Film from "../components/routes/film/pages/FilmInfiniteScroll";
import BooksLayout from "../components/routes/books/BooksLayout";
import Books from "../components/routes/books/pages/BooksInfiniteScroll";

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
        element: <FilmLayout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Film /> },
          { path: PATHS.FILM + "/:slug", element: <FilmDetail /> },
        ],
      },
      {
        path: PATHS.GAMES,
        element: <GamesLayout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Games /> },
          { path: PATHS.GAMES + "/:slug", element: <GamesDetail /> },
        ],
      },
      {
        path: PATHS.BOOKS,
        element: <BooksLayout />,
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Books /> },
          { path: PATHS.BOOKS + "/:slug", element: <BookDetail /> },
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
