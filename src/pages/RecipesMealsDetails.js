import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function RecipesMealsDetails(props) {
  const [recipe, setRecipe] = useState([]);
  const { match } = props;
  const {
    params: { id },
  } = match;

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(url);
      const json = await response.json();
      setRecipe(json.meals[0]);
    };
    fetchApi();
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
  console.log(newMeasures);
  return (
    <div>
      <div>
        <img
          data-testid="recipe-photo"
          style={ { width: '100px' } }
          src={ recipe.strMealThumb }
          alt={ recipe.srtMeal }
        />
      </div>
      <div>
        <h1 data-testid="recipe-title">{recipe.strMeal}</h1>
      </div>
      <div data-testid="recipe-category"><h2>{recipe.strCategory}</h2></div>
      <div>
        {newRecipes.map((e, index) => (
          <p key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
            {`${e}: ${newMeasures[index]}`}
          </p>
        ))}
      </div>
      <div>
        <h2>Instructions</h2>
        <p data-testid="instructions">{recipe.strInstructions}</p>
      </div>
      <div>
        <h2>Video</h2>
        <div>
          {linkYoutube && (
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ linkYoutube }
              title="YouTube video player"
              frameBorder="0"
              allowfullscreen
            />
          )}
        </div>
      </div>
      <div />
    </div>
  );
}

RecipesMealsDetails.propTypes = {
  match: PropTypes.any,
}.isRequired;

export default RecipesMealsDetails;
