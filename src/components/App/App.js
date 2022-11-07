import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import React, { useState } from 'react';
import CurrentUserContext from '../../context/CurrentUserContext';
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
import MainApi from '../../utils/MainApi';
import { register, exitUserProfile, authorize } from '../../utils/auth';
// import getUserData from '../../utils/MainApi';

function App() {
  const path = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  // все фильмы
  const [allMovies, setAllMovies] = useState([]);

  // все короткие фильмы
  // const [allShortMovies, setAllShortMovies] = useState([]);

  // фильмы после поиска
  const [searchedMovies, setSearchedMovies] = useState(null);
  // загрузка фильмов по запросу
  const [isClientSearching, setIsClientSearching] = useState(false);

  function searchShortMovies(movies) {
    return movies.filter((movie) => movie.duration <= 40);
  }

  const getAllMovies = () => moviesApi
    .getMovies()
    .then((movies) => {
      setAllMovies(movies);
      setIsClientSearching(true);
      console.log(isClientSearching, 'searching-client');
      return movies;
    })
    .catch((err) => {
      console.log(err, 'err');
    });

  // получаем данные пользователя
  React.useEffect(() => {
    MainApi
      .getUserData()
      .then((res) => {
        setIsLogin(true);
        setCurrentUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLogin]);

  // React.useEffect(() => searchedMovies === 0 && setSearchedMovies([]));

  const searchMovies = (movies, searchValue, isShort) => {
    const searchList = movies.filter((movie) => {
      const movieNameRU = movie.nameRU.toLowerCase();
      const movieNameEN = movie.nameEN.toLowerCase();
      const resultRU = movieNameRU.includes(searchValue.toLowerCase());
      const resultEN = movieNameEN.includes(searchValue.toLowerCase());

      return resultRU || resultEN;
    });

    if (isShort) {
      setIsClientSearching(true);
      console.log(isClientSearching, 'isShort');
      localStorage.setItem('moviesSearch', JSON.stringify(searchShortMovies(searchList)));
      setSearchedMovies(searchShortMovies(searchList));
      // добавляем в localStorage
      return;
      //  return searchShortMovies(searchList);
    }
    setIsClientSearching(true);
    setSearchedMovies(searchList);
    localStorage.setItem('movieSearch', JSON.stringify(searchList));
    console.log(isClientSearching, 'islong');

    // добавляем в localStorage
    // return searchList;
  };

  const handleSearchMovies = (searchValue, isShort) => {
    if (!allMovies.length) {
      getAllMovies()
        .then((movies) => {
          console.log(movies, 'movies');
          searchMovies(movies, searchValue, isShort);
        })
        .catch((err) => console.log(err));
    }
    console.log(allMovies, 'allmovies,app');
    searchMovies(allMovies, searchValue, isShort);
  };

  const handleLogin = (email, password) => authorize(email, password)
    .then(() => {
      setIsLogin(true);
      path('/movies');
    })
    .catch((err) => {
      console.log(email, password, 'ошибка');
      console.log(err);
    });

  const handleRegister = (name, email, password) => register({ name, email, password })
    .then(() => {
      handleLogin(email, password);
      console.log('register');
    })
    .catch((err) => {
      console.log(err);
    });

  const handleUpdateUser = (name, email) => {
    MainApi
      .changeUserData(name, email)
      .then((data) => {
        console.log(name, email, 'ppppp');
        setCurrentUser(data.data);
      })
      .catch((err) => {
        console.log(name, email);
        console.log(err);
      });
  };

  const signOut = () => {
    exitUserProfile()
      .then(() => {
        setIsLogin(false);
        setCurrentUser({});
        localStorage.clear();
        path('/signin');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const hendleIsShort

  const debug = () => JSON.parse(localStorage.moviesSearch);

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
                handleUpdateUser={handleUpdateUser}
              />
          )}
          />
          <Route
            path="/movies"
            element={(
              <MoviePage
                isLogin={isLogin}
                searchedMovies={searchedMovies === null ? debug() : searchedMovies}
                searchMovies={handleSearchMovies}
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
    </CurrentUserContext.Provider>
  );
}

export default App;
