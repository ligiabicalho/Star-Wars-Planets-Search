import React from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import FilterName from './components/FilterName';
import FilterNum from './components/FilterNum';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <Header />
      <FilterName />
      <FilterNum />
      <Table />
    </AppProvider>
  );
}

export default App;
