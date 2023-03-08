import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Testa a página FavoriteRecipes', () => {
  it('Testa end 2 end', async () => {
    window.document.execCommand = jest.fn(() => true);
    const localValue = [
      {
        id: '52977',
        type: 'meal',
        nationality: 'Turkish',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Corba',
        image:
          'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
      },
      {
        id: '13501',
        type: 'drink',
        nationality: '',
        category: 'Shot',
        alcoholicOrNot: 'Alcoholic',
        name: 'ABC',
        image:
          'https://www.thecocktaildb.com/images/media/drink/tqpvqp1472668328.jpg',
      },
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(localValue));
    renderWithRouter(<App />, '/favorite-recipes');
    const allBtn = 'filter-by-all-btn';
    expect(screen.getByTestId('page-title'));
    expect(screen.getByTestId('profile-top-btn'));
    expect(screen.getByTestId(allBtn));
    expect(screen.getByTestId('filter-by-meal-btn'));
    expect(screen.getByTestId('filter-by-drink-btn'));
    expect(screen.getByTestId('0-horizontal-image'));
    expect(screen.getByTestId('0-horizontal-name'));
    expect(screen.getByTestId('0-horizontal-top-text'));
    expect(screen.getByTestId('0-horizontal-share-btn'));
    expect(screen.getByTestId('0-horizontal-favorite-btn'));
    expect(screen.getByTestId('1-horizontal-top-text'));
    userEvent.click(screen.getByTestId(allBtn));
    expect(screen.getByTestId('1-horizontal-name'));
    userEvent.click(screen.getByTestId('filter-by-meal-btn'));
    expect(screen.getByText(/turkish - side/i));
    userEvent.click(screen.getByTestId('filter-by-drink-btn'));
    expect(screen.getByTestId('0-horizontal-top-text'));
    userEvent.click(screen.getByTestId(allBtn));
    userEvent.click(screen.getByTestId('1-horizontal-favorite-btn'));
    userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
    expect(screen.getByText(/Link copied!/i));
    screen.debug();
  });
});
