import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('PAgina de Login', () => {
  it('End to end', async () => {
    renderWithRouter(<App />);
    const loginInput = 'login-submit-btn';
    expect(screen.getByTestId('email-input'));
    expect(screen.getByTestId('password-input'));
    expect(screen.getByTestId(loginInput)).toBeDisabled();

    userEvent.type(screen.getByTestId('email-input'), 'test@test.com');
    expect(screen.getByTestId(loginInput)).toBeDisabled();
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    expect(screen.getByTestId(loginInput)).toBeEnabled();
    userEvent.click(screen.getByTestId(loginInput));

    expect(screen.getByTestId('meals-bottom-btn'));
    expect(screen.getByTestId('drinks-bottom-btn'));
    userEvent.click(screen.getByTestId('drinks-bottom-btn'));
    userEvent.click(screen.getByTestId('meals-bottom-btn'));
  });
});
