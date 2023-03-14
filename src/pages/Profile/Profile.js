import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import yellowProfileIcon from '../../assets/yellowProfile.svg';
import done from '../../assets/done.svg';
import favourites from '../../assets/favourites.svg';
import logoutImg from '../../assets/logout.svg';

import styles from './styles.module.css';

function Profile() {
  const history = useHistory();
  const [data, setData] = useState('');
  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem('user'));
    setData(getData);
  }, [history]);

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" searchIcon={ false } src={ yellowProfileIcon } />
      <main className={ styles.main }>
        <p className={ styles.p } data-testid="profile-email">
          {data?.email}
        </p>
        <div className={ styles.buttons }>
          <button
            onClick={ () => history.push('/done-recipes') }
            data-testid="profile-done-btn"
            className={ styles.button }
          >
            <img src={ done } alt="done" />
            Done Recipes
          </button>
          <hr className={ styles.hr } />
          <button
            onClick={ () => history.push('/favorite-recipes') }
            data-testid="profile-favorite-btn"
            className={ styles.button }
          >
            <img src={ favourites } alt="favourite" />
            Favorite Recipes
          </button>
          <hr className={ styles.hr } />
          <button
            onClick={ logout }
            data-testid="profile-logout-btn"
            className={ styles.button }
          >
            <img src={ logoutImg } alt="logout" />
            Logout
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;
