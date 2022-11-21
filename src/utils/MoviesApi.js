import { URL_MOVIES } from './consts';

class MoviesApi {
  constructor({ moviesUrl, headers }) {
    this._moviesUrl = moviesUrl;
    this._headers = headers;
  }

  getMovies() {
    return fetch(this._moviesUrl, {
      method: 'GET',
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(new Error(`Ошибка: ${res.status}`));
    });
  }
}

const moviesApi = new MoviesApi({
  moviesUrl: URL_MOVIES,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;
