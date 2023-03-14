import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login';
import Meals from './pages/Meals/Meals';
import Profile from './pages/Profile/Profile';
import Drinks from './pages/Drinks/Drinks';

import DoneRecipes from './pages/DoneRecipes/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes/FavoriteRecipes';
import MyProvider from './context/MyProvider';
import RecipesMealsDetails from './pages/RecipeDetails/RecipesMealsDetails';
import RecipesDrinksDetails from './pages/RecipeDetails/RecipesDrinksDetails';
import RecipeInProgressMeal from './pages/RecipesInProgress/RecipeInProgressMeal';
import RecipeInProgressDrink from './pages/RecipesInProgress/RecipeInProgressDrink';

function App() {
  return (
    <MyProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route path="/meals/:id/in-progress" component={ RecipeInProgressMeal } />
        <Route path="/drinks/:id/in-progress" component={ RecipeInProgressDrink } />
        <Route exact path="/drinks/:id" component={ RecipesDrinksDetails } />
        <Route exact path="/meals/:id" component={ RecipesMealsDetails } />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </MyProvider>
  );
}

export default App;
