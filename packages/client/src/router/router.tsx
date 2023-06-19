import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { ErrorBoundary, PrivateRoute, AuthRoute } from 'components';

import {
  Layout,
  MainPage,
  GamePage,
  SigninPage,
  SignupPage,
  ProfilePage,
  LeaderboardPage,
  ForumPage,
  UIPage,
  ForumChatPage,
  StartPage,
} from 'pages';
import { ROUTES } from './routes';

const routes: RouteObject[] = [
  {
    path: ROUTES.MAIN,
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <MainPage /> },
      { path: ROUTES.START, element: <StartPage /> },
      {
        path: ROUTES.SIGNIN,
        element: (
          <AuthRoute>
            <SigninPage />
          </AuthRoute>
        ),
      },
      {
        path: ROUTES.SIGNUP,
        element: (
          <AuthRoute>
            <SignupPage />
          </AuthRoute>
        ),
      },
      { path: ROUTES.GAME, element: <GamePage /> },
      {
        path: ROUTES.PROFILE,
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      {
        path: `${ROUTES.PROFILE}/:id`,
        element: (
          <PrivateRoute>
            <ProfilePage />
          </PrivateRoute>
        ),
      },
      { path: ROUTES.LEADERBOARD, element: <LeaderboardPage /> },
      { path: ROUTES.FORUM, element: <ForumPage /> },
      { path: ROUTES.FORUM_TOPIC, element: <ForumChatPage /> },
      { path: ROUTES.UI, element: <UIPage /> },
    ],
  },
];

export default createBrowserRouter(routes);
