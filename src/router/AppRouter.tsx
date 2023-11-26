import { createBrowserRouter } from "react-router-dom";
import Root from '../components/routes/Root';
import Home from '../components/routes/Home'
import Film from '../components/routes/Film';
import VideoGames from '../components/routes/VidGames';
import Books from '../components/routes/Books';
import SignIn from "../components/routes/SignIn";
import Settings from "../components/routes/Settings";
import ErrorPage from '../components/views/ErrorPage';
import PATHS from "../router/paths";

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
        element: <VideoGames />,
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
    ]
  },
]);

export default AppRouter;

