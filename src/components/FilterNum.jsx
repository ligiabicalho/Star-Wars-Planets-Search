import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import SelectedFilter from './SelectedFilter';
import Button from './Button';

function FilterNum() {
  const { filterOptions, selected, setSelected } = useContext(AppContext);

  const handleSelected = ({ target }) => {
    setSelected((prevSelected) => ({ ...prevSelected, [target.name]: target.value }));
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
          type="number"
          data-testid="value-filter"
          value={ selected.value }
          onChange={ handleSelected }
          placeholder="valor"
        />
        <Button name="Filtrar" testid="button-filter" />
      </form>
      <SelectedFilter />
    </div>

  );
}

export default FilterNum;
