import React from 'react';
import './App.css';
import AppProvider from './context/AppProvider';
import Header from './components/Header';
import Table from './components/Table';
import FilterName from './components/FilterName';
import FilterNum from './components/FilterNum';
import FilterOrder from './components/FilterOrder';

function App() {
  return (
    <AppProvider>
      <Header />
      <FilterName />
      <FilterNum />
      <FilterOrder />
      <Table />
    </AppProvider>
  );
}

export default App;
