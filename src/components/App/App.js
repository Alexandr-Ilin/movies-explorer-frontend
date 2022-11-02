import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import React, { useState } from 'react';
import NotFoundPage from '../NotFoundPage/NotFounPage';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import MoviePage from '../MoviePage/MoviePage';
import SavedMoviePage from '../SavedMoviePage/SavedMoviePage';
import moviesApi from '../../utils/MoviesApi';

function App() {
  const path = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  // все фильмы
  const [allMovies, setAllMovies] = useState([]);
  // все короткие фильмы
  const [allShortMovies, setAllShortMovies] = useState([]);
  // фильмы после поиска
  const [searchedMovies, setSearchedMovies] = useState([]);

  // function getAllMovies() {
  //   moviesApi
  //     .getMovies()
  //     .then((movies) => {
  //       allMovies = movies;
  //       console.log(allMovies, '1');
  //     });
  // }

  function searchShortMovies() {
    return allMovies.filter((movie) => movie.duration <= 40);
  }

  React.useEffect(() => {
    moviesApi
      .getMovies()
      .then((movies) => {
        setAllMovies(movies);
        const shortMovies = searchShortMovies();
        setAllShortMovies(shortMovies);
        // console.log(allMovies, '1.1');
        // console.log(shortMovies, '1');
      })
      .catch((err) => {
        console.log(err, 'err');
      });
  }, []);

  // const searchMovies = (searchValue, isShort) => {
  //   // console.log(searchValue, 'app-search-value');
  //   // console.log(isShort, 'isShort');
  //   const searchList = allMovies.filter((movie) => {
  //     const movieNameRU = movie.nameRU.toLowerCase();
  //     // console.log(movieName, 'mov-name');
  //     return movieNameRU.includes(searchValue.toLowerCase());
  //   });
  //   console.log(searchList, 'searchList');
  //   setSearchedMovies(searchList);
  // };

  const searchMovies = (searchValue, isShort) => {
    const searchList = (isShort ? allShortMovies : allMovies).filter((movie) => {
      console.log(isShort);
      const movieNameRU = movie.nameRU.toLowerCase();
      const movieNameEN = movie.nameEN.toLowerCase();
      const resultRU = movieNameRU.includes(searchValue.toLowerCase());
      const resultEN = movieNameEN.includes(searchValue.toLowerCase());

      return resultRU || resultEN;
    });
    console.log(searchList, 'searchList');
    setSearchedMovies(searchList);
  };

  const handleLogin = () => {
    setIsLogin(true);
    path('/movies');
  };

  const handleRegister = () => {
    path('/signin');
  };

  const signOut = () => {
    setIsLogin(false);
    path('/');
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <Header
                isLogin={isLogin}
              />
              <Main />
              <Footer />
            </>
          )}
        />
        <Route
          path="/signin"
          element={(
            <Login
              handleLogin={handleLogin}
            />
          )}
        />
        <Route
          path="/signup"
          element={(
            <Register
              handleRegister={handleRegister}
            />
          )}
        />
        <Route
          path="/profile"
          element={(
            <Profile
              isLogin={isLogin}
              signOut={signOut}
            />
          )}
        />
        <Route
          path="/movies"
          element={(
            <MoviePage
              isLogin={isLogin}
              searchedMovies={searchedMovies}
              searchMovies={searchMovies}
            />
          )}
        />
        <Route
          path="/saved-movies"
          element={(
            <SavedMoviePage
              isLogin={isLogin}
            />
        )}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
