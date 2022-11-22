import React from 'react';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MovieCardList from '../MovieCardList/MovieCardList';

function SavedMoviePage({
  isLogin,
  searchedMovies,
  deleteMovie,
  searchMovies,
  changeDuration,
  isShort,
  allSavedMovies,
  setMovie,
  setDuration,
}) {
  React.useEffect(() => {
    setMovie();
  }, [allSavedMovies]);

  React.useEffect(() => {
    setDuration();
  }, []);

  return (
    <>
      <Header
        isLogin={isLogin}
      />
      <main className="main">
        <SearchForm
          searchMovies={searchMovies}
          changeDuration={changeDuration}
          isShort={isShort}
        />
        <MovieCardList
          isSavedMovies={allSavedMovies}
          searchedMovies={searchedMovies}
          deleteMovie={deleteMovie}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMoviePage;
