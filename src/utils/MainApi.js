class MainApi {
  constructor({
    baseUrl,
    headers,
  }) {
    this._baseUrl = baseUrl;
    this._userUrl = `${this._baseUrl}/users/me`;
    this._moviesUrl = `${this._baseUrl}/movies`;
    this._headers = headers;
  }

  // eslint-disable-next-line class-methods-use-this
  _checkResponse(res) {
    if (res.ok) {
      console.log('я пришел на регистрацию');
      return res.json();
    }
    console.log('не прошел');
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getUserData() {
    console.log('брал данные');
    return fetch(this._userUrl, {
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  //  отправка данных пользователя на сервер
  changeUserData(email, name) {
    console.log(email, name, 'change');
    return fetch(this._userUrl, {
      method: 'PATCH',
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        email,
        name,
      }),
    })
      .then(this._checkResponse);
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
        image: `https://api.nomoreparties.co/${image.url}`,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail: `https://api.nomoreparties.co/${image.formats.thumbnail.url}`,
        // thumbnail,
        movieId: id,
      }),
    })
      .then(this._checkResponse);
  }

  getClientMovies() {
    return fetch(this._moviesUrl, {
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }

  deleteClientMovie(_id) {
    return fetch(`${this._moviesUrl}/${_id}`, {
      method: 'DELETE',
      headers: this._headers,
      credentials: 'include',
    })
      .then(this._checkResponse);
  }
}

const api = new MainApi({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
