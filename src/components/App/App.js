import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
import NotFoundPage from '../NotFoundPage/NotFounPage';

// const history = useHistory();

function App() {
  return (
    <div className="App">
      <NotFoundPage />
    </div>
  );
}

export default App;
