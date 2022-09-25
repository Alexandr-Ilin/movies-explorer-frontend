// import React from 'react';
// eslint-disable-next-line no-unused-vars
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import NotFoundPage from '../NotFoundPage/NotFounPage';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MovieCard from '../MovieCard/MovieCard';
import MovieButton from '../MovieButton/MovieButton';

// const history = useNavigate();

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
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
          path="/cardbutton"
          element={<MovieButton />}
        />
        <Route
          path="/cardlist"
          element={<MovieCard />}
        />
        <Route
          path="/signin"
          element={<Login />}
        />
        <Route
          path="/signup"
          element={<Register />}
        />
        <Route
          path="/profile"
          element={<Profile />}
        />
        <Route
          path="/movies"
          element={<MoviesCardList />}
        />
        <Route
          path="/saved-movies"
          element={<MoviesCardList />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
      {/* <NotFoundPage /> */}
    </div>
  );
}

export default App;
