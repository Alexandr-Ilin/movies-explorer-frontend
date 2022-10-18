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

function App() {
  const path = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
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
