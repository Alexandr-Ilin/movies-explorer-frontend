import './SavedMoviePage.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
import MovieCardList from '../MovieCardList/MovieCardList';

function MoviePage({ isLogin }) {
  return (
    <>
      <Header
        isLogin={isLogin}
      />
      <main className="main">
        <SearchForm />
        <MovieCardList />
      </main>
      <Footer />
    </>
  );
}

export default MoviePage;
