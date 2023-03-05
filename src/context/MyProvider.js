import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import MyContext from './Mycontext';

function MyProvider({ children }) {
  const [mealsData, setMealsData] = useState([]);
  const [drinksData, setDrinksData] = useState([]);

  const value = useMemo(() => ({
    mealsData, setMealsData, drinksData, setDrinksData,
  }), [mealsData, drinksData]);
  return (
    <MyContext.Provider value={ value }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.any,
}.isRequired;

export default MyProvider;
