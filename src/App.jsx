import React from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import Filters from './components/Filters';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <Header />
      <Filters />
      <Table />
    </AppProvider>
  );
}

export default App;
