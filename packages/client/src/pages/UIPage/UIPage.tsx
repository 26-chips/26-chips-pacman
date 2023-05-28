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
    </>
  );
};

export default UIPage as FunctionComponent;
