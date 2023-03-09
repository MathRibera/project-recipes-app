import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import DoneRecipeCard from '../components/DoneRecipeCard';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify([
      {
        alcoholicOrNot: '',
        category: 'Vegetarian',
        doneDate: '23/06/2020',
        id: '52771',
        image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
        name: 'Spicy Arrabiata Penne',
        nationality: 'Italian',
        tags: ['Pasta', 'Curry'],
        type: 'meal',
      },
      {
        alcoholicOrNot: 'Alcoholic',
        category: 'Cocktail',
        doneDate: '23/06/2020',
        id: '178319',
        image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
        name: 'Aquamarine',
        nationality: '',
        tags: [],
        type: 'drink',
      },
    ]));
    setDoneRecipes([...JSON.parse(localStorage.getItem('doneRecipes'))]);
    setRecipes([...JSON.parse(localStorage.getItem('doneRecipes'))]);
  }, []);

  const handleFilterButton = (name) => {
    const chosenFilter = doneRecipes.filter((recipe) => recipe.type === name);
    setRecipes(name === 'all' ? doneRecipes : chosenFilter);
  };

  return (
    <div>
      <Header title="Done Recipes" searchIcon={ false } />
      <div>
        <button
          type="button"
          name="all"
          data-testid="filter-by-all-btn"
          onClick={ ({ target: { name } }) => handleFilterButton(name) }
        >
          All
        </button>
        <button
          type="button"
          name="meal"
          data-testid="filter-by-meal-btn"
          onClick={ ({ target: { name } }) => handleFilterButton(name) }

        >
          Meals
        </button>
        <button
          type="button"
          name="drink"
          data-testid="filter-by-drink-btn"
          onClick={ ({ target: { name } }) => handleFilterButton(name) }
        >
          Drinks
        </button>
      </div>
      <div>
        { recipes.map((recipe, index) => (
          <DoneRecipeCard
            key={ recipe.id }
            recipe={ recipe }
            index={ index }
          />
        ))}
      </div>
    </div>
  );
}
