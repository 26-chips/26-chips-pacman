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
        <Button>Default Button</Button>
        <Button thema="light">Light Button</Button>
        <Button disabled>Disabled Button</Button>
        <Button width={100} height={100}>
          Custom Size
        </Button>
        <Button loading>Loading Button</Button>
      </div>
    </>
  );
};

export default UIPage as FunctionComponent;
