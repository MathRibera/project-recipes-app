import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import SearchBar from '../SearchBar';
import lupa from '../../assets/searchIcon.svg';
import headerLogo from '../../assets/headerLogo.svg';
import profileIcon from '../../assets/profileIcon.svg';

import styles from './styles.module.css';

function Header({ title, searchIcon = true, src }) {
  const history = useHistory();
  const [isVisibleSearchBar, setIsVisibleSearchBar] = useState(false);
  // Estado para controlar a visibilidade da barra de pesquisa, inicialmente falso;
  const [isVisSearchIcon, setIsVisSearchIcon] = useState(true);
  // Estado para controlar a visibilidade do ícone de pesquisa, inicialmente visível;

  useEffect(() => {
    setIsVisSearchIcon(searchIcon);
  }, [searchIcon, setIsVisSearchIcon]);

  return (
    <header>
      <div className={ styles.headerLogo }>
        <img src={ headerLogo } alt="logo" />
        <div className={ styles.buttons }>
          { isVisSearchIcon && (
            <button
              className={ styles.button }
              data-testid="button-search"
              type="button"
              onClick={ () => setIsVisibleSearchBar(!isVisibleSearchBar) }
            >
              <img
                data-testid="search-top-btn"
                src={ lupa }
                alt="ícone de pesquisa"
              />
            </button>
          )}
          <button
            className={ styles.button }
            data-testid="button-profile"
            type="button"
            onClick={ () => history.push('/profile') }
          >
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="ícone de perfil"
            />
          </button>
        </div>
      </div>
      <div className={ styles.title }>
        <img src={ src } alt="icon" className={ styles.titleImg } />
        <h1 data-testid="page-title" className={ styles.titleTxt }>{ title }</h1>
      </div>
      <div className={ styles.searchBar }>
        { isVisibleSearchBar && <SearchBar /> }
      </div>
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchIcon: PropTypes.bool,
  src: PropTypes.string.isRequired,
};

export default Header;
