import { useState, useEffect } from 'react';
import crackSound from 'assets/sounds/crack.mp3';
import gameLoopSound from 'assets/sounds/game_loop.mp3';
import failSound from 'assets/sounds/fail.mp3';
import countdownSound from 'assets/sounds/countdown.mp3';
import winSound from 'assets/sounds/win.mp3';

export const useSound = () => {
  const sounds = {
    win: new Audio(winSound),
    fail: new Audio(failSound),
    crack: new Audio(crackSound),
    gameLoop: new Audio(gameLoopSound),
    countdown: new Audio(countdownSound),
  };

  sounds.gameLoop.volume = 0.05;
  sounds.countdown.volume = 0.2;

  const [isMuted, setMute] = useState(false);
  const [sources] = useState(sounds);
  type KeyOfSourcesType = keyof typeof sources;

  useEffect(() => {
    if (sounds.gameLoop.paused && !isMuted) {
      sounds.gameLoop.play();
    }
  });

  const play = async (key: KeyOfSourcesType) => {
    if (!isMuted) {
      await sources[key].play();
    }
  };

  const pause = async (key: KeyOfSourcesType) => {
    await sources[key].pause();
  };

  const toggleMute = () => {
    if (isMuted) {
      setMute(false);
    } else {
      setMute(true);
      Object.keys(sources).forEach(key => {
        sources[key as KeyOfSourcesType].pause();
      });
    }
  };

  useEffect(() => {
    Object.keys(sources).forEach(key => {
      sources[key as KeyOfSourcesType].addEventListener('ended', () => {
        pause(key as KeyOfSourcesType);
      });
    });

    return () => {
      Object.keys(sources).forEach(key => {
        sources[key as KeyOfSourcesType].removeEventListener('ended', () => {
          pause(key as KeyOfSourcesType);
        });
      });
    };
  }, []);

  return {
    play,
    toggleMute,
    isMuted,
  };
};
