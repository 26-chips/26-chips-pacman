import { emojisList } from './consts';

export interface EmojiType {
  id: number;
  emoji: typeof emojisList | string;
  number: number;
}
