import styles from './participantsList.module.scss';
import { MouseEvent } from 'react';
import { ParticipantItem } from '../participantItem';

export const ParticipantsList = () => {
  return (
    <div
      onClick={(e: MouseEvent) => e.stopPropagation()}
      className={styles.participantsList}>
      <span className={styles.numberOfParticipants}>100</span>
      <ul className={styles.list}>
        <ParticipantItem name="ivanovi" />
        <ParticipantItem name="petrov" />
        <ParticipantItem name="ivanovi" />
        <ParticipantItem name="petrov" />
        <ParticipantItem name="ivanovi" />
        <ParticipantItem name="petrov" />
        <ParticipantItem name="ivanovi" />
      </ul>
    </div>
  );
};
