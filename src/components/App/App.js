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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedRouteAuth from '../ProtectedRoute/ProtectedRouteAuth';
import Preloader from '../Preloader/Preloader';

function App() {
  const path = useNavigate();

  const [currentUser, setCurrentUser] = useState({});

  const [isLogin, setIsLogin] = useState(false);

  // все фильмы
  const [allMovies, setAllMovies] = useState([]);

  // все короткие фильмы
  // const [allShortMovies, setAllShortMovies] = useState([]);

  // фильмы после поиска, в результате поиска среди всех фильмов
  const [searchedMovies, setSearchedMovies] = useState(null);

  // состояние кнопки выбора длительности фильмов
  const [isShort, setIsShort] = useState({ value: true });

  // загрузка фильмов по запросу - это непонятно зачем!!!!
  // const [isClientSearching, setIsClientSearching] = useState(false);

  // загрузка результата поиска в сохраненных пользователем фильмов
  const [searchedSavedMovies, setSearchedSavedMovies] = useState(null);

  // состояние кнопки выбора длительности фильмов на странице выбраных фильмов, но это не нужно
  const [isSavedMoviesShort, setIsSavedMoviesShort] = useState({ value: true });

  // Фильмы сохраненные пользователем
  const [isSavedMovies, setIsSavedMovies] = useState([]);

  function searchShortMovies(movies) {
    return movies.filter((movie) => movie.duration <= 40);
  }
  // const path = useNavigate( )

  // console.log(searchedSavedMovies);

  const getAllMovies = () => moviesApi
    .getMovies()
    .then((movies) => {
      setAllMovies(movies);
      // setIsClientSearching(true);
      // console.log(isClientSearching, 'searching-client');
      return movies;
    })
    .catch((err) => {
      console.log(err, 'err');
    });

  // получаем данные пользователя
  React.useEffect(() => {
    // if (isLogin) {
    MainApi
      .getUserData()
      .then((res) => {
        console.log(res, 'userData');
        setIsLogin(true);
        setCurrentUser(res.data);
        localStorage.setItem('isLogin', true);
        // здесь
        // path('/saved-movies');
      })
      .catch((err) => {
        console.log(err);
      });

    // MainApi.getClientMovies()
    //   .then((res) => {
    //     console.log('обращение к серверу');
    //     setIsSavedMovies(res);
    //     // searchedSavedMovies === null ? setSearchedSavedMovies(res) : searchedSavedMovies;
    //     localStorage.setItem('moviesSavedSearch', JSON.stringify(res));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // }
  }, []);

  React.useEffect(() => {
    // if (isLogin) {
    MainApi.getClientMovies()
      .then((res) => {
        console.log('обращение к серверу');
        // все сохраненные фильмы
        setIsSavedMovies(res);
        // searchedSavedMovies === null ? setSearchedSavedMovies(res) : searchedSavedMovies;
        // localStorage.setItem('searchedSavedMovies', JSON.stringify(res));
      })
      .catch((err) => {
        console.log(err);
      });
    // }
  }, [isLogin]);

  // React.useEffect(() => {

  // });

  const searchMovies = (movies, searchValue, short, savedMoviePage) => {
    console.log(savedMoviePage, 'savedMoviePage, app');
    const searchList = movies.filter((movie) => {
      const movieNameRU = movie.nameRU.toLowerCase();
      const movieNameEN = movie.nameEN.toLowerCase();
      const resultRU = movieNameRU.includes(searchValue.toLowerCase());
      const resultEN = movieNameEN.includes(searchValue.toLowerCase());

      return resultRU || resultEN;
    });
    if (!savedMoviePage) {
      localStorage.setItem('moviesSearch', JSON.stringify(short.value
        ? searchShortMovies(searchList)
        : searchList));
      localStorage.setItem('moviesDuration', JSON.stringify(isShort));
      localStorage.setItem('searchValue', searchValue);
      setSearchedMovies(short.value ? searchShortMovies(searchList) : searchList);
      return;
    }

    localStorage.setItem('moviesSavedSearch', JSON.stringify(short.value
      ? searchShortMovies(searchList) : searchList));
    localStorage.setItem('moviesSavedDuration', JSON.stringify(isSavedMoviesShort));
    localStorage.setItem('searchSavedValue', searchValue);
    setSearchedSavedMovies(short.value ? searchShortMovies(searchList) : searchList);
  };

  const handleSearchMovies = (searchValue) => {
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

  const handleSearchSavedMovies = (searchSavedMoviesValue, savedMoviePage) => {
    console.log(searchSavedMoviesValue, 'здеся');
    searchMovies(isSavedMovies, searchSavedMoviesValue, isSavedMoviesShort, savedMoviePage);
  };

  const handleLogin = (email, password) => authorize(email, password)
    .then((result) => {
      console.log(result, 'fhhfhfhfhfh');
      setIsLogin(true);
      // не влияет
      console.log('я здесь был');
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
        setCurrentUser(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // выход из аккаунта
  const signOut = () => {
    exitUserProfile()
      .then(() => {
        setIsLogin(false);
        setCurrentUser({});
        setIsSavedMovies([]);
        setSearchedMovies(null);
        setSearchedSavedMovies(null);
        localStorage.clear();
        path('/signin');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // const hendleIsShort
  const changeDuration = (savedMoviePage) => {
    if (savedMoviePage) {
      setIsSavedMoviesShort({ value: !isSavedMoviesShort.value });
    }
    setIsShort({ value: !isShort.value });
  };

  function getClientSearchDuration() {
    const short = localStorage.getItem('moviesDuration');
    // debug;
    if (short === null) {
      setIsShort({ value: true });
      return;
    }
    setIsShort(JSON.parse(localStorage.moviesDuration));
  }

  function getClientSearchedMovies() {
    const movies = localStorage.getItem('moviesSearch');
    if (movies === null) {
      setSearchedMovies([]);
      return;
    }
    setSearchedMovies(JSON.parse(localStorage.moviesSearch));
  }

  // если не было запроса, выводит сохраненный запрос
  function getSearchData() {
    getClientSearchDuration();
    getClientSearchedMovies();
  }

  const saveMovie = (card) => {
    console.log(card, 'это в апп');
    MainApi
      .saveClientMovie(card)
      .then((savedMovie) => {
        setIsSavedMovies([savedMovie, ...isSavedMovies]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteMovie = (card) => {
    console.log(card, 'card-delete ');
    console.log(card._id, 'delete');
    MainApi.deleteClientMovie(card._id)
      .then(() => {
        const newSavedMovies = isSavedMovies.filter((item) => (item._id !== card._id));
        setIsSavedMovies(newSavedMovies);
        const newSearchedSavedMovies = searchedSavedMovies.filter(
          (item) => (item._id !== card._id),
        );
        setSearchedSavedMovies(newSearchedSavedMovies);
        localStorage.setItem('moviesSavedSearch', JSON.stringify(newSearchedSavedMovies));

        // setIs;
      })
      .catch((err) => console.log(err));
  };

  // function getClientSearchedSavedMovies() {
  //   const movies = localStorage.getItem('moviesSavedSearch');
  //   if (movies === null) {
  //     // console.log(isSavedMovies, 'isSaved;999999999');
  //     // непонятно
  //     setSearchedSavedMovies(isSavedMovies);

  //     return isSavedMovies;
  //   }
  //   console.log('попал вот сюда');
  //   return JSON.parse(localStorage.moviesSavedSearch);
  // }

  function getClientSearchSavedDuration() {
    const short = localStorage.getItem('moviesSavedDuration');
    // debug;
    if (short === null) {
      setIsShort({ value: true });
      return;
    }
    setIsSavedMoviesShort(JSON.parse(localStorage.moviesSavedDuration));
  }

  function getClientSearchedSavedMovies() {
    const movies = localStorage.getItem('moviesSavedSearch');
    if (movies === null) {
      // console.log(isSavedMovies, 'isSaved;999999999');
      // непонятно
      setSearchedSavedMovies(isSavedMovies);
      // return;
    }
    console.log('попал вот сюда');
    // setSearchedSavedMovies(JSON.parse(localStorage.moviesSavedSearch));
    // setSearchedSavedMovies(JSON.parse(localStorage.moviesSavedSearch));
    setSearchedSavedMovies(isSavedMovies);
  }

  function getSavedSearchData() {
    getClientSearchSavedDuration();
    getClientSearchedSavedMovies();
  }

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

          <Route element={<ProtectedRouteAuth isLogin={isLogin} />}>
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
          </Route>

          <Route element={<ProtectedRoute isLogin={isLogin} />}>

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
              path="/saved-movies"
              element={(
                <SavedMoviePage
                  isLogin={isLogin}
                // eslint-disable-next-line max-len
                // searchedMovies={searchedSavedMovies || JSON.parse(localStorage.allSavedMovies) || getSavedSearchData()}
                  searchedMovies={searchedSavedMovies === null
                    ? getSavedSearchData() : searchedSavedMovies}
                // searchedMovies={searchedSavedMovies === null
                //   ? JSON.parse(localStorage.moviesSavedSearch) : searchedSavedMovies}
                  deleteMovie={deleteMovie}
                  changeDuration={changeDuration}
                  searchMovies={handleSearchSavedMovies}
                  isShort={isSavedMoviesShort.value}
                />
            )}
            />

            <Route
              path="/movies"
              element={(
                <MoviePage
                  isLogin={isLogin}
                  searchedMovies={searchedMovies === null ? getSearchData() : searchedMovies}
                  searchMovies={handleSearchMovies}
                  changeDuration={changeDuration}
                  isShort={isShort.value}
                  saveMovie={saveMovie}
                  deleteMovie={deleteMovie}
                  isSavedMovies={isSavedMovies}
                />
            )}
            />
          </Route>
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

// const searchMovies = (movies, searchValue) => {
//   const searchList = movies.filter((movie) => {
//     const movieNameRU = movie.nameRU.toLowerCase();
//     const movieNameEN = movie.nameEN.toLowerCase();
//     const resultRU = movieNameRU.includes(searchValue.toLowerCase());
//     const resultEN = movieNameEN.includes(searchValue.toLowerCase());

//     return resultRU || resultEN;
//   });

//   if (isShort.value) {
//     setIsClientSearching(true);
//     console.log(isClientSearching, 'isShort');
//     localStorage.setItem('moviesSearch', JSON.stringify(searchShortMovies(searchList)));
//     localStorage.setItem('moviesDuration', JSON.stringify(isShort));
//     localStorage.setItem('searchValue', searchValue);
//     setSearchedMovies(searchShortMovies(searchList));
//     // добавляем в localStorage
//     return;
//     //  return searchShortMovies(searchList);
//   }
//   setIsClientSearching(true);

//   localStorage.setItem('moviesSearch', JSON.stringify(searchList));
//   localStorage.setItem('moviesDuration', JSON.stringify(isShort));
//   localStorage.setItem('searchValue', searchValue);
//   setSearchedMovies(searchList);

//   console.log(isClientSearching, 'islong');

//   // добавляем в localStorage
//   // return searchList;
// };
