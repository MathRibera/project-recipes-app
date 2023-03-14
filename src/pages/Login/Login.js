import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/logo Recipes App.svg';
import tomatoes from '../../assets/tomatoes.svg';
import styles from './styles.module.css';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authPass = 7;
  const regexEmail = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email: `${email}` }));
    history.push('/meals');
  };

  return (
    <div className={ styles.loginPage }>
      <div className={ styles.top }>
        <img src={ logo } alt="logo" className={ styles.logo } />
        <img src={ tomatoes } alt="tomatoes" className={ styles.tomatoes } />
      </div>
      <h3 className={ styles.p }>LOGIN</h3>
      <div className={ styles.loginForm }>
        <label htmlFor="input-email">
          <input
            className={ styles.input }
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
            id="input-email"
            type="email"
            data-testid="email-input"
            placeholder="Email"
          />
        </label>
        <label htmlFor="input-password">
          <input
            className={ styles.input }
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
            type="password"
            data-testid="password-input"
            placeholder="Password"
          />
        </label>
        <button
          className={ styles.button }
          disabled={ password.length < authPass || !regexEmail.test(email) }
          data-testid="login-submit-btn"
          type="button"
          onClick={ handleClick }
        >
          ENTER
        </button>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Login;
