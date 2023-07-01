import crackSound from 'assets/sounds/crack.mp3';
import gameLoopSound from 'assets/sounds/game_loop.mp3';
import failSound from 'assets/sounds/fail.mp3';
import countdownSound from 'assets/sounds/countdown.mp3';
import winSound from 'assets/sounds/win.mp3';
import bonusSound from 'assets/sounds/bonus.mp3';
import toggleSound from 'assets/sounds/toggle.mp3';
import blockedSound from 'assets/sounds/blocked.mp3';

class Sound {
  private soundUrl: string;

  private isLooped: boolean;

  private isMuted: boolean;

  private volumeLevel: number;

  private playbackRate: number;

  private playMultipleTimes: boolean;

  private audio: HTMLAudioElement | null;

  constructor(
    soundUrl: string,
    isLooped = false,
    volumeLevel = 1,
    playbackRate = 1,
    playMultipleTimes = false
  ) {
    if (soundUrl) {
      this.audio = new Audio(soundUrl);
      this.audio.loop = isLooped;
      this.audio.volume = volumeLevel;
      this.audio.playbackRate = playbackRate;
    } else {
      this.audio = null;
    }

    this.soundUrl = soundUrl;
    this.isMuted = false;
    this.isLooped = isLooped;
    this.volumeLevel = volumeLevel;
    this.playbackRate = playbackRate;
    this.playMultipleTimes = playMultipleTimes;
  }

  play = () => {
    if (!this.isMuted && this.audio) {
      this.audio.play();
      // play again if already playing
      if (!this.audio.paused && !this.audio.loop && this.playMultipleTimes) {
        // @ts-ignore
        this.audio.cloneNode(true).play();
      }
    }
  };

  pause = () => {
    if (this.audio) {
      this.audio.pause();
    }
  };

  toggleMute = () => {
    this.isMuted = !this.isMuted;

    if (this.isMuted) {
      // @ts-ignore
      this.audio.src = '';
    } else {
      // @ts-ignore
      this.audio.src = this.soundUrl;
    }
  };

  isPaused = () => {
    return this.audio?.paused;
  };
}

const win = new Sound(winSound, false, 0.5);
const fail = new Sound(failSound, false, 0.2);
const bonus = new Sound(bonusSound, false, 0.5);
const gameLoop = new Sound(gameLoopSound, true, 0.1);
const countdown = new Sound(countdownSound, false, 0.5);
const crack = new Sound(crackSound, false, 0.8, 0.8, true);
const blocked = new Sound(blockedSound, false, 0.4);
const toggle = new Sound(toggleSound, false, 0.2, 0.5);

export const AudioElements = {
  win: win,
  fail: fail,
  crack: crack,
  bonus: bonus,
  toggle: toggle,
  blocked: blocked,
  gameLoop: gameLoop,
  countdown: countdown,
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
