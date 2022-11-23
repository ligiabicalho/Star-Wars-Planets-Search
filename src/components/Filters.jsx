import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';

function Filters() {
  const { planets, setFiltered } = useContext(AppContext);
  // const [search, setSearch] = useState(''); => Preciso MESMO ter esses dados no estado???

  // filter retorna array
  const handleFilter = ({ target }) => {
    // if else => setFiltered(planets) ??
    const resultFilter = planets?.filter((planet) => planet.name.toLowerCase()
      .includes(target.value.toLowerCase()));
    console.log('filter', resultFilter);
    setFiltered(resultFilter); // não alterar planets! renderizar uma variável q ora é planets, ora resultado do filtro.
  };

  return (
    <div className="filters">
      <form>
        <label htmlFor="nameFilter">
          <input
            type="text"
            name="nameFilter"
            placeholder="buscar por nome"
            data-testid="name-filter"
            // value={}
            onChange={ handleFilter }
          />
        </label>
      </form>
    </div>

  );
}

export default Filters;
