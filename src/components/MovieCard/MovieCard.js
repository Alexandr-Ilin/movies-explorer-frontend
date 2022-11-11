import './MovieCard.css';
import { useLocation } from 'react-router-dom';
import MovieButton from '../MovieButton/MovieButton';

function MovieCard({
  card, saveMovie, deleteMovie, isSaved,
}) {
  console.log(card, 'card');

  const savedMovie = () => isSaved.find((item) => item.movieId === card.id);
  const savedCard = savedMovie();
  console.log(savedCard, 'savedCard');

  // const newCard = {...card, savedCard._id}
  // const abc = saveMovie();
  // console.log(abc, 'jjjjjjjj');
  // console.log(savedMovie(), 'hhhhhhhhh');
  // isSaved.forEach((item) => {if (item.movieId === card.id) {card._id = item._id}}}

  console.log(savedMovie(), 'isSavedMooooooo');
  function calculateDuration(duration) {
    const hours = Math.floor(duration / 60);
    const minutes = (duration % 60) < 10
      ? `0${duration % 60}`
      : duration % 60;

    return hours
      ? `${hours}ч${minutes}м`
      : `0ч${minutes}м`;
  }

  const currentPath = useLocation().pathname;
  //  console.log(card, 'card');
  // debugger;
  function handleClick(evt) {
    console.log(evt);
    deleteMovie();
  }

  return (
    <li className="movie-item">
      <figure className="movie-card__card">
        <a className="movie-card__trailer-link" href={card.trailerLink} target="blank">
          <img
            className="movie-card__image"
            src={`https://api.nomoreparties.co/${card.image.url}`}
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
                // card={card}
                card={savedCard ? { ...card, _id: savedCard._id } : card}
                saveMovie={saveMovie}
                deleteMovie={deleteMovie}
                isLiked={!!savedMovie()}
              />
            )}
        </figcaption>
      </figure>
    </li>
  );
}

export default MovieCard;
