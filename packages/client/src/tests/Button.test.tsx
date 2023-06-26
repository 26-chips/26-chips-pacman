import { Button } from 'components';
import { create } from 'react-test-renderer';
import { render } from '@testing-library/react';

const mockComponent = <Button>Default Button</Button>;

describe('<Button />', () => {
  it('Should render correctly', () => {
    const button = render(mockComponent);
    expect(button.getByText('Default Button')).toBeInTheDocument();
  });

  it('Should match snapshot', () => {
    const tree = create(mockComponent).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
