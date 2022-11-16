// функции которые можно вынести

// фильтрация карточек по времени
export default function searchShortMovies(movies) {
  movies.filter((movie) => movie.duration <= 40);
}

// export default
