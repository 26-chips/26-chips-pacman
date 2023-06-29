export interface GameResult {
  points: string;
  time?: number;
  userId?: number;
  userNickname: string;
  userAvatar?: string;
}

export interface GameResultForLeaderboard {
  data: GameResult;
  ratingFieldName: string;
  teamName: 'chips';
}
