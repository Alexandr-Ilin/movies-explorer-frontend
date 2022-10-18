import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import NotFoundPage from '../NotFoundPage/NotFounPage';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import MoviePage from '../MoviePage/MoviePage';
import SavedMoviePage from '../SavedMoviePage/SavedMoviePage';
import Preloader from '../Preloader/Preloader';

function App() {
  const history = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const handleLogin = () => {
    setIsLogin(true);
    history('/movies');
  };

  const signOut = () => {
    setIsLogin(false);
    history('/');
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
          element={<Register />}
        />
        <Route
          path="/preloader"
          element={<Preloader />}
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
