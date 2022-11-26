import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function FilterName() {
  const { planets, setFiltered } = useContext(AppContext);

  const handleFilterName = ({ target }) => {
    if (target.value === '') {
      setFiltered(planets);
    } else {
      setFiltered(planets.filter((planet) => planet.name.toLowerCase()
        .includes(target.value.toLowerCase())));
    }
  };

  return (
    <div className="filterName">
      <form>
        <label htmlFor="nameFilter">
          <input
            type="text"
            name="name"
            placeholder="buscar por nome"
            data-testid="name-filter"
            // value={} o onChange já altera o estado e assiona o filtro.
            onChange={ handleFilterName }
          />
        </label>
      </form>
    </div>

  );
}

export default FilterName;
