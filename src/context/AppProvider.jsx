import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function AppProvider({ children }) {
  const [planets, setPlanets] = useState([]); // recebe dados da API
  const [isLoading, setIsLoading] = useState(true); // não está sendo usado
  const [filteredPlanets, setFiltered] = useState([]); // renderiza os planetas, filtrados ou não.
  const [filterOptions, setFilterOptions] = useState([ // renderiza lista de opções dos filtros
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ]);
  const [selected, setSelected] = useState({ // filtro selecionado
    column: filterOptions[0],
    comparison: 'maior que',
    value: 0,
  });
  const [selectedFilters, setSelectedFilters] = useState([]); // acumula os filtros

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

  const handleMultipleFilters = (allFilters) => {
    let newPlanetsFiltered = planets;
    allFilters.forEach((filter) => {
      newPlanetsFiltered = newPlanetsFiltered.filter((planet) => {
        const { comparison, column, value } = filter;
        if (comparison === 'maior que') {
          return Number(planet[column]) > Number(value);
        }
        if (comparison === 'menor que') {
          return Number(planet[column]) < Number(value);
        }
        if (comparison === 'igual a') {
          return Number(planet[column]) === Number(value);
        }
        return false;
      });
      setFiltered(newPlanetsFiltered);
    });
  };

  const values = {
    planets,
    setPlanets,
    isLoading,
    filteredPlanets,
    setFiltered,
    selected,
    setSelected,
    selectedFilters,
    setSelectedFilters,
    filterOptions,
    setFilterOptions,
    handleMultipleFilters,
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
