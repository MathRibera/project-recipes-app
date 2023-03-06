/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import PrincipalMeals from './PrincipalMeals';

function Recipes() {
  return (
    <>
      <Header title="Meals" />
      {/* <RecipsCards /> */}
      <PrincipalMeals />
      <Footer />
    </>
  );
}

export default Recipes;
