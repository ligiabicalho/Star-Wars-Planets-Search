import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredPlanets, setFiltered] = useState([]);
  const [selected, setSelected] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const endpoint = 'https://swapi.dev/api/planets';
        const response = await fetch(endpoint);
        const planetsAPI = await response.json();
        planetsAPI.results
          .map((planet) => delete planet.residents);
        console.log('planets API', planetsAPI.results);
        setPlanets(planetsAPI.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  useEffect(() => {
    console.log('planets', planets);
    setFiltered(planets);
  }, [planets]); // planets não varia, então não vai chamar novamente?!...

  const values = useMemo(() => ({
    planets,
    setPlanets,
    isLoading,
    filteredPlanets,
    setFiltered,
    selected,
    setSelected,
  }), [isLoading, planets, filteredPlanets, selected]);

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
