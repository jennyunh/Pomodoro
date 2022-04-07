import { render, screen } from '@testing-library/react';
import Pomodoro from './App';

test('renders learn react link', () => {
  render(<Pomodoro />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
