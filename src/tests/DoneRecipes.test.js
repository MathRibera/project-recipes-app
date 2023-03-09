import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';

import App from '../App';

const doneRecipes = '/done-recipes';

describe('Done Recipes', () => {
  it('checa a renderização', () => {
    renderWithRouter(<App />, doneRecipes);

    const title = screen.getByRole('heading', { name: /done recipes/i });
    const topText = screen.getByTestId('0-horizontal-top-text');
    const profileBtn = screen.getByRole('button', { name: /ícone de perfil/i });
    const allBtn = screen.getByRole('button', { name: /all/i });
    const mealsBtn = screen.getByRole('button', { name: /meals/i });
    const drinksBtn = screen.getByRole('button', { name: /drinks/i });

    expect(title).toBeInTheDocument();
    expect(profileBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();
    expect(topText).toBeInTheDocument();
  });

  it('testa botão drinks', () => {
    renderWithRouter(<App />, doneRecipes);

    const profileBtn = screen.getByRole('button', { name: /ícone de perfil/i });
    const allBtn = screen.getByRole('button', { name: /all/i });
    const mealsBtn = screen.getByRole('button', { name: /meals/i });
    const drinksBtn = screen.getByRole('button', { name: /drinks/i });

    expect(profileBtn).toBeInTheDocument();
    expect(allBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    expect(drinksBtn).toBeInTheDocument();

    const penne = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
    const aquamarine = screen.getByRole('heading', { name: /aquamarine/i });

    expect(penne).toBeInTheDocument();
    expect(aquamarine).toBeInTheDocument();

    userEvent.click(drinksBtn);
    expect(aquamarine).toBeInTheDocument();
    expect(penne).not.toBeInTheDocument();
  });
  it('testa botão meals', () => {
    renderWithRouter(<App />, doneRecipes);

    const profileBtn = screen.getByRole('button', { name: /ícone de perfil/i });
    const mealsBtn = screen.getByRole('button', { name: /meals/i });

    expect(profileBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();

    const penne = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
    const aquamarine = screen.getByRole('heading', { name: /aquamarine/i });

    expect(penne).toBeInTheDocument();
    expect(aquamarine).toBeInTheDocument();

    userEvent.click(mealsBtn);
    expect(aquamarine).not.toBeInTheDocument();
    expect(penne).toBeInTheDocument();
  });
  it('testa botão all', () => {
    renderWithRouter(<App />, doneRecipes);

    const profileBtn = screen.getByRole('button', { name: /ícone de perfil/i });
    const allBtn = screen.getByRole('button', { name: /all/i });
    const mealsBtn = screen.getByRole('button', { name: /meals/i });

    expect(profileBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();

    const penne = screen.getByRole('heading', { name: /spicy arrabiata penne/i });
    const aquamarine = screen.getByRole('heading', { name: /aquamarine/i });

    expect(penne).toBeInTheDocument();
    expect(aquamarine).toBeInTheDocument();

    userEvent.click(mealsBtn);
    expect(aquamarine).not.toBeInTheDocument();
    expect(penne).toBeInTheDocument();

    userEvent.click(allBtn);
    expect(penne).toBeInTheDocument();
  });
  it('testa botão share', () => {
    renderWithRouter(<App />, doneRecipes);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(6);

    const shareBtns = screen.getAllByRole('button', { name: /share/i });
    expect(shareBtns).toHaveLength(2);
  });
});
// it('', () => {});
// it('', () => {});
// it('', () => {});
// it('', () => {});
// it('', () => {});
// it('', () => {});
// it('', () => {});
