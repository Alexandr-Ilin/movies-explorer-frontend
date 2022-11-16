import './MovieCard.css';
import { useLocation } from 'react-router-dom';
import MovieButton from '../MovieButton/MovieButton';

function MovieCard({
  card, saveMovie, deleteMovie,
}) {
  const currentPath = useLocation().pathname;

  console.log(card, 'cardergg');

  const getSavedCard = () => {
    // в константы!!!!!!!!!!!!
    const ALL_SAVED_MOVIES = JSON.parse(localStorage.allSavedMovies);
    console.log(ALL_SAVED_MOVIES);
    if (currentPath === '/movies') {
      return ALL_SAVED_MOVIES.find((item) => item.movieId === card.id);
    }
    return card;
  };

  const savedCard = getSavedCard();
  console.log(savedCard);

  function calculateDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = (duration % 60) < 10
      ? `0${duration % 60}`
      : duration % 60;

    return hours
      ? `${hours}ч${minutes}м`
      : `0ч${minutes}м`;
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
            src={currentPath === '/movies' ? `https://api.nomoreparties.co/${card.image.url}` : card.image}
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
                card={savedCard ? { ...card, _id: savedCard._id } : card}
                saveMovie={saveMovie}
                deleteMovie={deleteMovie}
                isLiked={!!savedCard}
              />
            )}
        </figcaption>
      </figure>
    </li>
  );
}

export default MovieCard;
