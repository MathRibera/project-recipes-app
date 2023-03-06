import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import RecipsCards from '../components/RecipsCards';

function drinks() {
  return (
    <div>
      <Header title="Drinks" />
      <RecipsCards />
      <Footer />
    </div>
  );
}

export default drinks;
