import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';

import {
  Layout,
  ErrorPage,
  MainPage,
  GamePage,
  SigninPage,
  SignupPage,
  ProfilePage,
  LeaderboardPage,
  ForumPage,
  UIPage,
  ForumChatPage
} from 'pages';

import { ROUTES } from './routes';

const routes: RouteObject[] = [
  {
    path: ROUTES.MAIN,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <MainPage /> },
      { path: ROUTES.GAME, element: <GamePage /> },
      { path: ROUTES.SIGNIN, element: <SigninPage /> },
      { path: ROUTES.SIGNUP, element: <SignupPage /> },
      { path: ROUTES.PROFILE, element: <ProfilePage /> },
      { path: ROUTES.LEADERBOARD, element: <LeaderboardPage /> },
      { path: ROUTES.FORUM, element: <ForumPage /> },
      { path: ROUTES.FORUM_TOPIC, element: <ForumChatPage /> },
      { path: ROUTES.UI, element: <UIPage /> },
    ],
  },
];

export default createBrowserRouter(routes);
