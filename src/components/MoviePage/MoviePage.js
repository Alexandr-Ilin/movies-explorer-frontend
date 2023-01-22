import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MovieCardList from '../MovieCardList/MovieCardList';

function MoviePage({
  isLogin,
  searchedMovies,
  searchMovies,
  changeDuration,
  isShort,
  saveMovie,
  deleteMovie,
  allSavedMovies,
  renderInfoMessage,
}) {
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
          searchedMovies={searchedMovies}
          saveMovie={saveMovie}
          deleteMovie={deleteMovie}
          allSavedMovies={allSavedMovies}
        />
      </main>
      <Footer />
    </>
  );
}

export default MoviePage;
