import { Button } from './index';
import { render, screen } from '@testing-library/react';

const mockComponent = <Button>Default Button</Button>;

describe('<Button />', () => {
  it('Should render with text', () => {
    render(mockComponent);
    expect(screen.getByText('Default Button')).toBeDefined();
  });
});
