// import React, { useContext } from 'react';
import React, { useContext } from 'react';
import AppContext from '../context/AppContext';
import Button from './Button';

function SelectedFilter() {
  const { selectedFilters } = useContext(AppContext);

  return (
    <div className="selectedFilters">
      { selectedFilters.map((filter) => (
        <div
          key={ filter.column }
          data-testid="filter"
        >
          <span>
            {filter.column}
            {filter.comparison}
            {filter.value}
          </span>
          <Button name="X" column={ filter.column } testid="button-remove-one" />
        </div>
      )) }
      {selectedFilters.length > 0
      && <Button name="Remover todas filtragens" testid="button-remove-filters" />}
    </div>
  );
}

export default SelectedFilter;
