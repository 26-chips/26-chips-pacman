import {
  Button,
  Checkbox,
  Input,
  Tabs,
  Modal,
  Switch,
  Textarea,
  EndGameScreen,
  Dropdown,
} from 'components';
import { FunctionComponent, useState, ChangeEvent } from 'react';
import styles from './styles.module.scss';

export const UIPage: FunctionComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEndGame, toggleEndGame] = useState(false);

  //Tabs additional
  const [activeTab, setActiveTab] = useState(0);
  setTimeout(() => {
    setActiveTab(Math.floor(Math.random() * 3));
  }, 5000);

  //Textarea additional
  const [value1, setValue1] = useState('');
  const [value2, setValue2] = useState('');
  const handleChange1 = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue1(e.target.value);
  };
  const handleChange2 = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue2(e.target.value);
  };

  return (
    <>
      <h1>UI Page</h1>

      <h2>Inputs</h2>
      <div className={styles.block}>
        <div style={{ width: '350px' }}>
          <h3>Error input 1</h3>
          <Input
            title="Input 1"
            name="Input 1"
            showDeleteSymbol
            errorMessage="Error"
          />
        </div>
        <div style={{ width: '350px' }}>
          <h3>Valid input 1</h3>
          <Input title="Input 1" name="Input 1" showDeleteSymbol />
        </div>
        <div style={{ width: '350px' }}>
          <h3>Valid input 2</h3>
          <Input title="Input 2" name="Input 2" inlineTitle />
        </div>
        <div style={{ width: '350px' }}>
          <h3>Error input 2</h3>
          <Input
            title="Input 2"
            name="Input 2"
            inlineTitle
            errorMessage="Error"
          />
        </div>
      </div>

      <h2>Buttons</h2>
      <div className={styles.block}>
        <div style={{ width: '350px' }}>
          <Button>Default Button</Button>
        </div>
        <div style={{ width: '350px' }}>
          <Button thema="light">Light Button</Button>
        </div>
        <div style={{ width: '350px' }}>
          <Button disabled>Disabled Button</Button>
        </div>
        <div style={{ width: '350px' }}>
          <Button loading>Loading Button</Button>
        </div>
        <div style={{ width: '350px' }}>
          <Button thema="transparent">Transparent Button</Button>
        </div>
      </div>

      <h2>Checkbox</h2>
      <div className={styles.block}>
        <div>
          <Checkbox defaultChecked />
          <Checkbox />
        </div>
      </div>

      <h2>Tabs</h2>
      <div className={styles.block}>
        <div style={{ width: '350px' }}>
          <Tabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            tabNames={['Label 1', 'Label 2', 'Label 3']}
          />
        </div>
      </div>

      <h2>Modal</h2>
      <div className={styles.block} style={{ width: '350px' }}>
        <Button onClick={() => setShowModal(true)}>Open Modal</Button>
        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <div
              className={styles.block}
              style={{ width: '400px', height: '200px' }}>
              Hello World
            </div>
          </Modal>
        )}
      </div>

      <h2>End Game Screen</h2>
      <div className={styles.block} style={{ width: '350px' }}>
        <Button onClick={() => toggleEndGame(true)}>End Game</Button>
        <EndGameScreen
          username="IvanovI"
          show={showEndGame}
          onClose={() => toggleEndGame(false)}
          score={Math.trunc(Math.random() * 1000)}
          elapsedTimeSec={Math.trunc(Math.random() * 1000).toString()}
        />
      </div>

      <h2>Textarea</h2>
      <div className={styles.block}>
        <div style={{ width: '350px' }}>
          <Textarea onChange={handleChange1} value={value1} />
        </div>
        <div style={{ width: '350px' }}>
          <Textarea
            onChange={handleChange2}
            value={value2}
            errorMessage="Error"
          />
        </div>
      </div>

      <h2>Switches</h2>
      <div className={styles.block}>
        <div style={{ width: '350px' }}>
          <Switch />
          <Switch defaultChecked />
        </div>
      </div>

      <h2>Dropdown</h2>
      <div className={styles.block}>
        <Dropdown
          title="Меню"
          hideAfterSelect={false}
          variants={[
            <span onClick={() => console.log('Страница игры')}>
              Страница игры
            </span>,
            <span onClick={() => console.log('Таблица рейтинга')}>
              Таблица рейтинга
            </span>,
            <span onClick={() => console.log('Форум')}>Форум</span>,
            <span onClick={() => console.log('Личный кабинет')}>
              Личный кабинет
            </span>,
            <span style={{ color: 'red' }} onClick={() => console.log('Выход')}>
              Выход
            </span>,
          ]}
          defaultActiveItem={0}
        />
      </div>
    </>
  );
};
