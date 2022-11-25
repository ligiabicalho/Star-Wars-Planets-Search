import React, { useContext } from 'react';
import AppContext from '../context/AppContext';

function Filters() {
  const { planets, setFiltered, selected,
    setSelected, filteredPlanets } = useContext(AppContext);
  // const [search, setSearch] = useState(''); => Preciso MESMO ter esses dados no estado???

  const handleFilterName = ({ target }) => {
    // if else => setFiltered(planets) ??
    const resultFilter = planets.filter((planet) => planet.name.toLowerCase()
      .includes(target.value.toLowerCase()));
    console.log('filter name', resultFilter);
    setFiltered(resultFilter); // não alterar planets! renderizar uma variável q ora é planets, ora resultado do filtro.
  };

  const handleSelected = ({ target }) => {
    setSelected((prevSelet) => ({ ...prevSelet, [target.name]: target.value }));
  };

  // const filterSelectedumn = () => {
  // };

  const handleFilterColumn = () => {
    const { column, value, comparison } = selected;
    if (comparison === 'maior que') {
      setFiltered(planets.filter((p) => Number(p[column]) > Number(value)));
    } else if (comparison === 'menor que') {
      setFiltered(planets.filter((p) => Number(p[column]) < Number(value)));
    } else {
      setFiltered(planets.filter((p) => Number(p[column]) === Number(value)));
    }
  };

  return (
    <div className="filters">
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
        <select
          name="column"
          data-testid="column-filter"
          value={ selected.column }
          onChange={ handleSelected }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
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
          onClick={ handleFilterColumn }
        >
          Filtrar
        </button>
      </form>
    </div>

  );
}

export default Filters;
