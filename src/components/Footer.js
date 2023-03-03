import React from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Footer.module.css';

function Footer() {
  const history = useHistory();
  return (
    <div data-testid="footer" className={ styles.footer }>
      <div>
        <button
          onClick={ () => history.push('/drinks') }
        >
          <img src="./images/drinkIcon.svg" data-testid="drinks-bottom-btn" alt="drink" />
        </button>
      </div>
      <div>
        <button
          onClick={ () => history.push('/meals') }
        >
          <img src="./images/mealIcon.svg" data-testid="meals-bottom-btn" alt="drink" />
        </button>
      </div>

    </div>
  );
}

export default Footer;
