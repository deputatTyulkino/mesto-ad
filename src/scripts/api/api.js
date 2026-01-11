import { api } from "./config.js";

const getResponseData = (res) => {
  return res.status === 200 ? res.data : Promise.reject(`Ошибка: ${res.status}`);
};

export const getUserInfo = async () => {
  const res = await api.get('/users/me')
  return getResponseData(res);
};

export const getCardList = async () => {
  const res = await api.get('/cards')
  return getResponseData(res);
};

export const setUserInfo = async ({ name, about }) => {
  const res = await api.patch('/users/me', { name, about })
  return getResponseData(res);
};

export const setAvatar = async (avatar) => {
  const res = await api.patch('users/me/avatar', { avatar })
  return getResponseData(res);
};

export const addCard = async ({ name, link }) => {
  const res = await api.post('/cards', { name, link })
  return getResponseData(res);
};

export const deleteCard = async (id) => {
  const res = await api.delete(`/cards/${id}`)
  return getResponseData(res);
};

export const changeLikeCardStatus = async (cardID, isLiked) => {
  const res = await api({
    method: isLiked ? "PUT" : "DELETE",
    url: `/cards/likes/${cardID}`,
  })
  return getResponseData(res);
};
