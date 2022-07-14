// const BASE_URL = 'https://auth.nomoreparties.co';
const BASE_URL = 'http://localhost:3001';
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

// export function checkTokenAPI (token) {
//   return fetch(`${BASE_URL}/users/me`, {
//     method: 'GET',
//     credentials: 'include',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization' : `Bearer ${token}`
//     }
//   })
//   .then(checkResponse)
//   .then((res) => {
//     return res.data
//   })
// }

export function checkTokenAPI () {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization' : `Bearer ${token}`
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
    console.log('res res.status =>', res.status);
    console.log('res.ok? =>', res.ok);
    if (res.status !== 401) {
      return res
    }

  })
  .then(checkResponse)
  .then((res) => {
    console.log('res =>',res)
    return res
  })
}

export function logoutAPI () {
  return fetch(`${BASE_URL}/signout`, {
    method: 'GET',
    credentials: 'include'
  })
  .then(checkResponse)
}

export function checkCookieWithToken() {
  return fetch(`${BASE_URL}/checkCookie`, {
    method: 'GET',
    credentials: 'include'
  })
  .then((res) => {
    console.log('res in checkCookieWithToken', res);
    console.log('res.text in checkCookieWithToken', res.text);
    console.log('res.message in checkCookieWithToken', res.message);
    console.log('res.body in checkCookieWithToken', res.body);

    return res.text();
  })
  .then(text => {
    console.log('text from checkCookieWithToken =>', text);
    if(text === 'false') {
      console.log('Вернулся false');
      return false
    }
    if(text === 'true') {
      console.log('Вернулся true');
      return true
    }
  })
  // .then(checkResponse)
}