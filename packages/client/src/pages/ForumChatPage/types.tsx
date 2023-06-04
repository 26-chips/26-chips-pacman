import { emojisList } from './consts';

export interface EmojiType {
  id: number;
  emoji: typeof emojisList | string;
  number: number;
}

export interface MessageLayoutType {
  avatar: string;
  message: string;
  time: string;
  name: string;
  isInterlocutor?: boolean;
  emojis?: EmojiType[];
}
