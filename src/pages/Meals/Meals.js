/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Principal from '../../components/Principal/Principal';
import mealIcon from '../../assets/mealIcon.svg';

function Meals() {
  return (
    <div>
      <Header title="Meals" src={ mealIcon } />
      <Principal />
      <Footer />
    </div>
  );
}

export default Meals;
