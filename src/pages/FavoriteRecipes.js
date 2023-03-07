import React, { useEffect, useState } from 'react';

import Header from '../components/Header';

export default function FavoriteRecipes() {
  const [stateLocal, setStateLocal] = useState([]);
  const [showAll, setShowAll] = useState([]);
  const [showMeals, setShowMeals] = useState([]);
  const [showDrinks, setShowDrinks] = useState([]);
  useEffect(() => {
    const getData = localStorage.getItem('favoriteRecipes');
    setStateLocal(JSON.parse(getData));
    setShowAll(JSON.parse(getData));
    setShowMeals(JSON.parse(getData).filter((e) => e.type === 'meal'));
    setShowDrinks(JSON.parse(getData).filter((e) => e.type === 'drink'));
  }, []);
  return (
    <div>
      <Header title="Favorite Recipes" searchIcon={ false } />
      <div className="searchs">
        <button
          data-testid="filter-by-all-btn"
          onClick={ () => setStateLocal(showAll) }
        >
          All
        </button>
        <button
          data-testid="filter-by-meal-btn"
          onClick={ () => setStateLocal(showMeals) }
        >
          Meals
        </button>
        <button
          data-testid="filter-by-drink-btn"
          onClick={ () => setStateLocal(showDrinks) }
        >
          Drinks
        </button>
      </div>
      <div>
        {stateLocal.map((e, index) => (
          <div key={ e.name }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ e.image }
              alt={ e.name }
              width="100px"
            />
            <h1 data-testid={ `${index}-horizontal-name` }>{e.name}</h1>
            <h2 data-testid={ `${index}-horizontal-top-text` }>
              {`${e.nationality} - ${e.category}`}
            </h2>
            <button data-testid={ `${index}-horizontal-share-btn` }>Share</button>
            <button data-testid={ `${index}-horizontal-favorite-btn` }>
              Favorite
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
