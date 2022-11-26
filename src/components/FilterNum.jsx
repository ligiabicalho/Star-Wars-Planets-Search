import React, { useContext, useState } from 'react';
import AppContext from '../context/AppContext';

function FilterNum() {
  const { filteredPlanets, setFiltered,
    selectedFilters, setSelectedFilters,
    filterOptions, setfilterOptions } = useContext(AppContext);
  const [selected, setSelected] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const renderSelectedFilters = selectedFilters.map((filter, i) => (
    <div className="selectedFilters" key={ i }>
      <p>
        {filter.column}
        {filter.comparison}
        {filter.value}
      </p>
    </div>
  ));

  const handleSelected = ({ target }) => {
    setSelected((prevSelect) => ({ ...prevSelect, [target.name]: target.value }));
  };

  const handleMultipleFilters = (allFilters) => {
    allFilters.forEach((filter) => {
      const planetsFiltered = filteredPlanets.filter((planet) => {
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
      setFiltered(planetsFiltered);
    });
  };

  const saveSelectedFilters = () => {
    const allFilters = [...selectedFilters, selected];
    setSelectedFilters(allFilters);
    handleMultipleFilters(allFilters);
    const newFilterOptions = filterOptions.filter((filter) => selected.column !== filter);
    setfilterOptions(newFilterOptions);
    setSelected({
      column: 'population',
      comparison: 'maior que',
      value: 0,
    });
  };

  return (
    <div className="filterNum">
      <form>
        <select
          name="column"
          data-testid="column-filter"
          value={ selected.column }
          onChange={ handleSelected }
        >
          {filterOptions.map((filter) => (
            <option key={ filter } value={ filter }>{filter}</option>
          ))}
        </select>
        <select
          name="comparison"
          data-testid="comparison-filter"
          value={ selected.comparison }
          onChange={ handleSelected }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          name="value"
          data-testid="value-filter"
          value={ selected.value }
          onChange={ handleSelected }
          placeholder="valor"
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ saveSelectedFilters }
        >
          Filtrar
        </button>
      </form>
      { renderSelectedFilters }
    </div>

  );
}

export default FilterNum;
