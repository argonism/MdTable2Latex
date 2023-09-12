import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders the app', () => {
  render(<App />);
  const headingElement = screen.getByText(/Markdown Table to LaTeX Converter/i);
  expect(headingElement).toBeInTheDocument();
});
