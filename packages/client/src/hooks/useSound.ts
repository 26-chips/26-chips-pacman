import { useState, useEffect } from 'react';
import crackSound from 'assets/sounds/crack.mp3';
import gameLoopSound from 'assets/sounds/game_loop.mp3';
import failSound from 'assets/sounds/fail.mp3';
import countdownSound from 'assets/sounds/countdown.mp3';
import winSound from 'assets/sounds/win.mp3';

export const useSound = () => {
  const sounds = {
    crack: new Audio(crackSound),
    fail: new Audio(failSound),
    win: new Audio(winSound),
    countdown: new Audio(countdownSound),
    music: new Audio(gameLoopSound),
  };

  sounds.music.volume = 0.1;
  sounds.countdown.volume = 0.5;

  const [isMuted, setMute] = useState(false);
  const [sources] = useState(sounds);

  useEffect(() => {
    if (sounds.music.paused && !isMuted) {
      sounds.music.play();
    }
  });

  const play = async (key: string) => {
    if (!isMuted) {
      await sources[key as keyof typeof sources].play();
    }
  };

  const pause = async (key: string) => {
    await sources[key as keyof typeof sources].pause();
  };

  const toggleMute = async () => {
    if (isMuted) {
      setMute(false);
    } else {
      setMute(true);
      Object.keys(sources).forEach(key => {
        sources[key as keyof typeof sources].pause();
      });
    }
  };

  useEffect(() => {
    Object.keys(sources).forEach(key => {
      sources[key as keyof typeof sources].addEventListener('ended', () => {
        pause(key);
      });
    });

    return () => {
      Object.keys(sources).forEach(key => {
        sources[key as keyof typeof sources].removeEventListener(
          'ended',
          () => {
            pause(key);
          }
        );
      });
    };
  }, []);

  return {
    play,
    toggleMute,
    isMuted,
  };
};
