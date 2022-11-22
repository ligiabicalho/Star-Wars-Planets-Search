import React from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import StarWarsContext from './context/StarWarsContext';

function App() {
  return (
    <StarWarsContext.Provider value={ { dados: dadosAPI } }>
      <Header />
      <Table />
    </StarWarsContext.Provider>
  );
}

export default App;
