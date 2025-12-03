import { getTemplateInfoString, getTemplateUserCardInfo } from "./template";

export const formatDate = (date) => new Date(date).toLocaleDateString();

export const getCountLike = (data) => data.length;

export const appendInfoString = (list, terms, descriptions) => {
  list.innerHtml = "";
  Object.entries(terms).forEach(([keyTerm, valueTerm]) => {
    list.append(createInfoString(valueTerm, descriptions[keyTerm]));
  });
};

export const createInfoString = (term, description) => {
  const infoString = getTemplateInfoString();
  infoString.querySelector(".popup__info-term").textContent = term;
  infoString.querySelector(".popup__info-description").textContent =
    description;
  return infoString;
};

export const appendUserLikes = (list, users) => {
  list.innerHtml = "";
  users.forEach((user) => {
    list.append(createUserLikes(user.name));
  });
};

export const createUserLikes = (name) => {
  const userTemplate = getTemplateUserCardInfo();
  userTemplate.textContent = name;
  return userTemplate;
};

export const createDescriptionValues = (card) => {
  return {
    countLikes: getCountLike(card.likes),
    owner: card.owner.name,
    createdAt: formatDate(card.createdAt),
    name: card.name,
  };
};
