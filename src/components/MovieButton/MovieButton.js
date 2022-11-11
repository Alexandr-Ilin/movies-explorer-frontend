// import { useState } from 'react';
import './MovieButton.css';

function MovieButton({
  // isLiked,
  card, saveMovie, deleteMovie, isLiked,
}) {
  // const [isLike, setIsLike] = useState(isLiked);
  // console.log(isLike, 'isLike');
  console.log(isLiked, 'isLiked');
  function handleClick() {
    if (!isLiked) {
      console.log(isLiked);
      saveMovie(card);
      return;
    }
    deleteMovie(card);
    // isLike ? saveCard() : deleteCard();
  }

  return (
    <button
      className={`movie-button ${isLiked ? 'movie-button_like' : ''}`}
      type="button"
      aria-label="Выбрать Фильм"
      onClick={handleClick}
    />
  );
}

export default MovieButton;
