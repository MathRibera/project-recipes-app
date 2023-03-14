import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { string } from 'prop-types';
import shareIcon from '../../assets/shareIcon.svg';
import styles from './styles.module.css';

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
    <div key={ recipe.id } className={ styles.card }>
      <div className={ styles.left }>
        <Link
          to={ `${recipe.type}s/${recipe.id}` }
        >
          <img
            className={ styles.recipeImg }
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt={ recipe.name }
          />
        </Link>
      </div>
      <div className={ styles.right }>
        <div className={ styles.description }>
          <Link
            to={ `/${recipe.type}s/${recipe.id}` }
            data-testid={ `${index}-horizontal-name` }
          >
            <h4 className={ styles.h4 }>
              {recipe.name}
            </h4>
          </Link>
          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            onClick={ () => handleClick(recipe) }
            src={ shareIcon }
            className={ styles.share }
          >
            { wasCopied ? 'Link copied!' : (
              <img src={ shareIcon } alt="share icon" />
            )}
          </button>
          <p
            className={ styles.p }
            data-testid={ `${index}-horizontal-top-text` }
          >
            { `${recipe.nationality} • ${recipe.category} • ${recipe.alcoholicOrNot}` }
          </p>
          <p
            data-testid={ `${index}-horizontal-done-date` }
            className={ styles.p }
          >
            Done in:
            {' '}
            { recipe.doneDate }
          </p>
          <div className={ styles.p }>
            { recipe.tags.map((tag, i) => (
              <div
                key={ i }
                data-testid={ `0-${tag}-horizontal-tag` }
                className={ styles.tag }
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
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
