/* eslint-disable no-underscore-dangle */
class Api {
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
      return res.json();
    }
    return Promise.reject(new Error(`Ошибка: ${res.status}`));
  }

  getUserData() {
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
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
