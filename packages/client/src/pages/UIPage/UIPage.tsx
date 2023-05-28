import { Button } from 'components/Button';
import { Input } from '../../components';
import { FunctionComponent } from 'react';

const UIPage = () => {
  return (
    <>
      <h1>UI Page</h1>

      <h3>Error input 1</h3>

      <Input
        title="Input 1"
        isLabelStatic={false}
        deleteSymbol=" × "
        errorMessage="Error"></Input>

      <h3>Valid input 1</h3>

      <Input title="Input 1" isLabelStatic={false} deleteSymbol=" × "></Input>

      <h3>Valid input 2</h3>

      <Input title="Input 2" isLabelStatic={true}></Input>

      <h3>Error input 2</h3>

      <Input title="Input 2" isLabelStatic={true} errorMessage="Error"></Input>

      <h3>Buttons</h3>

      <Button>Default Button</Button>
      <Button thema="light">Light Button</Button>
      <Button disabled>Disabled Button</Button>
      <Button width={100} height={100}>
        Custom Size
      </Button>
      <Button loading>Loading Button</Button>
    </>
  );
};

export default UIPage as FunctionComponent;
