export interface GameResult {
  points: number;
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
