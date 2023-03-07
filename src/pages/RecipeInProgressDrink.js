import PropTypes from 'prop-types';
import React from 'react';
// import { useParams } from 'react-router-dom';

function RecipeInProgressDrink() {
  // // const [drink, setDrink] = useState([]);
  // const { id } = useParams();

  // useEffect(() => {
  //   const fetchApi = async () => {
  //     const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  //     const response = await fetch(url);
  //     const json = await response.json();
  //     setDrink(json.drinks[0]);
  //   };
  //   fetchApi();
  // }, [id]);
  // const recipies = [
  //   drink.strIngredient1,
  //   drink.strIngredient2,
  //   drink.strIngredient3,
  //   drink.strIngredient4,
  //   drink.strIngredient5,
  //   drink.strIngredient6,
  //   drink.strIngredient7,
  //   drink.strIngredient8,
  //   drink.strIngredient9,
  //   drink.strIngredient10,
  //   drink.strIngredient11,
  //   drink.strIngredient12,
  //   drink.strIngredient13,
  //   drink.strIngredient14,
  //   drink.strIngredient15,
  // ];
  // const measures = [
  //   drink.strMeasure1,
  //   drink.strMeasure2,
  //   drink.strMeasure3,
  //   drink.strMeasure4,
  //   drink.strMeasure5,
  //   drink.strMeasure6,
  //   drink.strMeasure7,
  //   drink.strMeasure8,
  //   drink.strMeasure9,
  //   drink.strMeasure10,
  //   drink.strMeasure11,
  //   drink.strMeasure12,
  //   drink.strMeasure13,
  //   drink.strMeasure14,
  //   drink.strMeasure15,
  // ];
  // const newMeasures = measures.filter((e) => typeof e === 'string' && e.length);
  // const newRecipes = recipies.filter((e) => typeof e === 'string' && e.length);
  return (
    <div>
      aaa
    </div>
  );
}

RecipeInProgressDrink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default RecipeInProgressDrink;
