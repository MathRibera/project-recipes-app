import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import shareIcon from '../../assets/shareIcon.svg';
import whiteHeartIcon from '../../assets/whiteHeartIcon.png';
import blackHeartIcon from '../../assets/blackHeartIcon.svg';

import styles from './styles.module.css';

function RecipesDrinksDetails() {
  const [sucessCopy, setSucessCopy] = useState(false);
  const [heart, setHeart] = useState(false);
  const history = useHistory();
  const [drinks, setDrinks] = useState([]);
  const [recommends, setRecommend] = useState([]);
  const { id } = useParams();
  const path = history.location.pathname;

  const loadFavorite = () => {
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let data = getFavorites;
    if (!getFavorites || getFavorites.length === 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      data = [];
    }
    setHeart(data.some((e) => e.id === id));
  };
  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const json = await response.json();
      setDrinks(json.drinks[0]);
      loadFavorite();
    };
    fetchApi();
  }, [id]);
  useEffect(() => {
    const fetchApi = async () => {
      const six = 6;
      const url2 = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response2 = await fetch(url2);
      const json2 = await response2.json();
      setRecommend(json2.meals.slice(0, six));
    };
    fetchApi();
  }, []);
  const recipies = [
    drinks.strIngredient1,
    drinks.strIngredient2,
    drinks.strIngredient3,
    drinks.strIngredient4,
    drinks.strIngredient5,
    drinks.strIngredient6,
    drinks.strIngredient7,
    drinks.strIngredient8,
    drinks.strIngredient9,
    drinks.strIngredient10,
    drinks.strIngredient11,
    drinks.strIngredient12,
    drinks.strIngredient13,
    drinks.strIngredient14,
    drinks.strIngredient15,
    drinks.strIngredient16,
    drinks.strIngredient17,
    drinks.strIngredient18,
    drinks.strIngredient19,
    drinks.strIngredient20,
  ];
  const measures = [
    drinks.strMeasure1,
    drinks.strMeasure2,
    drinks.strMeasure3,
    drinks.strMeasure4,
    drinks.strMeasure5,
    drinks.strMeasure6,
    drinks.strMeasure7,
    drinks.strMeasure8,
    drinks.strMeasure9,
    drinks.strMeasure10,
    drinks.strMeasure11,
    drinks.strMeasure12,
    drinks.strMeasure13,
    drinks.strMeasure14,
    drinks.strMeasure15,
    drinks.strMeasure16,
    drinks.strMeasure17,
    drinks.strMeasure18,
    drinks.strMeasure19,
    drinks.strMeasure20,
  ];
  const linkYoutube = drinks.strVideo;
  const newMeasures = measures.filter((e) => typeof e === 'string' && e.length);
  const newRecipes = recipies.filter((e) => typeof e === 'string' && e.length);
  const favorites = () => {
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let data = getFavorites;
    if (!getFavorites || getFavorites.length === 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      data = JSON.parse(localStorage.getItem('favoriteRecipes'));
    }
    if (!data.some((e) => e.id === drinks.idDrink)) {
      const obj = {
        id: drinks.idDrink,
        type: 'drink',
        nationality: drinks.strArea || '',
        category: drinks.strCategory,
        alcoholicOrNot: drinks.strAlcoholic || '',
        name: drinks.strDrink,
        image: drinks.strDrinkThumb,
      };
      const newData = [...data, obj];
      setHeart(true);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
    }
  };

  const disfavor = () => {
    const getData = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newData = getData.filter((e) => e.id !== id);
    setHeart(false);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newData));
  };

  const pathname = () => {
    if (path.includes('/meals')) {
      return 'meals';
    } if (path.includes('drinks')) {
      return 'drinks';
    }
  };

  const time = 3000;

  return (
    <div>
      <div
        className={ styles.thumb }
        style={
          { background: `url(${drinks.strDrinkThumb}) no-repeat center / cover` }
        }
      >
        <div
          data-testid="recipe-category"
          name={ drinks.strCategory }
          className={ styles.type }
          id={ pathname() }
        >
          <h2>{drinks.strCategory}</h2>
        </div>
        <div className={ styles.buttons }>
          <button
            type="button"
            data-testid="share-btn"
            onClick={ async () => {
              await clipboardCopy(`http://localhost:3000${path}`);
              setSucessCopy(true);
              setTimeout(() => {
                setSucessCopy(false);
              }, time);
            } }
          >
            <img src={ shareIcon } alt="" />
          </button>
          <button
            onClick={ !heart ? favorites : disfavor }
            type="button"
          >
            <img
              src={ !heart ? whiteHeartIcon : blackHeartIcon }
              data-testid="favorite-btn"
              alt="Desfavoritado"
            />
          </button>
        </div>
        <h1 className={ styles.h1 } data-testid="recipe-title">{drinks.strDrink}</h1>
      </div>
      <h2 className={ styles.h2 }>Ingredients</h2>
      <ul className={ styles.ingredients }>
        {newRecipes.map((e, index) => (
          <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${e}: ${newMeasures[index]}`}
          </li>
        ))}
      </ul>
      <div>
        <h2 className={ styles.h2 }>Instructions</h2>
        <p className={ styles.p } data-testid="instructions">{drinks.strInstructions}</p>
      </div>
      <div>
        <h2 className={ styles.h2 }>Video</h2>
        <div className={ styles.yt }>
          {linkYoutube && (
            <iframe
              data-testid="video"
              width="100%"
              height="205px"
              src={ linkYoutube }
              title="YouTube video player"
              frameBorder="0"
              allowfullscreen
            />
          )}
        </div>
      </div>
      <h2 className={ styles.h2 }>Recommended</h2>
      <div
        className={ styles.carroussel }
      >
        {recommends.map((e, index) => (
          <div
            className={ styles.card }
            data-testid={ `${index}-recommendation-card` }
            key={ index }
          >
            <img
              className={ styles.cardImg }
              src={ e.strMealThumb }
              width="100px"
              alt={ e.idDrink }
            />
            <p
              className={ styles.cardName }
              data-testid={ `${index}-recommendation-title` }
            >
              {e.strMeal}
            </p>
          </div>
        ))}
      </div>
      <div />
      {sucessCopy && (<p className={ styles.toasty }>Link copied!</p>)}
      <button
        className={ styles.startBtn }
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`/meals/${id}/in-progress`) }
      >
        Start Recipe
      </button>
    </div>
  );
}

RecipesDrinksDetails.propTypes = {
  match: PropTypes.any,
}.isRequired;

export default RecipesDrinksDetails;
