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
  const loginButton = 'login-submit-btn';
  const emailTest = 'test@test.com';
  const buttonIconSearch = 'button-search';
  const nameRadio = 'name-search-radio';

  it('end to end search bar', async () => {
    const { history } = renderWithRouter(<App />);
    expect(screen.getByTestId(emailInput));
    expect(screen.getByTestId(password));
    expect(screen.getByTestId(loginButton)).toBeDisabled();

    userEvent.type(screen.getByTestId(emailInput), emailTest);
    expect(screen.getByTestId(loginButton)).toBeDisabled();
    userEvent.type(screen.getByTestId(password), '1234567');
    expect(screen.getByTestId(loginButton)).toBeEnabled();
    userEvent.click(screen.getByTestId(loginButton));

    await screen.findByTestId(buttonIconSearch);
    userEvent.click(screen.getByTestId(buttonIconSearch));
    const inputText = await screen.findByTestId(searchInput);
    const buttonSearch = screen.getByTestId(searchBarBtn);

    userEvent.type(inputText, 'potato');
    userEvent.click(buttonSearch);
    await screen.findByTestId('recipe-title');
    act(() => {
      history.push('/meals');
    });
    await screen.findByTestId(buttonIconSearch);
    userEvent.click(screen.getByTestId(buttonIconSearch));
    userEvent.type(inputText, 'potato');
    userEvent.click(screen.getByTestId(nameRadio));
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
    expect(screen.getByTestId(emailInput));
    expect(screen.getByTestId(password));
    expect(screen.getByTestId(loginButton)).toBeDisabled();

    userEvent.type(screen.getByTestId(emailInput), emailTest);
    expect(screen.getByTestId(loginButton)).toBeDisabled();
    userEvent.type(screen.getByTestId(password), '1234567');
    expect(screen.getByTestId(loginButton)).toBeEnabled();
    userEvent.click(screen.getByTestId(loginButton));

    await screen.findByTestId('drinkButton');
    userEvent.click(screen.getByTestId('drinkButton'));
    await screen.findByTestId(buttonIconSearch);
    userEvent.click(screen.getByTestId(buttonIconSearch));
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
    userEvent.click(screen.getByTestId(nameRadio));
    userEvent.clear(screen.getByTestId(searchInput));
    userEvent.type(screen.getByTestId(searchInput), 'Aquamarine');
    userEvent.click(buttonSearch);
    await screen.findByText(/Aquamarine/i);
    act(() => {
      history.push('/drinks');
    });
    await screen.findByTestId('drinkButton');
    userEvent.click(screen.getByTestId('drinkButton'));
    await screen.findByTestId(buttonIconSearch);
    userEvent.click(screen.getByTestId(buttonIconSearch));
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
    expect(screen.getByTestId(emailInput));
    expect(screen.getByTestId(password));
    expect(screen.getByTestId(loginButton)).toBeDisabled();

    userEvent.type(screen.getByTestId(emailInput), emailTest);
    expect(screen.getByTestId(loginButton)).toBeDisabled();
    userEvent.type(screen.getByTestId(password), '1234567');
    expect(screen.getByTestId(loginButton)).toBeEnabled();
    userEvent.click(screen.getByTestId(loginButton));

    userEvent.click(screen.getByTestId('search-top-btn'));
    await waitFor(() => screen.getByTestId(nameRadio));
    userEvent.click(screen.getByTestId(nameRadio));
    userEvent.type(screen.getByTestId(searchInput), 'xablau');
    userEvent.click(screen.getByTestId(searchBarBtn));
    await waitFor(() => expect(global.alert).toHaveBeenCalled());
    userEvent.click(screen.getByTestId('drinkButton'));
    userEvent.click(screen.getByTestId('search-top-btn'));
    await waitFor(() => screen.getByTestId(nameRadio));
    userEvent.click(screen.getByTestId(nameRadio));
    userEvent.type(screen.getByTestId(searchInput), 'xablau');
    userEvent.click(screen.getByTestId(searchBarBtn));
    await waitFor(() => expect(global.alert).toHaveBeenCalledTimes(2));
  });
});
