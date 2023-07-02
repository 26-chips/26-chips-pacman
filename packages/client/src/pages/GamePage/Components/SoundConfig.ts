import crackSound from 'assets/sounds/crack.mp3';
import gameLoopSound from 'assets/sounds/game_loop.mp3';
import failSound from 'assets/sounds/fail.mp3';
import winSound from 'assets/sounds/win.mp3';
import bonusSound from 'assets/sounds/bonus.mp3';
import toggleSound from 'assets/sounds/toggle.mp3';
import { Sound } from './Sound';

const win = new Sound(winSound, false, 0.5);
const fail = new Sound(failSound, false, 0.2);
const bonus = new Sound(bonusSound, false, 0.5);
const gameLoop = new Sound(gameLoopSound, true, 0.1);
const crack = new Sound(crackSound, false, 0.8, 0.8, true);
const toggle = new Sound(toggleSound, false, 0.2, 0.5);

export const AudioElements = {
  win: win,
  fail: fail,
  crack: crack,
  bonus: bonus,
  toggle: toggle,
  gameLoop: gameLoop,
};

export const toggleMute = () => {
  Object.values(AudioElements).forEach(el => {
    el.toggleMute();
  });
};

export const pauseAll = () => {
  Object.values(AudioElements).forEach(el => {
    el.pause();
  });
};
