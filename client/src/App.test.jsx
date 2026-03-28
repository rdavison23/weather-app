import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('renders navigation links', () => {
    render(<App />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('does NOT show logout button when no user is stored', () => {
    render(<App />);

    expect(screen.queryByText('Logout')).not.toBeInTheDocument();
  });
});
