import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/Mycontext';

export default function SearchBar() {
  const [captureInput, setCaptureInput] = useState('');
  const [radioButton, setRadioButton] = useState('ingredient');
  const { setRecipes } = useContext(MyContext);
  const history = useHistory();

  const test = (response) => {
    if (response.drinks === null) {
      return global
        .alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (response.drinks.length === 1) {
      return history.push(`/drinks/${response.drinks[0].idDrink}`);
    }
    const twelve = 12;
    setRecipes(response.drinks.slice(0, twelve));
  };

  const apiConnection = async (input) => {
    if (history.location.pathname === '/meals') {
      let url = '';
      if (radioButton === 'ingredient') {
        url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${input}`;
      } else if (radioButton === 'byName') {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${input}`;
      } else {
        url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${input}`;
      }
      const response = await (await fetch(url)).json();
      if (response.meals === null) {
        return global
          .alert('Sorry, we haven\'t found any recipes for these filters.');
      }
      if (response.meals.length === 1) {
        return history.push(`/meals/${response.meals[0].idMeal}`);
      }
      const twelve = 12;
      setRecipes(response.meals.slice(0, twelve));
    }
    if (history.location.pathname === '/drinks') {
      let url = '';
      if (radioButton === 'ingredient') {
        url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${input}`;
      } else if (radioButton === 'byName') {
        url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${input}`;
      } else {
        url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${input}`;
      }
      const response = await (await fetch(url)).json();
      test(response);
    }
  };

  const handleChange = ({ target }) => {
    if (target.value.length > 1 && radioButton === 'firstLetter') {
      return global.alert('Your search must have only 1 (one) character');
    }
    setCaptureInput(target.value);
  };

  return (
    <div>
      <input
        value={ captureInput }
        onChange={ (e) => handleChange(e) }
        data-testid="search-input"
        type="text"
        placeholder="Search Bar"
      />
      <div>
        <label htmlFor="ingredient">
          <input
            checked={ radioButton === 'ingredient' }
            value="ingredient"
            onChange={ ({ target }) => setRadioButton(target.value) }
            data-testid="ingredient-search-radio"
            type="radio"
            name="select"
          />
          ingredient
        </label>
        <label htmlFor="name">
          <input
            checked={ radioButton === 'byName' }
            value="byName"
            onChange={ ({ target }) => setRadioButton(target.value) }
            data-testid="name-search-radio"
            type="radio"
            name="select"
          />
          name
        </label>
        <label htmlFor="firstLetter">
          <input
            checked={ radioButton === 'firstLetter' }
            value="firstLetter"
            onChange={ ({ target }) => {
              setRadioButton(target.value);
              setCaptureInput('');
            } }
            data-testid="first-letter-search-radio"
            type="radio"
            name="select"
          />
          First letter
        </label>
      </div>
      <button
        onClick={ () => apiConnection(captureInput) }
        data-testid="exec-search-btn"
      >
        SEARCH
      </button>
    </div>
  );
}
