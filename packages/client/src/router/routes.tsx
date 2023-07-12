import { AuthRoute, PrivateRoute } from 'components';
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
} from 'pages';

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

export const paths = [
  {
    path: ROUTES.MAIN,
    index: true,
    element: <MainPage />,
  },
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
  {
    path: ROUTES.LEADERBOARD,
    element: (
      <PrivateRoute>
        <LeaderboardPage />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.FORUM,
    element: (
      <PrivateRoute>
        <ForumPage />
      </PrivateRoute>
    ),
  },
  {
    path: ROUTES.FORUM_TOPIC,
    element: (
      <PrivateRoute>
        <ForumChatPage />
      </PrivateRoute>
    ),
  },
  { path: ROUTES.UI, element: <UIPage /> },
];
