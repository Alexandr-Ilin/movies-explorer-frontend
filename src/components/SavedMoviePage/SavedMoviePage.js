import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MovieCardList from '../MovieCardList/MovieCardList';

function MoviePage({ isLogin, isSavedMovies }) {
  return (
    <>
      <Header
        isLogin={isLogin}
      />
      <main className="main">
        <SearchForm />
        <MovieCardList
          searchedMovies={isSavedMovies}
        />
      </main>
      <Footer />
    </>
  );
}

export default MoviePage;
