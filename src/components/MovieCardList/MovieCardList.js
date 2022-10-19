import './MovieCardList.css';
import { useLocation } from 'react-router-dom';
import MovieCard from '../MovieCard/MovieCard';
import cardPath from '../../TestCard/2.jpg';

function MovieCardList() {
  const currentPath = useLocation().pathname;
  const movieCardsTest = [
    {
      id: 0,
      cardPath,
      title: '33 слова о дизайне',
      duration: '1ч42м',
    },
    {
      id: 1,
      cardPath,
      title: '33 слова о дизайне',
      duration: '3ч08м',
    },
    // {
    //   id: 2,
    //   cardPath,
    //   title: '33 слова о дизайне',
    //   duration: '3ч09м',
    // },
    // {
    //   id: 3,
    //   cardPath,
    //   title: '33 слова о дизайне',
    //   duration: '3ч09м',
    // },
    // {
    //   id: 4,
    //   cardPath,
    //   title: '33 слова о дизайне',
    //   duration: '3ч09м',
    // },
    // {
    //   id: 5,
    //   cardPath,
    //   title: '33 слова о дизайне',
    //   duration: '3ч09м',
    // },
    // {
    //   id: 6,
    //   cardPath,
    //   title: '33 слова о дизайне',
    //   duration: '3ч09м',
    // },
    // {
    //   id: 7,
    //   cardPath,
    //   title: '33 слова о дизайне',
    //   duration: '3ч09м',
    // },
    // {
    //   id: 8,
    //   cardPath,
    //   title: '33 слова о дизайне',
    //   duration: '3ч09м',
    // },
    // {
    //   id: 9,
    //   cardPath,
    //   title: '33 слова о дизайне',
    //   duration: '3ч09м',
    // },
    // {
    //   id: 10,
    //   cardPath,
    //   title: '33 слова о дизайне',
    //   duration: '3ч09м',
    // },
    // {
    //   id: 11,
    //   cardPath,
    //   title: '33 слова о дизайне',
    //   duration: '3ч09м',
    // },
    // {
    //   id: 12,
    //   cardPath,
    //   title: '33 слова о дизайне',
    //   duration: '3ч09м',
    // },
    // {
    //   id: 13,
    //   cardPath,
    //   title: '33 слова о дизайне',
    //   duration: '3ч09м',
    // },
    // {
    //   id: 14,
    //   cardPath,
    //   title: '33 слова о дизайне',
    //   duration: '3ч09м',
    // },
    // {
    //   id: 15,
    //   cardPath,
    //   title: '33 слова о дизайне',
    //   duration: '3ч09м',
    // },
  ];
  function handleMovie(evt) {
    console.log(evt);
  }
  return (
    <>
      <ul className={`card-list ${currentPath === '/saved-movies' ? 'card-list_saved-movies' : ''}`}>
        {
          movieCardsTest.map((movieCard) => (
            <MovieCard
              key={movieCard.id}
              cardPath={cardPath}
              title={movieCard.title}
              duracion={movieCard.duration}
            />
          ))
        }
      </ul>
      {currentPath === '/movies'
      && <button type="button" aria-label="Кнопка ещё" onClick={handleMovie} className="more-button">Ещё</button>}
    </>
  );
}

export default MovieCardList;
