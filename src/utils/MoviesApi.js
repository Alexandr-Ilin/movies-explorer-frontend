/* eslint-disable no-underscore-dangle */
import MOVIES_URL from './consts';

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
  moviesUrl: MOVIES_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default moviesApi;
