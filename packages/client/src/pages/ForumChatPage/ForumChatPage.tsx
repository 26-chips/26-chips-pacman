import { FunctionComponent, useState } from 'react';
import styles from './forumChatPage.module.scss';
import iconArrowBack from 'assets/icons/icon-arrow-back.svg';
import { Link } from 'react-router-dom';
import { ROUTES } from 'router';
import defaultAvatar from 'assets/default-avatar.png';
import { MessageLayout, ParticipantsList } from './components';
import iconSend from 'assets/icons/icon-send.svg';
import arrowUp from 'assets/icons/arrow-up.svg';
import arrowDown from 'assets/icons/arrow-down.svg';

const ForumChatPage = () => {
  const [showParticipantsList, setShowParticipantsList] = useState(false);

  const handleShowParticipantsList = () => {
    setShowParticipantsList(!showParticipantsList);
  };

  const participantsListIcon = (): typeof arrowUp | typeof arrowDown => {
    return showParticipantsList ? arrowUp : arrowDown;
  };

  return (
    <div className={styles.chat}>
      <div className={styles.line}></div>
      <div className={styles.chatContainer}>
        <div className={styles.backArea}>
          <Link to={ROUTES.FORUM}>
            <img src={iconArrowBack} alt="Вернуться назад" />
          </Link>
          <div className={styles.verticalLine}></div>
        </div>
        <div className={styles.chatContent}>
          <div className={styles.chatContentHeader}>
            <h1 className={styles.chatTitle}>Тема чата</h1>
            <button
              onClick={handleShowParticipantsList}
              className={styles.participantsListBtn}>
              <p>Участники</p>
              <img src={participantsListIcon()} alt="Список участников" />
              {showParticipantsList ? <ParticipantsList /> : ''}
            </button>
          </div>
          <div className={styles.chatWrapper}>
            <div className={styles.messages}>
              <p className={styles.chatDate}>19 июня, 2022</p>
              <MessageLayout
                name="petrov"
                message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris"
                avatar={defaultAvatar}
                time="11:32"
              />
              <MessageLayout
                name="ivanovi"
                message="Lorem"
                avatar={defaultAvatar}
                time="11:35"
                emojis={[{ id: 1, emoji: '🥰', number: 20 }]}
              />
              <MessageLayout
                name="you"
                message="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
                avatar={defaultAvatar}
                time="11:40"
                interlocutor={false}
                emojis={[
                  { id: 1, emoji: '😀', number: 10 },
                  { id: 2, emoji: '😝', number: 10 },
                ]}
              />
            </div>
            <form className={styles.form}>
              <input placeholder="Сообщение" className={styles.input} />
              <button type="submit" className={styles.submitButton}>
                <img src={iconSend} alt="Отправить" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumChatPage as FunctionComponent;
