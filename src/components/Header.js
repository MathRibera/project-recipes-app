import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import SearchBar from './SearchBar';

export default function Header({ title, searchIcon = true }) {
  const history = useHistory();
  const [isVisibleSearchBar, setIsVisibleSearchBar] = useState(false);
  // Estado para controlar a visibilidade da barra de pesquisa, inicialmente falso;
  const [isVisSearchIcon, setIsVisSearchIcon] = useState(true);
  // Estado para controlar a visibilidade do ícone de pesquisa, inicialmente visível;

  useEffect(() => {
    setIsVisSearchIcon(searchIcon);
  }, [searchIcon, setIsVisSearchIcon]);

  return (
    <div>
      <h1 data-testid="page-title">{ title }</h1>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img
          data-testid="profile-top-btn"
          src="./images/profileIcon.svg"
          alt="ícone de perfil"
        />
      </button>
      { isVisSearchIcon && (
        <button
          type="button"
          onClick={ () => setIsVisibleSearchBar(!isVisibleSearchBar) }
        >
          <img
            data-testid="search-top-btn"
            src="./images/searchIcon.svg"
            alt="ícone de pesquisa"
          />
        </button>
      )}

      { isVisibleSearchBar && <SearchBar /> }
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchIcon: PropTypes.bool,
};
