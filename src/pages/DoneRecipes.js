import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../assets/shareIcon.svg';

export default function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);
  const [wasCopied, setWasCopied] = useState(false);

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
  }, []);

  function handleClick({ type, id }) {
    setWasCopied(true);
    const link = navigator.clipboard
      .writeText(`${window.location.origin}/${type}s/${id}`);

    return link;
  }

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
      </div>
      <div>
        { doneRecipes.map((recipe, index) => (
          <div key={ index }>
            <Link
              to={ `/${recipe.type}s/${recipe.id}` }
              data-testid={ `${index}-horizontal-name` }
            >
              <h3>
                {recipe.name}
              </h3>
            </Link>
            <h5
              data-testid={ `${index}-horizontal-top-text` }
            >
              { `${recipe.nationality} - ${recipe.category}-${recipe.alcoholicOrNot}` }
            </h5>
            <p />

            <Link
              to={ `${recipe.type}s/${recipe.id}` }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt={ recipe.name }
              />
            </Link>
            <div>
              { recipe.tags.map((tag, i) => (
                <div
                  key={ i }
                  data-testid={ `0-${tag}-horizontal-tag` }
                >
                  {tag}
                </div>
              ))}
            </div>
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              { recipe.doneDate }

            </p>
            { wasCopied ? (<p>Link copied!</p>) : (
              <button
                type="button"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => handleClick(recipe) }
                src={ shareIcon }
              >
                Share

                <img src={ shareIcon } alt="share icon" />
              </button>)}

          </div>
        ))}
      </div>
    </div>
  );
}
