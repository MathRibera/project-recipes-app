import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import DoneRecipeCard from '../../components/DoneRecipeCard';
import done from '../../assets/done.svg';
import all from '../../assets/foodIcon.svg';
import meals from '../../assets/food.svg';
import drinks from '../../assets/drink.svg';

import styles from './styles.module.css';

export default function DoneRecipes() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) || [];
  const [recipes, setRecipes] = useState(JSON
    .parse(localStorage.getItem('doneRecipes')) || []);

  const handleFilterButton = (type) => {
    const chosenFilter = doneRecipes.filter((recipe) => recipe.type === type);
    setRecipes(type === 'all' ? doneRecipes : chosenFilter);
  };

  return (
    <div>
      <Header title="Done Recipes" searchIcon={ false } src={ done } />
      <div className={ styles.buttons }>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => handleFilterButton('all') }
          className={ styles.button }
        >
          <img src={ all } alt="all" />
          All
        </button>
        <button
          className={ styles.button }
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => handleFilterButton('meal') }
        >
          <img src={ meals } alt="meals" />
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => handleFilterButton('drink') }
          className={ styles.button }
        >
          <img src={ drinks } alt="drinks" />
          Drinks
        </button>
      </div>
      <main className={ styles.main }>
        { recipes.map((recipe, index) => (
          <DoneRecipeCard
            key={ recipe.id }
            recipe={ recipe }
            index={ index }
          />
        ))}
      </main>
      <Footer />
    </div>
  );
}
