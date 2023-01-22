import './MovieCard.css';
import { useLocation } from 'react-router-dom';
import React from 'react';
import MovieButton from '../MovieButton/MovieButton';
import { URL_BASE_MOVIES } from '../../utils/consts';

function MovieCard({
  card, saveMovie, deleteMovie, allSavedMovies,
}) {
  const currentPath = useLocation().pathname;
  const [isLiked, setIsLiked] = React.useState();

  React.useEffect(() => {
    if (currentPath === '/movies') {
      const like = JSON.parse(localStorage.allSavedMovies)
        .find((item) => item.movieId === card.id || item.id === card.id);
      setIsLiked(like);
    }
  }, [allSavedMovies]);

  function calculateDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = (duration % 60) < 10
      ? `0${duration % 60}`
      : duration % 60;

    return hours
      ? `${hours}ч${minutes}м`
      : `0ч${minutes}м`;
  }

  function getCardUrl() {
    if (card.id) {
      return `${URL_BASE_MOVIES}/${card.image.url}`;
    }
    return card.image;
  }

  function handleClick() {
    deleteMovie(card);
  }

  return (
    <li className="movie-item">
      <figure className="movie-card__card">
        <a className="movie-card__trailer-link" href={card.trailerLink} target="blank">
          <img
            className="movie-card__image"
            src={currentPath === '/movies' ? `${URL_BASE_MOVIES}/${card.image.url}` : getCardUrl()}
            alt={card.nameRU}
          />
        </a>
        <figcaption className="movie-card__info">
          <div className="movie-card__title-wrapper">
            <h2 className="movie-card__title">{card.nameRU}</h2>
            <p className="movie-card__duration">{calculateDuration(card.duration)}</p>
          </div>

          {currentPath === '/saved-movies'
            ? (
              <button
                type="button"
                onClick={handleClick}
                className="movie-card__remove"
                aria-label="Удалить из сохранённых"
              />
            )
            : (
              <MovieButton
                card={isLiked ? { ...card, _id: isLiked._id } : card}
                saveMovie={saveMovie}
                deleteMovie={deleteMovie}
                isLiked={!!isLiked}
              />
            )}
        </figcaption>
      </figure>
    </li>
  );
}

export default MovieCard;
