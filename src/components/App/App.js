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
import mainApi from '../../utils/MainApi';
import { register, exitUserProfile, authorize } from '../../utils/auth';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import ProtectedRouteAuth from '../ProtectedRoute/ProtectedRouteAuth';
import Preloader from '../Preloader/Preloader';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import alertErrorMessage from '../../utils/utils';
import { DURATION_SHORT, MESSAGE_UPDATE_USER, MESSAGE_FAILED_TO_FETCH } from '../../utils/consts';

function App() {
  const path = useNavigate();

  // const currentPath = useLocation().pathname;
  const [currentUser, setCurrentUser] = useState({});
  // popup InfoToolTip
  const [isInfoTooltipPopupOpen, setIsTooltipPopupOpen] = useState(false);
  // Все фильмы сохраненные пользователем
  const [allSavedMovies, setAllSavedMovies] = useState(localStorage.allSavedMovies
    ? JSON.parse(localStorage.allSavedMovies)
    : []);
  // карточки которые выводятся
  const [cardMoviesDisplay, setCardMoviesDisplay] = useState(localStorage.moviesFound
    ? JSON.parse(localStorage.moviesFound)
    : []);
  // вывод сохраненных карточек --- надо переделать
  const [cardSavedMoviesDisplay, setCardSavedMoviesDisplay] = useState([]);
  // состояние авторизации
  const [isLogin, setIsLogin] = useState(localStorage.getItem('isLogin'));
  // сообщения ошибок
  const [isInfoMessage, setIsInfoMessage] = useState(null);
  // состояние ошибок
  const [isError, setIsError] = useState(false);
  // preloader
  const [isPreloader, setIsPreloader] = useState(null);
  // редактирование профиля
  const [isEditing, setIsEditing] = useState(false);
  // длительность всех фильмов
  const [durationMovies, setDurationMovies] = useState(localStorage.durationMovies
    ? JSON.parse(localStorage.durationMovies)
    : { value: false });
  // длительность сохраненных фильмов
  const [durationSavedMovies, setDurationSavedMovies] = useState({ value: false });

  const editProfileButton = () => {
    setIsEditing(!isEditing);
  };

  const setMovie = () => {
    setCardSavedMoviesDisplay(JSON.parse(localStorage.allSavedMovies));
  };

  const setDuration = () => {
    setDurationSavedMovies({});
  };

  const resetEditingProfile = () => {
    setIsEditing(false);
    setIsInfoMessage(null);
  };

  const openPopup = () => {
    setIsTooltipPopupOpen(true);
  };

  const closePopup = () => {
    resetEditingProfile();
    setIsError(false);
    setIsTooltipPopupOpen(false);
  };

  const renderInfoMessage = (message, error) => {
    setIsError(error && error);
    setIsInfoMessage(message);
    openPopup();
  };

  function searchShortMovies(movies) {
    return movies.filter((movie) => movie.duration <= DURATION_SHORT);
  }

  const getAllMovies = () => moviesApi
    .getMovies()
    .then((movies) => movies)
    .catch(() => {
      setIsError(true);
      renderInfoMessage(MESSAGE_FAILED_TO_FETCH);
    });

  const startPreloader = () => {
    setIsPreloader(true);
  };

  const stopPreloader = () => {
    setTimeout(() => { setIsPreloader(false); }, 500);
  };

  const searchMovies = (movies, searchValue, pageSavedMovies) => {
    startPreloader();
    if (pageSavedMovies && !searchValue) {
      console.log('приходит в поиск');
      setCardSavedMoviesDisplay(durationSavedMovies.value
        ? searchShortMovies(allSavedMovies)
        : allSavedMovies);
      stopPreloader();
      return;
    }
    const searchList = movies.filter((movie) => {
      const movieNameRU = movie.nameRU.toLowerCase();
      const movieNameEN = movie.nameEN.toLowerCase();
      const resultRU = movieNameRU.includes(searchValue.toLowerCase());
      const resultEN = movieNameEN.includes(searchValue.toLowerCase());
      return resultRU || resultEN;
    });
    if (!pageSavedMovies) {
      localStorage.setItem('moviesFound', durationMovies.value
        ? JSON.stringify(searchShortMovies(searchList))
        : JSON.stringify(searchList));
      setCardMoviesDisplay(durationMovies.value
        ? searchShortMovies(searchList)
        : searchList);
      localStorage.setItem('valueSearch', searchValue);
      localStorage.setItem('durationMovies', JSON.stringify({ value: durationMovies.value }));
      stopPreloader();
      return;
    }
    setCardSavedMoviesDisplay(durationSavedMovies.value
      ? searchShortMovies(searchList)
      : searchList);
    stopPreloader();
  };

  const clearAllData = () => {
    setIsLogin(false);
    setCurrentUser({});
    setAllSavedMovies(null);
    setCardMoviesDisplay([]);
    setCardSavedMoviesDisplay([]);
    setIsInfoMessage(null);
    setDurationMovies({ value: false });
    setDurationSavedMovies({ value: false });
    setIsEditing(false);
    localStorage.clear();
    path('/');
  };

  const signOut = () => {
    startPreloader();
    clearAllData();
    exitUserProfile()
      .catch((err) => {
        localStorage.setItem('serverFailure', true);
        setIsError(true);
        setIsInfoMessage(alertErrorMessage(err));
        openPopup();
      })
      .finally(() => {
        stopPreloader();
      });
  };

  // получаем данные пользователя
  React.useEffect(() => {
    if (isLogin) {
      mainApi
        .getUserData()
        .then((res) => {
          setCurrentUser(res.data);
        })
        .catch((err) => {
          setIsError(true);
          setIsInfoMessage(alertErrorMessage(err));
          clearAllData();
          localStorage.setItem('serverFailure', true);
          openPopup();
        });
    }
    if (!isLogin && localStorage.serverFailure) {
      signOut();
    }
  }, [isLogin]);

  React.useEffect(() => {
    if (isLogin) {
      mainApi.getClientMovies()
        .then((res) => {
          localStorage.setItem('allSavedMovies', JSON.stringify(res));
          setAllSavedMovies(res);
          console.log('обращение и установка');
          // переделать
          setCardSavedMoviesDisplay(res);
        })
        .catch((err) => {
          setIsInfoMessage(alertErrorMessage(err));
          openPopup();
        });
    }
  }, [isLogin]);

  const handleSearchMovies = (valueSearch) => {
    if (!localStorage.allMovies) {
      getAllMovies()
        .then((movies) => {
          localStorage.setItem('allMovies', JSON.stringify(movies));
          searchMovies(movies, valueSearch);
        })
        .catch((err) => {
          setIsError(true);
          setIsInfoMessage(err);
          openPopup();
        });
    } else {
      searchMovies(JSON.parse(localStorage.allMovies), valueSearch);
    }
  };

  const handleSearchSavedMovies = (valueSearch, savedMoviePage) => {
    searchMovies(allSavedMovies, valueSearch, savedMoviePage);
  };

  const handleLogin = (email, password, currentPath) => {
    startPreloader();
    authorize(email, password)
      .then(() => {
        setIsLogin(true);
        localStorage.removeItem('serverFailure');
        localStorage.setItem('isLogin', true);
        path('/movies');
      })
      .catch((err) => {
        setIsError(true);
        setIsInfoMessage(alertErrorMessage(err, currentPath));
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
      })
      .catch((err) => {
        setIsError(true);
        setIsInfoMessage(alertErrorMessage(err));
        openPopup();
      })
      .finally(() => {
        stopPreloader();
      });
  };

  const handleUpdateUser = (name, email) => {
    startPreloader();
    setIsInfoMessage(null);
    mainApi
      .changeUserData(name, email)
      .then((data) => {
        setCurrentUser(data.data);
        // --- провепить ---
        setIsInfoMessage({ message: MESSAGE_UPDATE_USER });
        openPopup();
      })
      .catch((err) => {
        setIsError(true);
        setIsInfoMessage(alertErrorMessage(err));
        openPopup();
      })
      .finally(() => {
        stopPreloader();
      });
  };

  const changeDuration = (savedMoviesPage) => {
    if (savedMoviesPage) {
      setDurationSavedMovies({ value: !durationSavedMovies.value });
      return;
    }
    setDurationMovies({ value: !durationMovies.value });
  };

  function saveLocalStorage(card) {
    const arr = JSON.parse(localStorage.allSavedMovies);
    const newAllSavedMovies = [card, ...arr];
    setAllSavedMovies(newAllSavedMovies);
    localStorage.setItem('allSavedMovies', JSON.stringify(newAllSavedMovies));
  }

  const saveMovie = (card) => {
    startPreloader();
    mainApi
      .saveClientMovie(card)
      .then((res) => {
        saveLocalStorage(res);
      })
      .catch((err) => {
        setIsError(true);
        setIsInfoMessage(alertErrorMessage(err));
        openPopup();
      })
      .finally(() => {
        stopPreloader();
      });
  };

  function deleteLocalCard(card) {
    const resultAllSavedMovies = allSavedMovies
      .filter((item) => item.movieId !== card.id && item.movieId !== card.movieId);
    setAllSavedMovies(resultAllSavedMovies);

    localStorage.setItem('allSavedMovies', JSON.stringify(resultAllSavedMovies));
    const resultCardSavedMoviesDisplay = cardSavedMoviesDisplay.filter(
      (item) => ((item._id !== card._id) || (item.id !== card.id)),
    );
    setCardSavedMoviesDisplay(resultCardSavedMoviesDisplay);
  }

  const deleteMovie = (card) => {
    startPreloader();
    mainApi.deleteClientMovie(card._id)
      .then(() => {
        deleteLocalCard(card);
      })
      .catch((err) => {
        setIsError(true);
        setIsInfoMessage(alertErrorMessage(err));
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
                  isInfoMessage={isInfoMessage}
                />
              )}
            />

            <Route
              path="/signup"
              element={(
                <Register
                  handleRegister={handleRegister}
                  isInfoMessage={isInfoMessage}
                />
              )}
            />
          </Route>

          <Route element={(
            <ProtectedRoute
              isLogin={isLogin}
            />
)}
          >
            <Route
              path="/profile"
              element={(
                <Profile
                  isLogin={isLogin}
                  signOut={signOut}
                  handleUpdateUser={handleUpdateUser}
                  isInfoMessage={isInfoMessage}
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
                  deleteMovie={deleteMovie}
                  changeDuration={changeDuration}
                  searchMovies={handleSearchSavedMovies}
                  isShort={durationSavedMovies || false}
                  allSavedMovies={allSavedMovies}
                  setMovie={setMovie}
                  setDuration={setDuration}
                  renderInfoMessage={renderInfoMessage}
                />
            )}
            />

            <Route
              path="/movies"
              element={(
                <MoviePage
                  isLogin={isLogin}
                  searchedMovies={cardMoviesDisplay}
                  searchMovies={handleSearchMovies}
                  changeDuration={changeDuration}
                  isShort={durationMovies || false}
                  saveMovie={saveMovie}
                  deleteMovie={deleteMovie}
                  allSavedMovies={allSavedMovies}
                  renderInfoMessage={renderInfoMessage}
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
          result={isInfoMessage}
          onClose={closePopup}
          isError={isError}
        />
        <Preloader isPreloader={isPreloader} />
      </div>
    </CurrentUserContext.Provider>
  );
}
export default App;
