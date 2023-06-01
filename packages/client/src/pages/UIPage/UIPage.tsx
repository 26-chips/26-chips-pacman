import {
  Button,
  Checkbox,
  Input,
  Tabs,
  Modal,
  Switch,
  Textarea,
} from 'components';
import { FunctionComponent, useState, ChangeEvent } from 'react';
import styles from './styles.module.scss';

const UIPage = () => {
  //Tabs additionals
  const [activeTab, setActiveTab] = useState(0);
  const [showModal, setShowModal] = useState(false);
  setTimeout(() => {
    setActiveTab(Math.floor(Math.random() * 3));
  }, 5000);

  //Textarea additionals
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
            inlineTitle={false}
            deleteSymbol=" × "
            errorMessage="Error"
          />
        </div>
        <div style={{ width: '350px' }}>
          <h3>Valid input 1</h3>
          <Input title="Input 1" inlineTitle={false} deleteSymbol=" × " />
        </div>
        <div style={{ width: '350px' }}>
          <h3>Valid input 2</h3>
          <Input title="Input 2" inlineTitle />
        </div>
        <div style={{ width: '350px' }}>
          <h3>Error input 2</h3>
          <Input title="Input 2" inlineTitle errorMessage="Error" />
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
        <Modal show={showModal} onClose={() => setShowModal(false)}>
          Hello World
        </Modal>
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
        <h2>Switches</h2>
        <div className={styles.block}>
          <Switch />
          <Switch defaultChecked />
        </div>
      </div>
    </>
  );
};

export default UIPage as FunctionComponent;
