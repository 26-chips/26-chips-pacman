import type { RouteObject } from 'react-router-dom';
import {
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
  Layout,
} from 'pages';
import { PrivateRoute, AuthRoute, ErrorBoundary } from 'components';
import { AppDispatch } from 'app/store';
import { apiSlice } from 'api';
import { leaderboardConfig } from '../pages/LeaderboardPage/';

export const ROUTES = {
  MAIN: '/',
  START: '/start',
  GAME: '/game',
  SIGNIN: '/signin',
  SIGNUP: '/signup',
  PROFILE: '/profile',
  LEADERBOARD: '/leaderboard',
  FORUM: '/forum',
  FORUM_TOPIC: '/forum/:chatId',
  UI: '/ui',
};

const fetchUserLoader = (dispatch: AppDispatch) => {
  return dispatch(apiSlice.endpoints.fetchUser.initiate());
};

export const childrenRoutes = [
  {
    path: ROUTES.MAIN,
    element: <MainPage />,
    loader: fetchUserLoader,
  },
  {
    path: ROUTES.START,
    element: <StartPage />,
    loader: fetchUserLoader,
  },
  {
    path: ROUTES.SIGNIN,
    element: (
      <AuthRoute>
        <SigninPage />
      </AuthRoute>
    ),
    loader: fetchUserLoader,
  },
  {
    path: ROUTES.SIGNUP,
    element: (
      <AuthRoute>
        <SignupPage />
      </AuthRoute>
    ),
    loader: fetchUserLoader,
  },
  { path: ROUTES.GAME, element: <GamePage /> },
  {
    path: ROUTES.PROFILE,
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
    loader: fetchUserLoader,
  },
  {
    path: `${ROUTES.PROFILE}/:id`,
    element: (
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    ),
    loader: fetchUserLoader,
  },
  {
    path: ROUTES.LEADERBOARD,
    element: (
      <PrivateRoute>
        <LeaderboardPage />
      </PrivateRoute>
    ),
    loader: async (dispatch: AppDispatch) => {
      await dispatch(
        apiSlice.endpoints.getLeaderboard.initiate(leaderboardConfig)
      );
      return dispatch(apiSlice.endpoints.fetchUser.initiate());
    },
  },
  {
    path: ROUTES.FORUM,
    element: (
      <PrivateRoute>
        <ForumPage />
      </PrivateRoute>
    ),
    loader: fetchUserLoader,
  },
  {
    path: ROUTES.FORUM_TOPIC,
    element: (
      <PrivateRoute>
        <ForumChatPage />
      </PrivateRoute>
    ),
    loader: fetchUserLoader,
  },
  { path: ROUTES.UI, element: <UIPage /> },
];

export const routesWithoutLoaders = childrenRoutes.map(
  ({ loader, ...rest }) => ({
    ...rest,
  })
);

export const routes: RouteObject[] = [
  {
    path: ROUTES.MAIN,
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: routesWithoutLoaders,
  },
];
