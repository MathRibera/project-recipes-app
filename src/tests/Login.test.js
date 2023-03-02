import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import Login from '../pages/Login';

describe('PAgina de Login', () => {
  it('End to end', () => {
    renderWithRouter(<Login />);
    const loginInput = 'login-submit-btn';
    expect(screen.getByTestId('email-input'));
    expect(screen.getByTestId('password-input'));
    expect(screen.getByTestId(loginInput)).toBeDisabled();

    userEvent.type(screen.getByTestId('email-input'), 'test@test.com');
    expect(screen.getByTestId(loginInput)).toBeDisabled();
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    expect(screen.getByTestId(loginInput)).toBeEnabled();
    userEvent.click(screen.getByTestId(loginInput));
  });
});
