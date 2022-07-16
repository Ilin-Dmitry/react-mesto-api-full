class Api {
  constructor({baseUrl, headers}) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(res.status)
    }
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {headers: this._headers, credentials: 'include'})
    .then(this._checkResponse)
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, { method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {headers: this._headers,
      credentials: 'include'})
    .then(this._checkResponse)
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    })
    .then(this._checkResponse)
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: this._headers
    })
    .then(this._checkResponse)
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.addLike(id)
    } else {
      return this.deleteLike(id)
    }
  }

  setAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatar
      })
    })
    .then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`,
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;
