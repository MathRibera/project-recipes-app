import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Profile from './pages/Profile';
import Drinks from './pages/Drinks';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import MyProvider from './context/MyProvider';
import RecipesMealsDetails from './pages/RecipesMealsDetails';
import RecipesDrinksDetails from './pages/RecipesDrinksDetails';
import RecipeInProgressMeal from './pages/RecipeInProgressMeal';
import RecipeInProgressDrink from './pages/RecipeInProgressDrink';

function App() {
  return (
    <MyProvider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Recipes } />
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
