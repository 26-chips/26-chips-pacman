import { emojisList } from '../../utilise/emojis';

export interface EmojiType {
  id: number;
  emoji: typeof emojisList | string;
  number: number;
}
