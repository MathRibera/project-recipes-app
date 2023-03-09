import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { string } from 'prop-types';
import shareIcon from '../../assets/shareIcon.svg';

function DoneRecipeCard({ recipe, index }) {
  const [wasCopied, setWasCopied] = useState(false);

  function handleClick({ type, id }) {
    const time = 3000;
    setWasCopied(true);
    setTimeout(() => {
      setWasCopied(false);
    }, time);

    const link = navigator.clipboard
      .writeText(`${window.location.origin}/${type}s/${id}`);

    return link;
  }

  return (
    <div key={ recipe.id }>
      <Link
        to={ `/${recipe.type}s/${recipe.id}` }
        data-testid={ `${index}-horizontal-name` }
      >
        <h3>
          {recipe.name}
        </h3>
      </Link>
      <h5
        data-testid={ `${index}-horizontal-top-text` }
      >
        { `${recipe.nationality} - ${recipe.category} - ${recipe.alcoholicOrNot}` }
      </h5>
      <p />

      <Link
        to={ `${recipe.type}s/${recipe.id}` }
      >
        <img
          data-testid={ `${index}-horizontal-image` }
          src={ recipe.image }
          alt={ recipe.name }
          style={ { width: '100%' } }
        />
      </Link>
      <div>
        { recipe.tags.map((tag, i) => (
          <div
            key={ i }
            data-testid={ `0-${tag}-horizontal-tag` }
          >
            {tag}
          </div>
        ))}
      </div>
      <p
        data-testid={ `${index}-horizontal-done-date` }
      >
        { recipe.doneDate }

      </p>
      <button
        type="button"
        data-testid={ `${index}-horizontal-share-btn` }
        onClick={ () => handleClick(recipe) }
        src={ shareIcon }
      >
        { wasCopied ? 'Link copied!' : (
          <>
            Share
            <img src={ shareIcon } alt="share icon" />
          </>
        )}
      </button>

    </div>
  );
}

DoneRecipeCard.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    tags: PropTypes.arrayOf(string),
    doneDate: PropTypes.string,
    nationality: PropTypes.string,
    category: PropTypes.string,
    alcoholicOrNot: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
export default DoneRecipeCard;
