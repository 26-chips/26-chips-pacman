import styles from './createTopic.module.scss';
import { Button, Input } from '../../../../components';

interface CreateTopicProps {
  handleChangeCreateTopic: () => void;
}

export const CreateTopic = (props: CreateTopicProps) => {
  const handleCancel = () => {
    props.handleChangeCreateTopic();
  };

  return (
    <div className={styles.createTopic}>
      <form className={styles.form}>
        <h2 className={styles.title}>Создать новую тему</h2>
        <Input title="Тема" inlineTitle={false} />
        <div className={styles.buttons}>
          <Button onClick={handleCancel} thema="light">
            Отменить
          </Button>
          <Button>Создать</Button>
        </div>
      </form>
    </div>
  );
};
