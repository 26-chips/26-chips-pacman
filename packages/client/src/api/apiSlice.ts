import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  User,
  SigninData,
  SignupData,
  ProfileData,
  PasswordData,
} from 'app/types';

const REDIRECT_URI = 'http://localhost:3001';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${REDIRECT_URI}/api/v2`,
    credentials: 'include',
    prepareHeaders: (headers, { extra }) => {
      if (extra) {
        headers.set('cookie', extra as string);
      }

      return headers;
    },
  }),
  tagTypes: ['User'],
  endpoints: builder => ({
    // AUTH
    signin: builder.mutation<string, SigninData>({
      query: data => ({
        url: '/auth/signin',
        method: 'POST',
        body: data,
        responseHandler: 'text',
      }),
      invalidatesTags: ['User'],
    }),

    fetchUser: builder.query<User, void>({
      query: () => '/auth/user',
      providesTags: ['User'],
    }),

    signup: builder.mutation<{ id: number }, SignupData>({
      query: data => ({
        url: '/auth/signup',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    logout: builder.mutation<string, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        responseHandler: 'text',
      }),
    }),

    // USER
    updateProfile: builder.mutation<User, ProfileData>({
      query: data => ({
        url: '/user/profile',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    updatePassword: builder.mutation<string, PasswordData>({
      query: data => ({
        url: '/user/password',
        method: 'PUT',
        body: data,
        responseHandler: 'text',
      }),
    }),

    updateAvatar: builder.mutation<User, FormData>({
      query: data => ({
        url: '/user/profile/avatar',
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    addUserToLeaderboard: builder.mutation({
      query: data => ({
        url: '/leaderboard',
        method: 'POST',
        body: data,
        responseHandler: 'text',
      }),
    }),

    getLeaderboard: builder.query({
      query: data => ({
        url: '/leaderboard/chips',
        method: 'POST',
        body: data,
      }),
    }),
    // prettier-ignore
    fetchYandexServiceId: builder.mutation<{ service_id: string }, { redirect_uri: string }>({
      query: data => ({
        url: `/oauth/yandex/service-id?redirect_uri=${encodeURIComponent(
          data.redirect_uri
        )}`,
        method: 'GET',
      }),
    }),

    OAuthYandex: builder.mutation<void, { code: string; redirect_uri: string }>(
      {
        query: data => ({
          url: '/oauth/yandex',
          method: 'POST',
          body: data,
        }),
        invalidatesTags: ['User'],
      }
    ),
  }),
});

export const {
  useFetchUserQuery,
  useSigninMutation,
  useSignupMutation,
  useUpdateProfileMutation,
  useUpdatePasswordMutation,
  useUpdateAvatarMutation,
  useLogoutMutation,
  useAddUserToLeaderboardMutation,
  useGetLeaderboardQuery,
  useFetchYandexServiceIdMutation,
  useOAuthYandexMutation,
} = apiSlice;
