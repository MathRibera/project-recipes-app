import clipboardCopy from 'clipboard-copy';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import shareIcon from '../../assets/shareIcon.svg';
import whiteHeartIcon from '../../assets/whiteHeartIcon.png';
import blackHeartIcon from '../../assets/blackHeartIcon.svg';

import styles from './styles.module.css';

function RecipesMealsDetails() {
  const [sucessCopy, setSucessCopy] = useState(false);
  const [heart, setHeart] = useState(false);
  const history = useHistory();
  const [recipe, setRecipe] = useState([]);
  const [recommends, setRecommends] = useState([]);
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
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const json = await response.json();
      setRecipe(json.meals[0]);
    };
    fetchApi();
    loadFavorite();
  }, [id]);
  useEffect(() => {
    const fetchAPi = async () => {
      const url2 = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response2 = await fetch(url2);
      const json2 = await response2.json();
      const six = 6;
      setRecommends(json2.drinks.slice(0, six));
    };
    fetchAPi();
  }, []);
  const recipies = [
    recipe.strIngredient1,
    recipe.strIngredient2,
    recipe.strIngredient3,
    recipe.strIngredient4,
    recipe.strIngredient5,
    recipe.strIngredient6,
    recipe.strIngredient7,
    recipe.strIngredient8,
    recipe.strIngredient9,
    recipe.strIngredient10,
    recipe.strIngredient11,
    recipe.strIngredient12,
    recipe.strIngredient13,
    recipe.strIngredient14,
    recipe.strIngredient15,
    recipe.strIngredient16,
    recipe.strIngredient17,
    recipe.strIngredient18,
    recipe.strIngredient19,
    recipe.strIngredient20,
  ];
  const measures = [
    recipe.strMeasure1,
    recipe.strMeasure2,
    recipe.strMeasure3,
    recipe.strMeasure4,
    recipe.strMeasure5,
    recipe.strMeasure6,
    recipe.strMeasure7,
    recipe.strMeasure8,
    recipe.strMeasure9,
    recipe.strMeasure10,
    recipe.strMeasure11,
    recipe.strMeasure12,
    recipe.strMeasure13,
    recipe.strMeasure14,
    recipe.strMeasure15,
    recipe.strMeasure16,
    recipe.strMeasure17,
    recipe.strMeasure18,
    recipe.strMeasure19,
    recipe.strMeasure20,
  ];
  const linkYoutube = recipe.strYoutube;
  const newMeasures = measures.filter((e) => typeof e === 'string' && e.length);
  const newRecipes = recipies.filter((e) => typeof e === 'string' && e.length);
  const favorites = () => {
    const getFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    let data = getFavorites;
    if (!getFavorites || getFavorites.length === 0) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      data = JSON.parse(localStorage.getItem('favoriteRecipes'));
    }
    if (!data.some((e) => e.id === recipe.idMeal)) {
      const obj = {
        id: recipe.idMeal,
        type: 'meal',
        nationality: recipe.strArea || '',
        category: recipe.strCategory || '',
        alcoholicOrNot: recipe.strAlcoholic || '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
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
          { background: `url(${recipe.strMealThumb}) no-repeat center / cover` }
        }
      >
        <div
          data-testid="recipe-category"
          name={ recipe.strCategory }
          className={ styles.type }
          id={ pathname() }
        >
          <h2>{recipe.strCategory}</h2>
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
        <h1 className={ styles.h1 } data-testid="recipe-title">{recipe.strMeal}</h1>
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
        <p className={ styles.p } data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <div>
        <h2 className={ styles.h2 }>Video</h2>
        <div className={ styles.yt }>
          {linkYoutube && (
            <iframe
              className={ styles.video }
              data-testid="video"
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
              src={ e.strDrinkThumb }
              width="100px"
              alt={ e.idDrink }
            />
            <p
              className={ styles.cardName }
              data-testid={ `${index}-recommendation-title` }
            >
              {e.strDrink}
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
RecipesMealsDetails.propTypes = {
  match: PropTypes.any,
}.isRequired;
export default RecipesMealsDetails;
