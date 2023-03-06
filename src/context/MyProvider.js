import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './Mycontext';

function MyProvider({ children }) {
  const urlMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const urlCategoryMeals = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
  const urlCategoryDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const [recipes, setRecipes] = useState([]);
  const [mealsData, setMealsData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);
  const [filterName, setFilterName] = useState('');

  const value = useMemo(() => ({
    mealsData,
    setMealsData,
    drinksData,
    setDrinksData,
    urlMeals,
    urlDrinks,
    urlCategoryDrinks,
    urlCategoryMeals,
    recipes,
    setRecipes,
    filterName,
    setFilterName,
  }), [mealsData, drinksData, setRecipes, recipes]);

  return (
    <MyContext.Provider
      value={ value }
    >
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default MyProvider;
