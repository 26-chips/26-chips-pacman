import { Button, Input } from 'components';
import { FunctionComponent } from 'react';
import styles from './styles.module.scss';

const UIPage = () => {
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
    </>
  );
};

export default UIPage as FunctionComponent;
