import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes, { string } from 'prop-types';

import clipboardCopy from 'clipboard-copy';
import shareIcon from '../../assets/shareIcon.svg';
import blackHeartIcon from '../../assets/blackHeartIcon.svg';
import styles from './styles.module.css';

function FavoriteRecipeCard({ e, index }) {
  const [show, setShow] = useState(false);

  const unfavorited = (target) => {
    const newFavorite = stateLocal.filter(e.id !== target.id);
    setStateLocal(newFavorite);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorite));
  };

  const time = 3000;

  return (
    <div key={ e.name } className={ styles.card }>
      <div className={ styles.left }>
        <Link to={ `/${e.type}s/${e.id}` }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ e.image }
            alt={ e.name }
            className={ styles.cardImg }
          />
        </Link>
      </div>
      <div className={ styles.right }>
        <h4
          className={ styles.h4 }
          data-testid={ `${index}-horizontal-name` }
        >
          {e.name}
        </h4>
        <p
          className={ styles.p }
          data-testid={ `${index}-horizontal-top-text` }
        >
          {e.type === 'meal'
            ? `${e.nationality} - ${e.category}`
            : e.alcoholicOrNot}
        </p>
        <div className={ styles.favBtns }>
          <button
            onClick={ () => {
              clipboardCopy(`http://localhost:3000/${e.type}s/${e.id}`);
              setShow(true);
              setTimeout(() => {
                setShow(false);
              }, time);
            } }
          >
            <img
              data-testid={ `${index}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share"
            />
          </button>
          <button onClick={ () => unfavorited(e) }>
            <img
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeartIcon }
              alt="unfavorite"
            />
          </button>
        </div>
      </div>
      {show && <p className={ styles.toasty }>Link copied!</p>}
    </div>
  );
}

FavoriteRecipeCard.propTypes = {
  e: PropTypes.shape({
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

export default FavoriteRecipeCard;
