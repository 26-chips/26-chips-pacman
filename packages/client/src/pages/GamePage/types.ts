export interface GameResult {
  points: string;
  time?: number;
  userId: number | undefined;
  userNickname: string;
  userAvatar: string | undefined;
}

export interface GameResultForLeaderboard {
  data: GameResult;
  ratingFieldName: string;
  teamName: 'chips';
}
