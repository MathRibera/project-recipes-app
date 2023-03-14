import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MyContext from '../../context/Mycontext';
import styles from './styles.module.css';

function PrincipalMeals() {
  const history = useHistory();

  const {
    urlMeals,
    urlDrinks,
    urlCategoryDrinks,
    urlCategoryMeals,
    recipes,
    setRecipes,
    setFilterName,
  } = useContext(MyContext);
  const [categories, setCategories] = useState([]);
  const {
    location: { pathname },
  } = history;
  const tweelve = 12;
  const five = 5;

  const fetchApiMeals = () => {
    fetch(urlMeals)
      .then((response) => response.json())
      .then((data) => {
        const tweelveMeals = data.meals
          .map(({ strMealThumb, strMeal, idMeal: id }) => ({
            strMealThumb,
            strMeal,
            id,
          }))
          .filter((meal, index) => index < tweelve);
        setRecipes(tweelveMeals);
      });
  };

  const fetchApiCategoryMeals = () => {
    fetch(urlCategoryMeals)
      .then((response) => response.json())
      .then((data) => {
        const fiveMeals = data.meals
          .filter((category, index) => index < five)
          .map(({ strCategory }) => ({ strCategory }));
        setCategories(fiveMeals);
      });
  };

  const fetchApiDrinks = () => {
    fetch(urlDrinks)
      .then((response) => response.json())
      .then((data) => {
        const tweelveDrinks = data.drinks
          .map(({ strDrinkThumb, strDrink, idDrink: id }) => ({
            strDrinkThumb,
            strDrink,
            id,
          }))
          .filter((drink, index) => index < tweelve);
        setRecipes(tweelveDrinks);
      });
  };

  const fetchApiCategoryDrinks = () => {
    fetch(urlCategoryDrinks)
      .then((response) => response.json())
      .then((data) => {
        const fiveDrinks = data.drinks
          .filter((category, index) => index < five)
          .map(({ strCategory }) => ({ strCategory }));
        setCategories(fiveDrinks);
      });
  };

  useEffect(() => {
    function init() {
      if (pathname === '/meals') {
        fetchApiMeals();
        fetchApiCategoryMeals();
      } else {
        fetchApiDrinks();
        fetchApiCategoryDrinks();
      }
    }
    init();
  }, [pathname]);

  const fetchMeals = ({ target: { name, value } }) => {
    setFilterName(name);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`)
      .then((response) => response.json())
      .then((data) => {
        const filteredMeals = data.meals
          .map(({ strMealThumb, strMeal, idMeal: id }) => ({
            strMealThumb,
            strMeal,
            id,
          }))
          .filter((meal, index) => index < tweelve);
        setRecipes(filteredMeals);
      });
  };

  const fetchDrinks = ({ target: { name, value } }) => {
    setFilterName(name);
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${value}`)
      .then((response) => response.json())
      .then((data) => {
        const filteredDrinks = data.drinks
          .map(({ strDrinkThumb, strDrink, idDrink: id }) => ({ strDrinkThumb,
            strDrink,
            id }))
          .filter((drink, index) => index < tweelve);
        setRecipes(filteredDrinks);
      });
  };

  const buttonFilter = (event) => {
    if (pathname === '/meals') {
      fetchMeals(event);
    } else if (pathname === '/drinks') {
      fetchDrinks(event);
    }
  };

  const buttonAll = () => {
    setRecipes([]);
    if (pathname === '/meals') {
      fetchApiMeals();
      fetchApiCategoryMeals();
    } else {
      fetchApiDrinks();
      fetchApiCategoryDrinks();
    }
  };

  return (
    <>
      <div className={ styles.categories }>
        <button
          className={ styles.category }
          name={ pathname === '/meals' ? 'AllMeals' : 'AllDrinks' }
          type="button"
          data-testid="All-category-filter"
          onClick={ () => buttonAll() }
        >
          All
        </button>
        {categories
          && categories.map((category, index) => (
            <button
              className={ styles.category }
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              key={ `${index}` }
              value={ category.strCategory }
              name={ category.strCategory }
              onClick={ (event) => buttonFilter(event) }
            >
              { category.strCategory }
            </button>
          ))}
      </div>
      <main className={ styles.main }>
        {pathname === '/meals'
          ? recipes.map((recipe, index) => (
            <Link to={ `/meals/${recipe.id}` } key={ index }>
              <div
                className={ styles.recipeCard }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className={ styles.recipeImg }
                  data-testid={ `${index}-card-img` }
                  alt={ recipe.strMeal }
                  src={ recipe.strMealThumb }
                />
                <div className={ styles.recipeName }>
                  <p
                    className={ styles.p }
                    data-testid={ `${index}-card-name` }
                  >
                    {recipe.strMeal}
                  </p>
                </div>
              </div>
            </Link>
          ))
          : recipes.map((recipe, index) => (
            <Link to={ `/drinks/${recipe.id}` } key={ index }>
              <div
                className={ styles.recipeCard }
                data-testid={ `${index}-recipe-card` }
              >
                <img
                  className={ styles.recipeImg }
                  data-testid={ `${index}-card-img` }
                  alt={ recipe.strDrink }
                  src={ recipe.strDrinkThumb }
                />
                <div className={ styles.recipeName }>
                  <p
                    className={ styles.p }
                    data-testid={ `${index}-card-name` }
                  >
                    {recipe.strDrink}
                  </p>
                </div>
              </div>
            </Link>
          ))}
      </main>
    </>
  );
}
export default PrincipalMeals;
