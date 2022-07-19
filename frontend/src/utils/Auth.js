const BASE_URL = `${window.location.protocol}${process.env.REACT_APP_API_URL || '//localhost:3001'}`;

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  } else {
    return Promise.reject(res.status)
  }
}

export function registerAPI (email, password) {
  return fetch (`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(checkResponse)
}

export function loginAPI (email, password) {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then(checkResponse)
}

export function checkTokenAPI () {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    }
  })
  .then((res) => {
    if (res.ok) {
      return res
    } else {
      return Promise.reject(res.status)
    }
  })
  .then(res => {
    if (res.status !== 401) {
      return res
    }
  })
  .then(checkResponse)
}

export function logoutAPI () {
  return fetch(`${BASE_URL}/signout`, {
    method: 'GET',
    credentials: 'include'
  })
  .then(checkResponse)
}

export function checkCookieWithTokenAPI() {
  return fetch(`${BASE_URL}/checkCookie`, {
    method: 'GET',
    credentials: 'include'
  })
  .then((res) => {
    if (res.ok) {
      return res;
    } else {
      return Promise.reject(res.status);
    }
  })
}