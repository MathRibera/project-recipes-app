import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const [data, setData] = useState('');
  useEffect(() => {
    const getData = JSON.parse(localStorage.getItem('user'));
    if (typeof getData !== 'object') return history.push('/');
    setData(getData);
  }, []);

  const logout = () => {
    localStorage.clear();
    history.push('/');
  };

  const { email } = data;
  return (
    <div>
      <h1>Profile</h1>
      <p data-testid="profile-email">{email}</p>
      <button
        onClick={ () => history.push('/done-recipes') }
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>
      <button
        onClick={ () => history.push('/favorite-recipes') }
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes

      </button>
      <button
        onClick={ logout }
        data-testid="profile-logout-btn"
      >
        Logout

      </button>
      <Footer />
    </div>
  );
}

export default Profile;
