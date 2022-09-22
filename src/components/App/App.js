// import React from 'react';
// import { Route, Switch, useHistory } from 'react-router-dom';
import './App.css';
// import NotFoundPage from '../NotFoundPage/NotFounPage';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

// const history = useHistory();

function App() {
  return (
    <div className="App">
      <Main />
      <Footer />
      {/* <NotFoundPage /> */}
    </div>
  );
}

export default App;
