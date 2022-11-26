import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredPlanets, setFiltered] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filterOptions, setfilterOptions] = useState([
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const endpoint = 'https://swapi.dev/api/planets';
        const response = await fetch(endpoint);
        const planetsAPI = await response.json();
        planetsAPI.results
          .map((planet) => delete planet.residents);
        setPlanets(planetsAPI.results);
        setFiltered(planetsAPI.results);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlanets();
  }, []);

  const values = useMemo(() => ({
    planets,
    setPlanets,
    isLoading,
    filteredPlanets,
    setFiltered,
    selectedFilters,
    setSelectedFilters,
    filterOptions,
    setfilterOptions,
  }), [isLoading, planets, filteredPlanets, selectedFilters, filterOptions]);

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
