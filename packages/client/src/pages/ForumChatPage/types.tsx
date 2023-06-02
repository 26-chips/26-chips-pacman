import { emojisList } from '../../utils/emojis';

export interface EmojiType {
  id: number;
  emoji: typeof emojisList | string;
  number: number;
}
