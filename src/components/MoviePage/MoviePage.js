import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MovieCardList from '../MovieCardList/MovieCardList';

function MoviePage({ isLogin, searchedMovies, searchMovies }) {
  return (
    <>
      <Header
        isLogin={isLogin}
      />
      <main className="main">
        <SearchForm
          searchMovies={searchMovies}
        />
        <MovieCardList
          searchedMovies={searchedMovies}
        />
      </main>
      <Footer />
    </>
  );
}

export default MoviePage;
