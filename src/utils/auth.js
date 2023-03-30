const BASE_AUTH_URL = "https://auth.nomoreparties.co";

function checkResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

export function registration(email, password) {
  return fetch(`${BASE_AUTH_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponseData);
}

export function login(email, password) {
  return fetch(`${BASE_AUTH_URL}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponseData);
}

export function getToken(jwt) {
  return fetch(`${BASE_AUTH_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  }).then(checkResponseData);
}
