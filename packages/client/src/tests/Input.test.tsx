import { Input } from 'components';
import { render, screen, fireEvent } from '@testing-library/react';
import { create } from 'react-test-renderer';

const mockComponent = (
  <Input
    title="Title test"
    name="Name test"
    showDeleteSymbol
    errorMessage="Error test"
    setValue={jest.fn()}
  />
);

describe('<Input />', () => {
  it('Should render', () => {
    render(mockComponent);
  });

  it('Should has cross button', () => {
    render(mockComponent);
    expect(screen.getByRole('button')).toBeDefined();
  });

  it('Should add text on input event', () => {
    const { container } = render(mockComponent);
    const input = container.querySelector('input');
    expect(input).toBeDefined();
    if (input) {
      fireEvent.change(input, { target: { innerText: 'test' } });
      expect(input.innerText).toBe('test');
    }
  });

  it('Should match snapshot', () => {
    const tree = create(mockComponent).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
