import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipsCards from '../components/RecipsCards';

function Recipes() {
  return (
    <div>
      <Header title="Meals" />
      <RecipsCards />
      <Footer />
    </div>
  );
}

export default Recipes;
