import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('end to end basicao', () => {
  const firstLetter = 'first-letter-search-radio';
  const imageCard = '0-card-img';
  const emailInput = 'email-input';
  const password = 'password-input';
  const searchInput = 'search-input';
  it('end to end search bar', async () => {
    const { history } = renderWithRouter(<App />);
    const loginInput = 'login-submit-btn';
    expect(screen.getByTestId(emailInput));
    expect(screen.getByTestId(password));
    expect(screen.getByTestId(loginInput)).toBeDisabled();

    userEvent.type(screen.getByTestId(emailInput), 'test@test.com');
    expect(screen.getByTestId(loginInput)).toBeDisabled();
    userEvent.type(screen.getByTestId(password), '1234567');
    expect(screen.getByTestId(loginInput)).toBeEnabled();
    userEvent.click(screen.getByTestId(loginInput));

    userEvent.click(screen.getByTestId('button-search'));
    const inputText = screen.getByTestId(searchInput);
    const buttonSearch = screen.getByTestId('exec-search-btn');

    userEvent.type(inputText, 'potato');
    userEvent.click(buttonSearch);
    act(() => {
      history.push('/meals');
    });
    userEvent.type(inputText, 'potato');
    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.click(buttonSearch);
    await waitFor(() => expect(screen.findByTestId(imageCard)), { interval: 3000 });
    userEvent.click(screen.getByTestId(firstLetter));
    userEvent.type(inputText, 'a');
    userEvent.click(buttonSearch);
    await waitFor(() => expect(screen.findByTestId(imageCard)), { interval: 3000 });
  });
  it('testa drink end to end', async () => {
    renderWithRouter(<App />);
    const loginInput = 'login-submit-btn';
    expect(screen.getByTestId(emailInput));
    expect(screen.getByTestId(password));
    expect(screen.getByTestId(loginInput)).toBeDisabled();

    userEvent.type(screen.getByTestId(emailInput), 'test@test.com');
    expect(screen.getByTestId(loginInput)).toBeDisabled();
    userEvent.type(screen.getByTestId(password), '1234567');
    expect(screen.getByTestId(loginInput)).toBeEnabled();
    userEvent.click(screen.getByTestId(loginInput));

    userEvent.click(screen.getByTestId('drinkButton'));
    userEvent.click(screen.getByTestId('button-search'));
    const buttonSearch = screen.getByTestId('exec-search-btn');
    userEvent.type(screen.getByTestId(searchInput), 'lime');
    userEvent.click(buttonSearch);
    await waitFor(() => expect(screen.findByTestId(imageCard)), { interval: 3000 });
    userEvent.click(screen.getByTestId(firstLetter));
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.click(screen.getByTestId(firstLetter));
    userEvent.type(screen.getByTestId(searchInput), 'a');
    userEvent.click(buttonSearch);
    await waitFor(() => expect(screen.findByTestId(imageCard)), { interval: 3000 });
    userEvent.click(screen.getByTestId(firstLetter));
    userEvent.type(screen.getByTestId(searchInput), 'aa');
  });
});
