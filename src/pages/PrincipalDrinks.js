import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MyContext from '../context/Mycontext';

function PrincipalDrinks() {
  const history = useHistory();
  const { urlMeals, urlDrinks, urlCategoryDrinks,
    urlCategoryMeals, recipes, setRecipes } = useContext(MyContext);
  // const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const { location: { pathname } } = history;
  // console.log(pathname);
  // console.log(history);
  const tweelve = 12;
  const five = 5;

  const fetchApiMeals = () => {
    fetch(urlMeals)
      .then((response) => response.json())
      .then((data) => {
        const tweelveMeals = data.meals
          .map(({ strMealThumb, strMeal, idMeal: id }) => ({ strMealThumb,
            strMeal,
            id }))
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
          .map(({ strDrinkThumb, strDrink, idDrink: id }) => ({ strDrinkThumb,
            strDrink,
            id }))
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

  // console.log(categories);

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

  const buttonFilter = (event) => {
    const { target } = event;
    const { value } = target;
    console.log(value);
    if (pathname === '/meals') {
      fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`)
        .then((response) => response.json())
        .then((data) => {
          const filteredMeals = data.meals
            .map(({ strMealThumb, strMeal, idMeal: id }) => ({ strMealThumb,
              strMeal,
              id }))
            .filter((meal, index) => index < tweelve);
          setRecipes(filteredMeals);
          console.log(filteredMeals);
        });
    } else {
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
      <div>
        {
          categories && categories.map((category, index) => (
            <button
              type="button"
              data-testid={ `${category.strCategory}-category-filter` }
              key={ `${index}` }
              value={ category.strCategory }
              onClick={ (event) => buttonFilter(event) }
            >
              { category.strCategory }
            </button>
          ))
        }
        <button
          type="button"
          data-testid="All-category-filter"
          onClick={ () => buttonAll() }
        >
          All
        </button>
      </div>
      <div>
        { pathname === '/meals' ? recipes.map((recipe, index) => (

          <Link to={ `/meals/${recipe.idMeal}` } key={ index }>
            <div
              data-testid={ `${index}-recipe-card` }
            >
              <img
                data-testid={ `${index}-card-img` }
                alt={ recipe.strMeal }
                src={ recipe.strMealThumb }
              />
              <p data-testid={ `${index}-card-name` }>{ recipe.strMeal }</p>
            </div>
          </Link>
        ))
          : recipes.map((recipe, index) => (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events
            <Link to={ `/drinks/${recipe.idDrink}` } key={ index }>
              <div
                data-testid={ `${index}-recipe-card` }
                // onClick={ () => recipesDetails(recipe.id) }
              >
                <img
                  data-testid={ `${index}-card-img` }
                  alt={ recipe.strDrink }
                  src={ recipe.strDrinkThumb }
                />
                <p data-testid={ `${index}-card-name` }>{ recipe.strDrink }</p>
              </div>
            </Link>))}
      </div>
    </>
  );
}
export default PrincipalDrinks;
