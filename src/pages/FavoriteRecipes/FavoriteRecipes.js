import React, { useEffect, useState } from 'react';
import favourites from '../../assets/favourites.svg';
import Footer from '../../components/Footer/Footer';

import all from '../../assets/foodIcon.svg';
import food from '../../assets/food.svg';
import drinks from '../../assets/drink.svg';
import styles from './styles.module.css';

import FavoriteRecipeCard from '../../components/FavoriteRecipeCard';
import Header from '../../components/Header/Header';

export default function FavoriteRecipes() {
  const [stateLocal, setStateLocal] = useState([]);
  const [showAll, setShowAll] = useState([]);
  const [showMeals, setShowMeals] = useState([]);
  const [showDrinks, setShowDrinks] = useState([]);
  useEffect(() => {
    let getData = localStorage.getItem('favoriteRecipes');
    if (!getData) getData = JSON.stringify([]);

    setStateLocal(JSON.parse(getData));
    setShowAll(JSON.parse(getData));
    setShowMeals(JSON.parse(getData).filter((e) => e.type === 'meal'));
    setShowDrinks(JSON.parse(getData).filter((e) => e.type === 'drink'));
  }, []);
  return (
    <div>
      <Header title="Favorite Recipes" searchIcon={ false } src={ favourites } />
      <div className={ styles.buttons }>
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => setStateLocal(showAll) }
          className={ styles.button }
        >
          <img src={ all } alt="all" />
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => setStateLocal(showMeals) }
          className={ styles.button }
        >
          <img src={ food } alt="food" />
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => setStateLocal(showDrinks) }
          className={ styles.button }
        >
          <img src={ drinks } alt="drinks" />
          Drinks
        </button>
      </div>
      <main className={ styles.main }>
        {stateLocal.map((e, index) => (
          <FavoriteRecipeCard key={ index } e={ e } index={ index } />
        ))}
      </main>
      <Footer />
    </div>
  );
}
