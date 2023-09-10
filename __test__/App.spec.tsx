import { render, screen } from '@testing-library/react-native';
import React from 'react';

import App from '../src/App';

describe('App', () => {
  it('renders the Text', () => {
    render(<App />);
    expect(
      screen.getByText('Open up App.tsx to start working on your app!')
    ).toBeTruthy();
  });
});
