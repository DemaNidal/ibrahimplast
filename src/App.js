import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router/Router';
import './App.css';
import './styles/fonts.css';

function App() {
  return (
    <Router>
      <AppRouter />
    </Router>
  );
}

export default App;
