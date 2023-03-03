import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('End to end', () => {
  it('profile', () => {
    const user = { email: 'test@gmail.com' };
    localStorage.setItem('user', JSON.stringify(user));
    const { history } = renderWithRouter(<App />, '/profile');
    expect(screen.getByText(/profile/i));
    expect(screen.getByTestId('profile-email'));
    expect(screen.getByText(/test@gmail\.com/i));
    expect(screen.getByTestId('profile-done-btn'));
    expect(screen.getByTestId('profile-favorite-btn'));
    expect(screen.getByTestId('profile-logout-btn'));

    userEvent.click(screen.getByTestId('profile-done-btn'));
    act(() => {
      history.push('/profile');
    });
    userEvent.click(screen.getByTestId('profile-favorite-btn'));
    act(() => {
      history.push('/profile');
    });
    userEvent.click(screen.getByTestId('profile-logout-btn'));
    console.log(history.location.pathname);
  });
  it('test sem login', () => {
    const { history } = renderWithRouter(<App />, '/profile');
    expect(history.location.pathname).toBe('/');
  });
});
