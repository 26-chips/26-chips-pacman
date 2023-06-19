import { useEffect, useState } from 'react';
import styles from './gameBlock.module.scss';
import expand from 'assets/icons/fullscreen-expand.svg';
import shrink from 'assets/icons/fullscreen-shrink.svg';

export function FullscreenButton(): JSX.Element {
  const [isFullscreen, setFullscreen] = useState(false);
  const isFullscreenDisabled = !document.fullscreenEnabled;

  const toggleFullscreen = () => {
    if (isFullscreenDisabled) {
      alert('Fullscreen API not supported');
      return;
    }

    if (!document.fullscreenElement) {
      document.body.requestFullscreen();
    } else {
      document.exitFullscreen();
    }

    setFullscreen(Boolean(document.fullscreenElement));
  };

  useEffect(() => {
    const handleFSKey = (e: KeyboardEvent) => {
      if (e.key === '27') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    const setFS = () => {
      setFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener('keydown', handleFSKey);
    document.addEventListener('fullscreenchange', setFS);

    return () => {
      window.removeEventListener('keydown', handleFSKey);
      window.removeEventListener('fullscreenchange', setFS);
    };
  }, []);

  return (
    <img
      onClick={() => toggleFullscreen()}
      className={styles.fullscreenIcon}
      src={isFullscreen ? expand : shrink}
      alt="fullscreen switch"
    />
  );
}
