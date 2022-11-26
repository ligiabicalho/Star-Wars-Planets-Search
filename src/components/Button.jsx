// import React, { useContext } from 'react';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

function Button({ name, testid, column }) {
  const { planets, setFiltered, selectedFilters, setSelectedFilters,
    setFilterOptions, handleMultipleFilters } = useContext(AppContext);

  const handleClick = () => {
    if (testid === 'button-remove-one') {
      const newSelectedFilters = selectedFilters
        .filter((filter) => filter.column !== column);
      if (newSelectedFilters.length === 0) {
        setFiltered(planets);
      } else {
        console.log('else');
        handleMultipleFilters(newSelectedFilters);
      }
      setSelectedFilters(newSelectedFilters); // remove do array de filtros selecionados
      setFilterOptions((prev) => [...prev, column]); // volta com o filtro pra lista de opções
    }
    if (testid === 'button-remove-filters') {
      setSelectedFilters([]);
      setFilterOptions([
        'population',
        'orbital_period',
        'diameter',
        'rotation_period',
        'surface_water',
      ]);
      setFiltered(planets);
      // handleMultipleFilters([]);
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
