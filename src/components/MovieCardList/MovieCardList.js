import './MovieCardList.css';
import MovieCard from '../MovieCard/MovieCard';

function MovieCardList() {
  function handleMovie(evt) {
    console.log(evt);
  }
  return (
    <>
      <ul className="card-list">
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
        <MovieCard />
      </ul>
      <button type="button" aria-label="Кнопка ещё" onClick={handleMovie} className="more-button">Ещё</button>
    </>
  );
}

export default MovieCardList;
