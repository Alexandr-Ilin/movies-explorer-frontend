import { useState } from 'react';
import './MovieButton.css';

function MovieButton() {
  const [isLike, setIsLike] = useState(false);

  function handleClick() {
    setIsLike(!isLike);
  }
  return (
    <button
      className={`movie-button ${isLike ? 'movie-button_like' : ''}`}
      type="button"
      aria-label="Выбрать Фильм"
      onClick={handleClick}
    />
  );
}

export default MovieButton;
