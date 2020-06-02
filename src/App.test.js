import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react text', () => {
  const { getByText,} = render(<App/>);
  const linkElement = getByText(/Race number/i);
  expect(linkElement).toBeInTheDocument()
});
