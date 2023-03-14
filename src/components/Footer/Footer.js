import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './styles.module.css';
import drinkIcon from '../../assets/drinkIcon.svg';
import mealIcon from '../../assets/mealIcon.svg';

function Footer() {
  const history = useHistory();
  return (
    <div data-testid="footer" className={ styles.footer }>
      <div>
        <button
          data-testid="drinkButton"
          onClick={ () => history.push('/drinks') }
        >
          <img src={ drinkIcon } data-testid="drinks-bottom-btn" alt="drink" />
        </button>
      </div>
      <div>
        <button
          data-testid="mealsButton"
          onClick={ () => history.push('/meals') }
        >
          <img src={ mealIcon } data-testid="meals-bottom-btn" alt="drink" />
        </button>
      </div>

    </div>
  );
}

export default Footer;
