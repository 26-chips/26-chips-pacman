import { Button, Input, Tabs } from 'components';
import { FunctionComponent, useState } from 'react';
import styles from './styles.module.scss';

const UIPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  setTimeout(() => {
    setActiveTab(Math.floor(Math.random() * 3));
  }, 2000);

  return (
    <>
      <h1>UI Page</h1>

      <h2>Inputs</h2>
      <div className={styles.block}>
        <div>
          <h3>Error input 1</h3>
          <Input
            title="Input 1"
            inlineTitle={false}
            deleteSymbol=" × "
            errorMessage="Error"
          />
        </div>
        <div>
          <h3>Valid input 1</h3>
          <Input title="Input 1" inlineTitle={false} deleteSymbol=" × " />
        </div>
        <div>
          <h3>Valid input 2</h3>
          <Input title="Input 2" inlineTitle />
        </div>
        <div>
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
    </>
  );
};

export default UIPage as FunctionComponent;
