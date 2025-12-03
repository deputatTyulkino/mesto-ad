export const getTemplate = () => {
  return document
    .getElementById("card-template")
    .content.querySelector(".card")
    .cloneNode(true);
};

export const getTemplateUserCardInfo = () => {
  return document
    .getElementById("popup-info-user-preview-template")
    .content.querySelector(".popup__list-item")
    .cloneNode();
};

export const getTemplateInfoString = () => {
  return document
    .getElementById("popup-info-definition-template")
    .content.querySelector(".popup__info-item")
    .cloneNode(true);
};
