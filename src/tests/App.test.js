import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import AppProvider from '../context/AppProvider';
import { mockData, mockFetchAPI } from './mocks/fetchAPI';
import userEvent from '@testing-library/user-event';

describe('Teste a aplicação Star Wars Search Planets', () => {
  beforeEach(() => {
    global.fetch = jest.fn(mockFetchAPI);
  });

  const options = ['population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
    'maior que',
    'menor que',
    'igual a',
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water'];

  // const radios = [
  //   'ASC',
  //   'DSC'
  // ]

  const header = [
    'Name',
    'Rotation period',
    'Orbital period',
    'Diameter',
    'Climate',
    'Gravity',
    'Terrain',
    'Surface water',
    'Population',
    'Films',
    'Created',
    'Edited',
    'URL',
  ];

  const planets = mockData.results;
  const PLANET_NAME = 'planet-name';

  it('Verifica se tem um Header com o título da aplicação', () => {
    render(<AppProvider><App /></AppProvider >);
    const header = screen.getByRole('heading', { name: /StarWars Planets Search/i });
    expect(header).toBeInTheDocument();
  })
  it('Verifica se há uma tabela com uma linha de cabeçalho', () => {
    render(<AppProvider> <App /></AppProvider >);
    const table = screen.getByRole('table');
    const tableHeader = screen.getAllByRole('columnheader');

    expect(table).toBeInTheDocument();
    tableHeader.forEach((column, i) => expect(column).toHaveTextContent(header[i]));
  })
  it('Verifica se feita requisicao na API', () => {
    render(<AppProvider> <App /></AppProvider >);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://swapi.dev/api/planets');
  })
  it('Verifica se tem elementos para buscar por texto, filtro de colunas numéricas, ordenação e respectivos botoes', () => {
    render(<AppProvider> <App /></AppProvider >);
    const inputText = screen.getByRole('searchbox');
    const selectsColumns = screen.getAllByRole('combobox');
    const optionsSelect = screen.getAllByRole('option');
    const inputNum = screen.getByRole('spinbutton');
    const filterBtn = screen.getByRole('button', { name: 'Filtrar' });
    const radioOptionASC = screen.getByRole('radio', { name: 'Ascendente' });
    const radioOptionDSC = screen.getByRole('radio', { name: 'Descendente' });
    const orderBtn = screen.getByRole('button', { name: 'Ordenar' });


    expect(inputText).toHaveValue('');
    expect(selectsColumns).toHaveLength(3);
    optionsSelect.forEach((option, i) => expect(option).toHaveValue(options[i]));
    expect(inputNum).toHaveValue(0);
    expect(filterBtn).toBeInTheDocument();
    expect(radioOptionASC).toBeInTheDocument();
    expect(radioOptionDSC).toBeInTheDocument();
    expect(orderBtn).toBeInTheDocument();

  })
  it('Verifica se a lista de planetas é renderizada na tabela', async () => {
    render(<AppProvider> <App /></AppProvider >);
    const planetsRow = await screen.findAllByTestId(PLANET_NAME);
    expect(planetsRow).toHaveLength(10);
  })
  it('Verifica a filtragem por nome', async () => {
    render(<AppProvider> <App /></AppProvider >);
    expect(global.fetch).toHaveBeenCalled();
    const inputSearch = screen.getByRole('searchbox');
    userEvent.type(inputSearch, '');
    userEvent.type(inputSearch, 't');
    expect(inputSearch).toHaveValue('t');

    const rowsResult = await screen.findAllByRole('row');
    // await waitFor(() => expect(rowsResult).toHaveLength(3));

  })
  it('Verifica a filtragem por coluna de valor numérico', async () => {
    render(<AppProvider> <App /></AppProvider >);
    const selectColumns = screen.getAllByRole('combobox');
    const inputNum = screen.getByRole('spinbutton');
    const filterBtn = screen.getByRole('button', { name: 'Filtrar' });

    userEvent.selectOptions(selectColumns[0], ['rotation_period']);
    userEvent.selectOptions(selectColumns[1], ['igual a']);
    userEvent.type(inputNum, '24');
    userEvent.click(filterBtn);

    // const searchResult = await screen.findAllByTestId(PLANET_NAME);
    // await waitFor(() => expect(searchResult).toHaveLength(2));

    const selectedFilter = screen.getByTestId('filter');
    expect(selectedFilter).toHaveTextContent('rotation_period');

    const btnDelete = screen.getByRole('button', { name: 'X' });
    userEvent.click(btnDelete);
    expect(selectedFilter).not.toBeInTheDocument();

  })
  it('Verifica a filtragem por mais de um parâmetro numérico', () => {
    render(<AppProvider> <App /></AppProvider >);
    const selectColumns = screen.getAllByRole('combobox');
    const inputNum = screen.getByRole('spinbutton');
    const filterBtn = screen.getByRole('button', { name: 'Filtrar' });

    userEvent.selectOptions(selectColumns[0], ['population']);
    userEvent.selectOptions(selectColumns[1], ['maior que']);
    userEvent.type(inputNum, '1000');
    userEvent.click(filterBtn);

    userEvent.selectOptions(selectColumns[0], ['orbital_period']);
    userEvent.selectOptions(selectColumns[1], ['menor que']);
    userEvent.type(inputNum, '402');
    userEvent.click(filterBtn);

    const selectedFilters = screen.getAllByTestId('filter');
    expect(selectedFilters).toHaveLength(2);

    const btnDeleteAll = screen.getByRole('button', { name: 'Remover todas filtragens' });
    userEvent.click(btnDeleteAll);
    const deletedFilters = screen.queryByTestId('filter');
    expect(deletedFilters).not.toBeInTheDocument();

  })
  it.skip('Verifica', () => {
    render(<AppProvider> <App /></AppProvider >);
    const a = screen.getByRole();
    expect(a).toBeInTheDocument();
  })
  it.skip('Verifica', () => {
    render(<AppProvider> <App /></AppProvider >);
    const a = screen.getByRole();
    expect(a).toBeInTheDocument();
  })
});
