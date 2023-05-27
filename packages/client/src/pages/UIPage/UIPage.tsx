import { Input } from '../../components';
import { validateFn } from './additionalFunctions';
import { FunctionComponent } from 'react';

const UIPage = () => {
  return (
    <>
      <h1>UI Page</h1>

      <Input
        value=""
        label="Input 1"
        isLabelStatic={false}
        deleteSymbol=" × "
        validateFn={validateFn}
        errorMessage="No numbers allowed"></Input>

      <Input
        value=""
        label="Input 2"
        isLabelStatic={true}
        validateFn={validateFn}
        errorMessage="No numbers allowed"></Input>
    </>
  );
};

export default UIPage as FunctionComponent;
