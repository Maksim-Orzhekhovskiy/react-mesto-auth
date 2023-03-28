export class Api {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
    this._headers = this._options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getInitialCards = () => {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  };

  getUserData = () => {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  };

  editAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((res) => this._getResponseData(res));
  }

  editProfile(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.job,
      }),
    }).then((res) => this._getResponseData(res));
  }

  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  addCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  deleteCardLike(data) {
    return fetch(`${this._baseUrl}/cards/likes/${data}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  changeLikeCardStatus = (cardId, isLiked) => {
    const method = isLiked ? "PUT" : "DELETE";
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method,
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  };
}

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-59",
  headers: {
    authorization: "3a939233-02b1-4b5c-aee2-f215c7cde9ac",
    "Content-Type": "application/json",
  },
});

export default api;
