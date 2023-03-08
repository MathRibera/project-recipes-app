import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('end to end cabuloso', () => {
  const allFilterCategory = 'All-category-filter';
  it('end to end', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation();
    window.document.execCommand = jest.fn(() => true);
    renderWithRouter(<App />);
    userEvent.type(screen.getByTestId('email-input'), 'test@gmail.com');
    userEvent.type(screen.getByTestId('password-input'), '12345678');
    userEvent.click(screen.getByTestId('login-submit-btn'));
    expect(screen.getByTestId('page-title')); // Titulo da pagina (header);
    expect(screen.getByTestId('profile-top-btn')); // Icone do profile;
    expect(screen.getByTestId('search-top-btn')); // Icone de pesquisa
    expect(await screen.findByTestId('Beef-category-filter')); // Botao da categoria Beef
    expect(screen.getByTestId('Breakfast-category-filter')); // Botao da categoria Breakfast
    expect(screen.getByTestId('Chicken-category-filter')); // Botao da categoria Chicken
    expect(screen.getByTestId('Dessert-category-filter')); // Botao da categoria Dessert
    expect(screen.getByTestId('Goat-category-filter')); // Botao da categoria Goat
    expect(screen.getByTestId(allFilterCategory)); // Botao de Todas as categoria

    const cardName = '0-card-name';
    userEvent.click(screen.getByTestId('Beef-category-filter'));
    expect(await screen.findByTestId(cardName));
    userEvent.click(screen.getByTestId('Breakfast-category-filter'));
    expect(await screen.findByTestId(cardName));
    userEvent.click(screen.getByTestId('Chicken-category-filter'));
    expect(await screen.findByTestId(cardName));
    userEvent.click(screen.getByTestId('Dessert-category-filter'));
    expect(await screen.findByTestId(cardName));
    userEvent.click(screen.getByTestId('Goat-category-filter'));
    expect(await screen.findByTestId(cardName));
    userEvent.click(screen.getByTestId(allFilterCategory));
    expect(await screen.findByTestId(cardName));
    // Buscas
    const searchInput = 'search-input'; // barra de pesquisa do searchbar
    const buttonSubmit = 'exec-search-btn'; // botao para pesquisar o searchbar
    userEvent.click(screen.getByTestId('search-top-btn')); // Icone de pesquisa
    expect(await screen.findByTestId(searchInput));
    userEvent.type(screen.getByTestId(searchInput), 'beef');
    userEvent.click(screen.getByTestId(buttonSubmit));
    expect(await screen.findByText(/beef and oyster pie/i));
    userEvent.click(screen.getByTestId('name-search-radio'));
    userEvent.type(screen.getByTestId(searchInput), 'beef');
    userEvent.click(screen.getByTestId(buttonSubmit));
    expect(await screen.findByText(/beef lo mein/i));
    userEvent.click(screen.getByTestId('first-letter-search-radio'));
    userEvent.type(screen.getByTestId(searchInput), 'b');
    userEvent.click(screen.getByTestId(buttonSubmit));
    userEvent.type(screen.getByTestId(searchInput), 'be');
    expect(alertMock).toBeCalled();

    // drinks
    userEvent.click(screen.getByTestId('drinks-bottom-btn')); // Botao do footer para mostrar bebidas
    expect(await screen.findByTestId('Ordinary Drink-category-filter'));
    expect(screen.getByTestId('Cocktail-category-filter')); // Botao de categoria
    expect(screen.getByTestId('Shake-category-filter')); // Botao de categoria
    expect(screen.getByTestId('Other / Unknown-category-filter')); // Botao de categoria
    expect(screen.getByTestId('Cocoa-category-filter')); // Botao de categoria
    expect(screen.getByTestId(allFilterCategory)); // Botao de categoria

    // drinks
    userEvent.click(screen.getByTestId('drinks-bottom-btn')); // Botao do footer para mostrar bebidas
    userEvent.click(screen.getByTestId('0-card-img'));
    expect(screen.getByTestId('recipe-title'));
    expect(screen.getByText(/instructions/i));
    userEvent.click(screen.getByTestId('favorite-btn'));
    userEvent.click(screen.getByTestId('share-btn'));
    expect(await screen.findByText(/link copied!/i));
    // Profile
    // userEvent.click(screen.getByTestId('button-profile')); // botao do icone de perfil
    // expect(await screen.findByTestId('profile-email')); // email
    // expect(screen.getByTestId('profile-done-btn'));
    // expect(screen.getByTestId('profile-favorite-btn'));
    // expect(screen.getByTestId('profile-logout-btn'));
  });
});
