import { useRef, useState } from 'react';
import type { ChangeEvent, SyntheticEvent } from 'react';
import { Button, Modal } from 'components';
import { updateAvatar } from 'api';

import styles from './profileAvatar.module.scss';
import { WithUserProps } from '../withUser';
import { WithLoadingProps } from '../withLoading';

const MAX_FILE_SIZE = 1048576;

interface AvatarModalProps extends WithUserProps, WithLoadingProps {
  handleCloseModal: () => void;
}

let avatarFile: File;

export function AvatarModal({
  handleCloseModal,
  setUser,
  setIsLoading,
}: AvatarModalProps): JSX.Element {
  const [error, setError] = useState('');
  const avatarRef = useRef<HTMLImageElement>(null);

  const onSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!avatarFile) return;

    const formData = new FormData();
    formData.append('avatar', avatarFile);

    try {
      setIsLoading(true);
      const { data } = await updateAvatar(formData);
      setUser(data);

      setIsLoading(false);
      handleCloseModal();
    } catch {
      setError('Ошибка, попробуйте ещё раз');
      setIsLoading(false);
    }
  };

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    avatarFile = event.target.files[0];

    const { size } = avatarFile;

    if (size > MAX_FILE_SIZE) {
      setError('Размер файла не может превышать 1Mb');

      return;
    }

    const { current: avatar } = avatarRef;

    if (avatar) {
      const reader = new FileReader();

      reader.onload = e => {
        avatar.style.backgroundImage = `url('${e.target?.result}')`;
        avatar.style.display = 'block';
      };

      reader.readAsDataURL(avatarFile);
    }
  };

  return (
    <Modal onClose={handleCloseModal} className={styles.modal}>
      {!error && <p className={styles.title}>Загрузите файл</p>}
      {error && <p className={styles.error}>{error}</p>}
      <form onSubmit={onSubmit}>
        <input
          id="avatar"
          type="file"
          name="avatar"
          onChange={onChange}
          accept="image/png, image/gif, image/jpeg"
          className={styles.input}
        />
        <label htmlFor="avatar" className={styles.label}>
          Выбрать файл на компьютере
        </label>
        <img ref={avatarRef} className={styles.image} />
        <div className={styles.buttons}>
          <Button thema="light" onClick={handleCloseModal}>
            Сбросить
          </Button>
          <Button type="submit">Загрузить</Button>
        </div>
      </form>
    </Modal>
  );
}
