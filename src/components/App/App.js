// import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
// import NotFoundPage from '../NotFoundPage/NotFounPage';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

// const history = useNavigate();

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          exact
          path="/"
          element={(
            <>
              <Header />
              <Main />
              <Footer />
            </>
          )}
        />
        <Route
          path="/signin"
          element={<Main />}
        />
        {/* <Footer /> */}
      </Routes>
      {/* <NotFoundPage /> */}
    </div>
  );
}

export default App;
