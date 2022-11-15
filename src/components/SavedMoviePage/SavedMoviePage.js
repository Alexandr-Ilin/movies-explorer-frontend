import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MovieCardList from '../MovieCardList/MovieCardList';

function SavedMoviePage({
  isLogin, deleteMovie, searchMovies, changeDuration, isShort, searchedMovies,
}) {
  console.log(searchedMovies, 'movieSavedPage');
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
          // isSavedMovies={isSavedMovies}
          searchedMovies={searchedMovies}
          deleteMovie={deleteMovie}
        />
      </main>
      <Footer />
    </>
  );
}

export default SavedMoviePage;
