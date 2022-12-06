import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import Button from './Button';

function FilterOrder() {
  const { filteredPlanets, setFiltered } = useContext(AppContext);
  const [order, setOrder] = useState({
    column: 'population',
    sort: 'ASC',
  });

  const handleSortColumns = () => {
    const { column, sort } = order;
    if (sort === 'ASC') {
      console.log(column);
      console.log(filteredPlanets);
      console.log(filteredPlanets[column]);
      const orderPlanets = filteredPlanets[column].sort((a, b) => a - b);
      return orderPlanets;
    }
    if (sort === 'DESC') {
      const orderPlanets = filteredPlanets[column].sort((a, b) => b - a);
      return orderPlanets;
    }
    setFiltered(orderPlanets);
  };

  const handleOrder = ({ target }) => {
    setOrder((prevOrder) => ({ ...prevOrder, [target.name]: target.value }));
  };

  return (
    <div className="filterOrder">
      <select
        name="column"
        data-testid="column-sort"
        value={ order.column }
        onChange={ handleOrder }
      >
        <option value="population">population</option>
        <option value="orbital_period">orbital_period</option>
        <option value="diameter">diameter</option>
        <option value="rotation_period">rotation_period</option>
        <option value="surface_water">surface_water</option>
      </select>
      <label htmlFor="asc">
        <input
          name="sort"
          id="asc"
          type="radio"
          value="ASC"
          data-testid="column-sort-input-asc"
          onChange={ handleOrder }
        />
        Ascendente
      </label>
      <label htmlFor="desc">
        <input
          name="sort"
          id="desc"
          type="radio"
          value="DESC"
          data-testid="column-sort-input-desc"
          onChange={ handleOrder }
        />
        Descendente
      </label>
      <Button
        name="Ordenar"
        testid="column-sort-button"
        onclick={ handleSortColumns }
      />
    </div>
  );
}

export default FilterOrder;
