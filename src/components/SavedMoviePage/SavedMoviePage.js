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
  renderInfoMessage,
}) {
  React.useEffect(() => {
    setMovie();
    console.log('работает эфект');
  }, []);

  React.useEffect(() => {
    setDuration();
    console.log('работает эфект длительности');
  }, []);

  // React.useEffect(() => {
  //   // console.log(moviesSavedSearch, 'saved --- Smovies');
  //   setDuration();
  // }, [moviesSavedSearch]);

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
          renderInfoMessage={renderInfoMessage}
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
