// import React, { useContext } from 'react';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function Button({ name, testid, column, onclick }) {
  const { planets, setFiltered, selectedFilters, setSelected, selected,
    setSelectedFilters, setFilterOptions, filterOptions,
    handleMultipleFilters } = useContext(AppContext);

  const saveSelectedFilters = () => {
    const allFilters = [...selectedFilters, selected];
    setSelectedFilters(allFilters); // armazena os filtros selecionados
    handleMultipleFilters(allFilters);
    const newFilterOptions = filterOptions.filter((filter) => selected.column !== filter);
    setFilterOptions(newFilterOptions); // modifica a lista de options q está sendo renderizada
    setSelected({ // limpa os valores iniciais do filtro
      column: newFilterOptions[0],
      comparison: 'maior que',
      value: 0,
    });
  };

  const removeOneFilter = () => {
    const newSelectedFilters = selectedFilters
      .filter((filter) => filter.column !== column);
    if (newSelectedFilters.length === 0) {
      setFiltered(planets);
    } else {
      handleMultipleFilters(newSelectedFilters); // faz nova filtragem para renderização
    }
    setSelectedFilters(newSelectedFilters); // remove do array de filtros selecionados
    setFilterOptions((prev) => [...prev, column]); // volta com o filtro pra lista de opções
  };

  const removeAllFilters = () => {
    setSelectedFilters([]);
    setFilterOptions([
      'population',
      'orbital_period',
      'diameter',
      'rotation_period',
      'surface_water',
    ]);
    setFiltered(planets);
  };

  const handleClick = () => {
    if (testid === 'button-filter') {
      saveSelectedFilters();
    }
    if (testid === 'button-remove-one') {
      removeOneFilter();
    }
    if (testid === 'button-remove-filters') {
      removeAllFilters();
    }
    if (testid === 'column-sort-button') {
      onclick(); // func prop handleSortColumns
    }
  };

  return (
    <button
      type="button"
      data-testid={ testid }
      onClick={ handleClick }
    >
      { name }
    </button>
  );
}

Button.propTypes = {
  name: PropTypes.string,
  testid: PropTypes.string,
}.isRequired;

export default Button;
