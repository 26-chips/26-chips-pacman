export class Sound {
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
        (this.audio.cloneNode(true) as HTMLAudioElement).play();
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

    if (this.audio) {
      if (this.isMuted) {
        this.audio.src = '';
      } else {
        this.audio.src = this.soundUrl;
      }
    }
  };
}
