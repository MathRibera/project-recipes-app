import React, { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const authPass = 6;
  const regexEmail = /^([a-z0-9_.-]+)@([\da-z.-]+)\.([a-z.]{2,6})$/;

  return (
    <div>
      <label htmlFor="input-email">
        <input
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
          id="input-email"
          type="email"
          data-testid="email-input"
        />
      </label>
      <label htmlFor="input-password">
        <input
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
          type="password"
          data-testid="password-input"
        />
      </label>
      <button
        disabled={ password.length < authPass || !regexEmail.test(email) }
        data-testid="login-submit-btn"
        type="button"
        onClick={
          localStorage.setItem('user', JSON.stringify({ email: `${email}` }))
        }
      >
        Enter
      </button>
    </div>
  );
}

export default Login;
