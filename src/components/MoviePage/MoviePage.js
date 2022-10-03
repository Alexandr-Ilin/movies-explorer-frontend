import './MoviePage.css';
import Header from '../Header/Header';
import SearchForm from '../SearchForm/SearchForm';
import Footer from '../Footer/Footer';
// import MovieCardList from '../MovieCardList/MovieCardList';

function MoviePage() {
  return (
    <>
      <Header />
      <main className="main">
        <SearchForm />
        {/* <MovieCardList /> */}

        <Footer />
      </main>
    </>
  );
}

export default MoviePage;
