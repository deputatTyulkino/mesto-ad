const config = {
  baseUrl: "https://mesto.nomoreparties.co/v1/apf-cohort-202",
  headers: {
    authorization: "ba2038c9-2510-4068-90c2-32c8e82b434a",
    "Content-Type": "application/json",
  },
};

const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserInfo = async () => {
  const res = await fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });
  return getResponseData(res);
};

export const getCardList = async () => {
  const res = await fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
  return getResponseData(res);
};

export const setUserInfo = async ({ name, about }) => {
  const res = await fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  });
  return getResponseData(res);
};

export const setAvatar = async ({ avatar }) => {
  const res = await fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  });
  return getResponseData(res);
};

export const addCard = async ({ name, link }) => {
  const res = await fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  });
  return getResponseData(res);
};

export const deleteCard = async (id) => {
  const res = await fetch(`${config.baseUrl}/cards/${id}`, {
    method: "DELETE",
    headers: config.headers,
  });
  return getResponseData(res);
};

export const changeLikeCardStatus = async (cardID, isLiked) => {
  const res = await fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: isLiked ? "PUT" : "DELETE",
    headers: config.headers,
  });
  return getResponseData(res);
};
