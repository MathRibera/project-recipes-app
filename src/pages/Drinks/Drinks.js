import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Principal from '../../components/Principal/Principal';
import drinkIcon from '../../assets/drinkIcon.svg';

function Drinks() {
  return (
    <div>
      <Header title="Drinks" src={ drinkIcon } />
      <Principal />
      <Footer />
    </div>
  );
}

export default Drinks;
