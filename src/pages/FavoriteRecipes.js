import clipboardCopy from 'clipboard-copy';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Header from '../components/Header';

export default function FavoriteRecipes() {
  const [stateLocal, setStateLocal] = useState([]);
  const [showAll, setShowAll] = useState([]);
  const [showMeals, setShowMeals] = useState([]);
  const [showDrinks, setShowDrinks] = useState([]);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const getData = localStorage.getItem('favoriteRecipes');
    setStateLocal(JSON.parse(getData));
    setShowAll(JSON.parse(getData));
    setShowMeals(JSON.parse(getData).filter((e) => e.type === 'meal'));
    setShowDrinks(JSON.parse(getData).filter((e) => e.type === 'drink'));
  }, []);

  const unfavorited = (target) => {
    const newFavorite = stateLocal.filter((e) => e.id !== target.id);
    setStateLocal(newFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
  };

  console.log(stateLocal);
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
            <Link to={ `/${e.type}s/${e.id}` }>
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ e.image }
                alt={ e.name }
                width="100px"
              />
              <h1 data-testid={ `${index}-horizontal-name` }>{e.name}</h1>
              <h2 data-testid={ `${index}-horizontal-top-text` }>
                {e.type === 'meal'
                  ? `${e.nationality} - ${e.category}`
                  : e.alcoholicOrNot}
              </h2>
            </Link>
            <button
              onClick={ () => {
                clipboardCopy(`http://localhost:3000/${e.type}s/${e.id}`);
                setShow(true);
              } }
            >
              <img
                data-testid={ `${index}-horizontal-share-btn` }
                src="../images/shareIcon.svg"
                alt="share"
              />
            </button>
            {show && <p>Link copied!</p>}
            <button onClick={ () => unfavorited(e) }>
              <img
                data-testid={ `${index}-horizontal-favorite-btn` }
                src="../images/blackHeartIcon.svg"
                alt="unfavorite"
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
