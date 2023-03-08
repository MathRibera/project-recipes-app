import React from 'react';

import Header from '../components/Header';

export default function DoneRecipes() {
  return (
    <div>
      <Header title="Done Recipes" searchIcon={ false } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
        >
          Drinks
        </button>
        <img data-testid={ `${index}horizontal-image-` } alt="hi" />
      </div>
    </div>
  );
}
