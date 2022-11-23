import React from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import AppProvider from './context/AppProvider';

function App() {
  return (
    <AppProvider>
      <Header />
      <Table />
    </AppProvider>
  );
}

export default App;
