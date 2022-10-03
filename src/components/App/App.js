import { Routes, Route } from 'react-router-dom';
import './App.css';
import NotFoundPage from '../NotFoundPage/NotFounPage';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
// import MovieCard from '../MovieCard/MovieCard';
// import MovieButton from '../MovieButton/MovieButton';
import SearchForm from '../SearchForm/SearchForm';
import MovieCardList from '../MovieCardList/MovieCardList';
import Duration from '../duracion_grid/duration';
import MoviePage from '../MoviePage/MoviePage';

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
          element={<SearchForm />}
        />
        <Route
          path="/cardlist"
          element={<MovieCardList />}
        />
        <Route
          path="/duration"
          element={<Duration />}
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
          element={<MoviePage />}
        />
        <Route
          path="/saved-movies"
          element={<MoviePage />}
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
