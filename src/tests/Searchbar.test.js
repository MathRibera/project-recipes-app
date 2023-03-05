import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('end to end basicao', () => {
  it('end to end search bar', async () => {
    const { history } = renderWithRouter(<App />);
    const loginInput = 'login-submit-btn';
    expect(screen.getByTestId('email-input'));
    expect(screen.getByTestId('password-input'));
    expect(screen.getByTestId(loginInput)).toBeDisabled();

    userEvent.type(screen.getByTestId('email-input'), 'test@test.com');
    expect(screen.getByTestId(loginInput)).toBeDisabled();
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    expect(screen.getByTestId(loginInput)).toBeEnabled();
    userEvent.click(screen.getByTestId(loginInput));

    userEvent.click(screen.getByTestId('button-search'));
    const inputText = screen.getByTestId('search-input');
    const buttonSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(inputText, 'potato');
    userEvent.click(buttonSearch);
    act(() => {
      history.push('/meals');
    });
    userEvent.type(inputText, 'potato');
    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.click(buttonSearch);
    await waitFor(() => expect(screen.findByTestId('0-card-img')), { interval: 3000 });
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.type(inputText, 'a');
    userEvent.click(buttonSearch);
    await waitFor(() => expect(screen.findByTestId('0-card-img')), { interval: 3000 });
  });
  it('testa drink end to end', async () => {
    const { history } = renderWithRouter(<App />);
    const loginInput = 'login-submit-btn';
    expect(screen.getByTestId('email-input'));
    expect(screen.getByTestId('password-input'));
    expect(screen.getByTestId(loginInput)).toBeDisabled();

    userEvent.type(screen.getByTestId('email-input'), 'test@test.com');
    expect(screen.getByTestId(loginInput)).toBeDisabled();
    userEvent.type(screen.getByTestId('password-input'), '1234567');
    expect(screen.getByTestId(loginInput)).toBeEnabled();
    userEvent.click(screen.getByTestId(loginInput));


    userEvent.click(screen.getByTestId('drinkButton'));
    userEvent.click(screen.getByTestId('button-search'));
    const buttonSearch = screen.getByTestId('exec-search-btn');
    userEvent.type(screen.getByTestId('search-input'), 'lime');
    userEvent.click(buttonSearch);
    await waitFor(() => expect(screen.findByTestId('0-card-img')), { interval: 3000 });
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.type(screen.getByTestId('search-input'), 'a');
    userEvent.click(buttonSearch);
    await waitFor(() => expect(screen.findByTestId('0-card-img')), { interval: 3000 });
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.type(screen.getByTestId('search-input'), 'aa');
  });
});
