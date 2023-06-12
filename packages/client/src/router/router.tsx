import { createBrowserRouter } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { ErrorBoundary } from 'components';

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
      { path: ROUTES.SIGNIN, element: <SigninPage /> },
      { path: ROUTES.SIGNUP, element: <SignupPage /> },
      { path: ROUTES.GAME, element: <GamePage /> },
      { path: ROUTES.PROFILE, element: <ProfilePage /> },
      { path: ROUTES.LEADERBOARD, element: <LeaderboardPage /> },
      { path: ROUTES.FORUM, element: <ForumPage /> },
      { path: ROUTES.FORUM_TOPIC, element: <ForumChatPage /> },
      { path: ROUTES.UI, element: <UIPage /> },
    ],
  },
];

export default createBrowserRouter(routes);
