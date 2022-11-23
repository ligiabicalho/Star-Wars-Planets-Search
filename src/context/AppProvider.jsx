import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [planets, setPlanets] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchPlanets = async () => {
    try {
      const endpoint = 'https://swapi.dev/api/planets';
      const response = await fetch(endpoint);
      const planetsAPI = await response.json();
      planetsAPI.results
        .map((planet) => delete planet.residents);
      setPlanets(planetsAPI);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const values = { // useMemo??
    planets,
    isLoading,
    fetchPlanets,
  };

  return (
    <AppContext.Provider value={ values }>
      <div className="provider">
        {children}
      </div>
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;

export default AppProvider;
