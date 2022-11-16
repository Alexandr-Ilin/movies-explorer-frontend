import {
  Routes, Route, useNavigate,
} from 'react-router-dom';
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
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import searchShortMovies from '../../utils/utils';

function App() {
  const path = useNavigate();
  // const currentPath = useLocation().pathname;

  const [currentUser, setCurrentUser] = useState({});

  // const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin') || false);

  // все фильмы
  // const [allMovies, setAllMovies] = useState([]);

  // фильмы после поиска, в результате поиска среди всех фильмов
  // const [searchedMovies, setSearchedMovies] = useState(localStorage.getItem('moviesSearch')
  //   ? JSON.parse(localStorage.moviesSearch)
  //   : []);

  // // состояние кнопки выбора длительности фильмов
  // const [isShort, setIsShort] = useState(localStorage.getItem('duration')
  //   ? JSON.parse(localStorage.moviesDuration)
  //   : { value: true });

  // // загрузка результата поиска в сохраненных пользователем фильмов
  // eslint-disable-next-line max-len
  // const [searchedSavedMovies, setSearchedSavedMovies] = useState(localStorage.getItem('moviesSavedSearch')
  //   ? JSON.parse(localStorage.moviesSavedSearch)
  //   : []);

  // // состояние кнопки выбора длительности фильмов на странице выбраных фильмов, но это не нужно
  // const [isSavedMoviesShort, setIsSavedMoviesShort] = useState(
  //   localStorage.getItem('moviesSavedDuration')
  //     ? JSON.parse(localStorage.moviesSavedDuration)
  //     : { value: true },
  // );

  // Фильмы сохраненные пользователем все
  const [isSavedMovies, setIsSavedMovies] = useState([]);

  // popup InfoToolTip
  const [isInfoTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  // //// //// ///
  // сохраненные карточки которые выводятся
  const [cardMoviesDisplay, setCardMoviesDisplay] = useState(localStorage.moviesFound
    ? JSON.parse(localStorage.moviesFound) : []);
  const [cardSavedMoviesDisplay, setCardSavedMoviesDisplay] = useState(localStorage.moviesSavedFound
    ? JSON.parse(localStorage.movieSavedFound) : []);
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));
  // ошибки
  const [isError, setIsError] = useState(null);
  // preloader
  const [isPreloader, setIsPreloader] = useState(null);
  // редактирование профиля
  const [isEditing, setIsEditing] = useState(false);
  // длительность всех фильмов
  const [durationMovies, setDurationMovies] = useState(false);
  // длительность сохраненных фильмов
  const [durationSavedMovies, setDurationSavedMovies] = useState(false);

  const editProfileButton = () => {
    setIsEditing(!isEditing);
  };

  const resetEditingProfile = () => {
    editProfileButton();
    setIsError(null);
  };

  const openPopup = () => {
    setIsTooltipPopupOpen(true);
  };

  const closePopup = () => {
    resetEditingProfile();
    setIsTooltipPopupOpen(false);
  };

  const alertErrorMessage = (err) => (err.message === 'Failed to fetch'
    ? { message: 'На сервере произошла ошибка. Попробуйте ещё раз.' }
    : err);

  const getAllMovies = () => moviesApi
    .getMovies()
    .then((movies) => movies)
    .catch((err) => {
      console.log(err, 'err');
      setIsError(alertErrorMessage(err));
      openPopup();
    });

  const startPreloader = () => {
    setIsPreloader(true);
  };

  const stopPreloader = () => {
    setTimeout(() => { setIsPreloader(false); }, 500);
  };

  const searchMovies = (movies, searchValue, pageSavedMovies) => {
    startPreloader();

    if (!searchValue && pageSavedMovies) {
      // setIsSavedMovies(movies || []);
      stopPreloader();
      return;
    }
    console.log(movies, 'movies');
    console.log(searchValue, 'movies');
    const searchList = movies.filter((movie) => {
      const movieNameRU = movie.nameRU.toLowerCase();
      const movieNameEN = movie.nameEN.toLowerCase();
      const resultRU = movieNameRU.includes(searchValue.toLowerCase());
      const resultEN = movieNameEN.includes(searchValue.toLowerCase());

      return resultRU || resultEN;
    });
    if (!pageSavedMovies) {
      console.log(searchList, 'searchList');
      localStorage.setItem('moviesFound', localStorage.durationMovies
        ? JSON.stringify(searchShortMovies(searchList))
        : JSON.stringify(searchList));
      // localStorage.setItem('moviesDuration', JSON.stringify(isShort));
      localStorage.setItem('valueSearch', searchValue);
      // eslint-disable-next-line max-len
      // setSearchedMovies(localStorage.durationMovies ? searchShortMovies(searchList) : searchList);
      stopPreloader();
      return;
    }

    // const short = JSON.parse(localStorage.moviesSavedDuration);
    // console.log(short, 'short-Saved-movies');
    localStorage.setItem('moviesSavedFound', JSON.stringify(searchShortMovies(searchList)));
    // localStorage.setItem('moviesSavedDuration', JSON.stringify(isSavedMoviesShort));
    localStorage.setItem('valueSearchSaved', searchValue);
    // setSearchedSavedMovies(short.value ? searchShortMovies(searchList) : searchList);
    stopPreloader();
  };

  // получаем данные пользователя
  React.useEffect(() => {
    if (isLogin) {
      MainApi
        .getUserData()
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          console.log(err);
          setIsError(alertErrorMessage(err));
          openPopup();
        });
    }
  }, [isLogin]);

  React.useEffect(() => {
    if (isLogin) {
      MainApi.getClientMovies()
        .then((res) => {
          console.log(res);
          // setIsSavedMovies(res);
          localStorage.setItem('allSavedMovies', JSON.stringify(res));
        })
        .catch((err) => {
          console.log(err);
          setIsError(alertErrorMessage(err));
          openPopup();
        });
    }
  }, [isLogin]);

  const handleSearchMovies = (searchValue) => {
    // в константы все загруженные фильмы
    // const ALL_MOVIES = JSON.parse(localStorage.allMovies);
    if (!localStorage.allMovies) {
      getAllMovies()
        .then((movies) => {
          localStorage.setItem('allMovies', JSON.stringify(movies));
          searchMovies(movies, searchValue);
        })
        .catch((err) => {
          setIsError(err);
          openPopup();
        });
    }
    console.log(localStorage.allMovies ? JSON.parse(localStorage.allMovies) : []);
    searchMovies(JSON.parse(localStorage.allMovies), searchValue);
  };

  const handleSearchSavedMovies = (searchSavedMoviesValue, savedMoviePage) => {
    searchMovies(isSavedMovies, searchSavedMoviesValue, savedMoviePage);
  };

  const handleLogin = (email, password) => {
    startPreloader();
    authorize(email, password)
      .then(() => {
        setIsLogin(true);
        localStorage.setItem('isLogin', true);
        path('/movies');
      })
      .catch((err) => {
        console.log(err);
        setIsError(alertErrorMessage(err));
        openPopup();
      })
      .finally(() => {
        stopPreloader();
      });
  };
  const handleRegister = (name, email, password) => {
    startPreloader();
    register({ name, email, password })
      .then(() => {
        handleLogin(email, password);
        console.log('register');
      })
      .catch((err) => {
        setIsError(alertErrorMessage(err));
        openPopup();
      })
      .finally(() => {
        stopPreloader();
      });
  };

  const handleUpdateUser = (name, email) => {
    startPreloader();
    setIsError(null);
    MainApi
      .changeUserData(name, email)
      .then((data) => {
        setCurrentUser(data.data);
        editProfileButton();
      })
      .catch((err) => {
        console.log(err);
        setIsError(alertErrorMessage(err));
        openPopup();
      })
      .finally(() => {
        stopPreloader();
      });
  };
  // выход из аккаунта
  const signOut = () => {
    startPreloader();
    exitUserProfile()
      .then(() => {
        setIsLogin(false);
        setCurrentUser({});
        setIsSavedMovies([]);
        // setSearchedMovies(null);
        setSearchedSavedMovies(null);
        localStorage.clear();
        path('/signin');
      })
      .catch((err) => {
        console.log(err);
        setIsError(alertErrorMessage(err));
        openPopup();
      })
      .finally(() => {
        stopPreloader();
      });
  };

  // const hendleIsShort
  const changeDuration = (savedMoviePage) => {
    if (savedMoviePage) {
      setDurationSavedMovies(!durationSavedMovies);
      localStorage.setItem('durationSavedMovies', JSON.stringify({ value:  }));
    }
    setDurationMovies(!durationMovies);
    if (localStorage.durationMovies) {
      return localStorage.removeItem('durationMovies');
    }
    return localStorage.setItem('durationMovies', true);
  };

  const saveMovie = (card) => {
    startPreloader();
    MainApi
      .saveClientMovie(card)
      .then((savedMovie) => {
        setIsSavedMovies([savedMovie, ...isSavedMovies]);
      })
      .catch((err) => {
        console.log(err);
        setIsError(alertErrorMessage(err));
        openPopup();
      })
      .finally(() => {
        stopPreloader();
      });
  };

  const deleteMovie = (card) => {
    startPreloader();
    MainApi.deleteClientMovie(card._id)
      .then(() => {
        const newSavedMovies = isSavedMovies.filter((item) => (item._id !== card._id));
        setIsSavedMovies(newSavedMovies);
        const newSearchedSavedMovies = searchedSavedMovies.filter(
          (item) => (item._id !== card._id),
        );
        setSearchedSavedMovies(newSearchedSavedMovies);
        localStorage.setItem('moviesSavedSearch', JSON.stringify(newSearchedSavedMovies));
      })
      .catch((err) => {
        console.log(err);
        setIsError(alertErrorMessage(err));
        openPopup();
      })
      .finally(() => {
        stopPreloader();
      });
  };

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
                  isError={isError}
                />
              )}
            />

            <Route
              path="/signup"
              element={(
                <Register
                  handleRegister={handleRegister}
                  isError={isError}
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
                  isError={isError}
                  isEditing={isEditing}
                  editProfileButton={editProfileButton}
                  resetEditing={resetEditingProfile}
                />
               )}
            />

            <Route
              path="/saved-movies"
              element={(
                <SavedMoviePage
                  isLogin={isLogin}
                  searchedMovies={cardSavedMoviesDisplay}
                  // eslint-disable-next-line max-len
                  // searchedMovies={localStorage.getItem('moviesSavedSearch') ? JSON.parse(localStorage.moviesSavedSearch) : JSON.parse(localStorage.allSavedMovies)}
                  // ? JSON.parse(localStorage.moviesSavedSearch) :
                  //  []}
                  deleteMovie={deleteMovie}
                  changeDuration={changeDuration}
                  searchMovies={handleSearchSavedMovies}
                  isShort={durationSavedMovies}
                />
            )}
            />

            <Route
              path="/movies"
              element={(
                <MoviePage
                  isLogin={isLogin}
                  searchedMovies={cardMoviesDisplay}
                  // searchedMovies={localStorage.getItem('moviesFound')
                  //   ? JSON.parse(localStorage.moviesFound)
                  //   : []}
                  searchMovies={handleSearchMovies}
                  changeDuration={changeDuration}
                  isShort={durationMovies}
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
        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          result={isError}
          onClose={closePopup}
        />
        <Preloader isPreloader={isPreloader} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
