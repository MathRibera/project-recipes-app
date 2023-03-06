import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testando o Componente Header', () => {
  it('end to end', async () => {
    const user = { user: 'test@gmail.com' };
    localStorage.setItem('user', JSON.stringify(user));
    const { history } = renderWithRouter(<App />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const password = '1234567';
    const button = screen.getByTestId('login-submit-btn');

    userEvent.type(inputEmail, 'test@gmail.com');
    userEvent.type(inputPassword, password);
    userEvent.click(button);

    await waitFor(() => expect(screen.getByTestId('page-title')));
    expect(screen.getByTestId('button-profile'));
    expect(screen.getByTestId('profile-top-btn'));
    expect(screen.getByTestId('button-search'));
    expect(screen.getByTestId('search-top-btn'));
    userEvent.click(screen.getByTestId('button-profile'));
    act(() => {
      history.push('/meals');
    });
    userEvent.click(screen.getByTestId('button-search'));
    expect(screen.getByTestId('search-input'));
    console.log(history.location.pathname);
  });
});
