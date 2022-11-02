import './MovieCardList.css';
import { useLocation } from 'react-router-dom';
// import { getMouseEventOptions } from '@testing-library/user-event/dist/utils';
import MovieCard from '../MovieCard/MovieCard';
// import cardPath from '../../TestCard/2.jpg';

function MovieCardList({ searchedMovies }) {
  console.log(searchedMovies, 'movieCardList');
  const currentPath = useLocation().pathname;
  function handleMovie(evt) {
    console.log(evt);
  }
  return (
    <>
      <article>
        <ul className={`card-list ${currentPath === '/saved-movies' ? 'card-list_saved-movies' : ''}`}>
          {
           searchedMovies.map((movieCard) => (
             <MovieCard
               key={movieCard.id}
               card={movieCard}
              //  title={movieCard.title}
              //  duracion={movieCard.duration}
             />
           ))
        }
        </ul>
      </article>
      {currentPath === '/movies'
      && <button type="button" aria-label="Кнопка ещё" onClick={handleMovie} className="more-button">Ещё</button>}
    </>
  );
}

export default MovieCardList;
