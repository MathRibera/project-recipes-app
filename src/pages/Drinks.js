import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipsCards from '../components/RecipsCards';
import PrincipalDrinks from './PrincipalDrinks';

function drinks() {
  return (
    <div>
      <Header title="Drinks" />
      <RecipsCards />
      <PrincipalDrinks />
      <Footer />
    </div>
  );
}

export default drinks;
