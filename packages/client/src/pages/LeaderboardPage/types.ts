export type LeaderboardInfo = {
  userId: number;
  userNickname: string;
  userAvatar: string;
  points: number;
  time: string;
};

export type LeaderboardData = {
  data: LeaderboardInfo;
};

export type GetLeaderboardType = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};
