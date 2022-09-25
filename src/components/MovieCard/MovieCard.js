import './MovieCard.css';
import { useLocation } from 'react-router-dom';
import cardPath from '../../TestCard/2.jpg';
import MovieButton from '../MovieButton/MovieButton';

function MovieCard() {
  const currentPath = useLocation().pathname;
  function handleClick(evt) {
    console.log(evt);
  }
  return (
    <li className="movie-item">
      <article className="movie-card">
        <figure className="movie-card__card">
          <img
            className="movie-card__image"
            src={cardPath}
            alt="333"
          />
          <figcaption className="movie-card__info">
            <div className="movie-card__title-wrapper">
              <h2 className="movie-card__title">33 слова о дизайне</h2>
              <p className="movie-card__duration">1ч53м</p>
            </div>
            {currentPath === '/movies' && <MovieButton />}
            <button
              type="button"
              onClick={handleClick}
              className="movie-card__remove"
              aria-label="Удалить из сохранённых"
            />
          </figcaption>
        </figure>
      </article>
    </li>
  );
}

export default MovieCard;
