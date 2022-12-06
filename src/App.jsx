import React from 'react';
import './App.css';

import Header from './components/Header';
import Table from './components/Table';
import FilterName from './components/FilterName';
import FilterNum from './components/FilterNum';
import FilterOrder from './components/FilterOrder';

function App() {
  return (
    <div className="app">
      <Header />
      <form>
        <FilterName />
        <FilterNum />
        <FilterOrder />
      </form>
      <Table />
    </div>
  );
}

export default App;
