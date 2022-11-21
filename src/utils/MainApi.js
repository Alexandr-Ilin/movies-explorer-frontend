import { URL_BASE, URL_BASE_MOVIES } from './consts';

class MainApi {
  constructor({
    baseUrl,
    baseMoviesUrl,
    headers,
  }) {
    this._baseMoviesUrl = baseMoviesUrl;
    this._baseUrl = baseUrl;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._moviesUrl = `${this._baseUrl}/movies`;
    this._headers = headers;
  }

  static _checkResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(res.status));
  };

  getUserData() {
    return fetch('https://api.diplom.ilin.nomoredomains.sbs/users/me', {
      headers: this._headers,
      credentials: 'include',
    })
      .then(MainApi._checkResponse);
  }

  //  отправка данных пользователя на сервер
  changeUserData(email, name) {
    return fetch(this._userUrl, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        name,
      }),
    })
      .then(MainApi._checkResponse);
  }

  saveClientMovie({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    id,
  }) {
    return fetch(this._moviesUrl, {
      method: 'POST',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        country,
        director,
        duration,
        year,
        description,
        image: `${this._baseMoviesUrl}/${image.url}`,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail: `${this._baseMoviesUrl}/${image.formats.thumbnail.url}`,
        // thumbnail,
        movieId: id,
      }),
    })
      .then(MainApi._checkResponse);
  }

  getClientMovies() {
    return fetch(this._moviesUrl, {
      headers: this._headers,
      credentials: 'include',
    })
      .then(MainApi._checkResponse);
  }

  deleteClientMovie(_id) {
    return fetch(`${this._moviesUrl}/${_id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then(MainApi._checkResponse);
  }
}

const mainApi = new MainApi({
  baseUrl: URL_BASE,
  baseMoviesUrl: URL_BASE_MOVIES,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default mainApi;
