import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('end to end basicao', () => {
  global.alert = jest.fn();
  const firstLetter = 'first-letter-search-radio';
  const imageCard = '0-card-img';
  const emailInput = 'email-input';
  const password = 'password-input';
  const searchInput = 'search-input';
  const searchBarBtn = 'exec-search-btn';
  it('end to end search bar', async () => {
    const loginInput = 'login-submit-btn';
    const { history } = renderWithRouter(<App />);
    expect(screen.getByTestId(emailInput));
    expect(screen.getByTestId(password));
    expect(screen.getByTestId(loginInput)).toBeDisabled();

    userEvent.type(screen.getByTestId(emailInput), 'test@test.com');
    expect(screen.getByTestId(loginInput)).toBeDisabled();
    userEvent.type(screen.getByTestId(password), '1234567');
    expect(screen.getByTestId(loginInput)).toBeEnabled();
    userEvent.click(screen.getByTestId(loginInput));

    await screen.findByTestId('button-search');
    userEvent.click(screen.getByTestId('button-search'));
    const inputText = await screen.findByTestId(searchInput);
    const buttonSearch = screen.getByTestId(searchBarBtn);

    userEvent.type(inputText, 'potato');
    userEvent.click(buttonSearch);
    await screen.findByTestId('recipe-title');
    act(() => {
      history.push('/meals');
    });
    await screen.findByTestId('button-search');
    userEvent.click(screen.getByTestId('button-search'));
    userEvent.type(inputText, 'potato');
    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.click(buttonSearch);
    await screen.findByTestId('0-card-img');
    userEvent.click(screen.getByTestId(firstLetter));
    userEvent.type(inputText, 'a');
    userEvent.click(buttonSearch);
    await waitFor(() => expect(screen.findByTestId(imageCard)), { interval: 3000 });
  });
  it('testa drink end to end', async () => {
    const { history } = renderWithRouter(<App />);
    global.alert = jest.fn();
    const loginInput = 'login-submit-btn';
    expect(screen.getByTestId(emailInput));
    expect(screen.getByTestId(password));
    expect(screen.getByTestId(loginInput)).toBeDisabled();

    userEvent.type(screen.getByTestId(emailInput), 'test@test.com');
    expect(screen.getByTestId(loginInput)).toBeDisabled();
    userEvent.type(screen.getByTestId(password), '1234567');
    expect(screen.getByTestId(loginInput)).toBeEnabled();
    userEvent.click(screen.getByTestId(loginInput));

    await screen.findByTestId('drinkButton');
    userEvent.click(screen.getByTestId('drinkButton'));
    await screen.findByTestId('button-search');
    userEvent.click(screen.getByTestId('button-search'));
    const buttonSearch = screen.getByTestId(searchBarBtn);
    userEvent.type(screen.getByTestId(searchInput), 'lime');
    userEvent.click(buttonSearch);
    await waitFor(() => expect(screen.findByTestId(imageCard)), { interval: 3000 });
    // userEvent.click(screen.getByTestId(firstLetter));
    // userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.click(screen.getByTestId(firstLetter));
    userEvent.type(screen.getByTestId(searchInput), 'a');
    userEvent.click(buttonSearch);
    await waitFor(() => expect(screen.findByTestId(imageCard)), { interval: 3000 });
    userEvent.click(screen.getByTestId(firstLetter));
    userEvent.type(screen.getByTestId(searchInput), 'aa');
    userEvent.click(buttonSearch);
    await waitFor(() => expect(global.alert).toHaveBeenCalled());
    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.clear(screen.getByTestId(searchInput));
    userEvent.type(screen.getByTestId(searchInput), 'Aquamarine');
    userEvent.click(buttonSearch);
    await screen.findByText(/Aquamarine/i);
    act(() => {
      history.push('/drinks');
    });
    await screen.findByTestId('drinkButton');
    userEvent.click(screen.getByTestId('drinkButton'));
    await screen.findByTestId('button-search');
    userEvent.click(screen.getByTestId('button-search'));
    await screen.findByTestId('ingredient-search-radio');
    userEvent.click(screen.getByTestId(firstLetter));
    userEvent.click(screen.getByTestId('ingredient-search-radio'));
    userEvent.type(screen.getByTestId(searchInput), 'lime');
    userEvent.click(buttonSearch);
    await waitFor(() => expect(screen.findByTestId(imageCard)), { interval: 3000 });
  });
  it('teste mocked', async () => {
    global.alert = jest.fn();
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

    userEvent.click(screen.getByTestId('search-top-btn'));
    await waitFor(() => screen.getByTestId('name-search-radio'));
    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.type(screen.getByTestId(searchInput), 'xablau');
    userEvent.click(screen.getByTestId('exec-search-btn'));
    await waitFor(() => expect(global.alert).toHaveBeenCalled());
    userEvent.click(screen.getByTestId('drinkButton'));
    userEvent.click(screen.getByTestId('search-top-btn'));
    await waitFor(() => screen.getByTestId('name-search-radio'));
    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.type(screen.getByTestId(searchInput), 'xablau');
    userEvent.click(screen.getByTestId('exec-search-btn'));
    await waitFor(() => expect(global.alert).toHaveBeenCalledTimes(2));
  });
});
