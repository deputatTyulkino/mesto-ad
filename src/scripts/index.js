/*
  Файл index.js является точкой входа в наше приложение
  и только он должен содержать логику инициализации нашего приложения
  используя при этом импорты из других файлов

  Из index.js не допускается что то экспортировать
*/

import {
  getCardList,
  getUserInfo,
  setUserInfo,
  setAvatar,
  addCard,
} from "./api/api.js";
import { createCardElement } from "./components/card.js";
import {
  openModalWindow,
  closeModalWindow,
  setCloseModalWindowEventListeners,
  fetchingButtonState,
  resetButtonState,
} from "./components/modal.js";
import { setIdOwner } from "./utils/storage.js";
import { enableValidation, clearValidation } from "./utils/validation.js";
import {
  ModalDescriptionContent,
  ModalContent,
} from "./helpers/modal_content.js"
import { ButtonText } from "./constants/button_text.js";

import { CardInfo } from "./constants/card_info.js";

import { isAxiosError } from "axios";

// Создание объекта с настройками валидации
const validationSettings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// включение валидации вызовом enableValidation
// все настройки передаются при вызове
enableValidation(validationSettings);

// DOM узлы
const placesWrap = document.querySelector(".places__list");
const profileFormModalWindow = document.querySelector(".popup_type_edit");
const profileForm = profileFormModalWindow.querySelector(".popup__form");
const profileTitleInput = profileForm.querySelector(".popup__input_type_name");
const profileDescriptionInput = profileForm.querySelector(
  ".popup__input_type_description",
);
const profileEditButton =
  profileFormModalWindow.querySelector(".popup__button");

const cardFormModalWindow = document.querySelector(".popup_type_new-card");
const cardForm = cardFormModalWindow.querySelector(".popup__form");
const cardButton = cardFormModalWindow.querySelector(".popup__button");

const imageModalWindow = document.querySelector(".popup_type_image");
const imageElement = imageModalWindow.querySelector(".popup__image");
const imageCaption = imageModalWindow.querySelector(".popup__caption");

const openProfileFormButton = document.querySelector(".profile__edit-button");
const openCardFormButton = document.querySelector(".profile__add-button");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

const avatarFormModalWindow = document.querySelector(".popup_type_edit-avatar");
const avatarForm = avatarFormModalWindow.querySelector(".popup__form");
const editAvatarButton = avatarFormModalWindow.querySelector(".popup__button");

const cardInfoModalWindow = document.querySelector(".popup_type_info");
const titleModal = cardInfoModalWindow.querySelector(".popup__title");
const listInfo = cardInfoModalWindow.querySelector(".popup__info");
const subtitleModal = cardInfoModalWindow.querySelector(".popup__text");
const secondaryListInfo = cardInfoModalWindow.querySelector(".popup__list");

const headerLogo = document.querySelector(".header__logo");

const showAllCardsInfo = () => {
  getCardList()
    .then((cards) => {
      const description = ModalDescriptionContent.createCardsDescriptionValues(cards)
      const terms = CardInfo.CARDS_STATISTICS_TERMS;
      if (listInfo.textContent || secondaryListInfo.textContent) {
        listInfo.textContent = ""
        secondaryListInfo.textContent = ""
        titleModal.textContent = ""
        subtitleModal.textContent = ""
      }
      titleModal.textContent = CardInfo.CARDS_STATISTICS.title
      subtitleModal.textContent = CardInfo.CARDS_STATISTICS.subtitle
      ModalContent.appendInfoString(listInfo, terms, description)
      ModalContent.appendSecInfoString(secondaryListInfo, cards)
      openModalWindow(cardInfoModalWindow)
    })
    .catch((err) => console.log(err))
}

const showInfoCard = (cardId) => {
  getCardList()
    .then((cards) => {
      const currentCard = cards.find((card) => card._id === cardId);
      const descriptions = ModalDescriptionContent.createDescriptionValues(currentCard);
      const terms = CardInfo.INFO_CARD_TERMS;
      if (listInfo.textContent || secondaryListInfo.textContent) {
        listInfo.textContent = ""
        secondaryListInfo.textContent = ""
        titleModal.textContent = ""
        subtitleModal.textContent = ""
      }
      titleModal.textContent = CardInfo.INFO_CARD.title;
      subtitleModal.textContent = CardInfo.INFO_CARD.subtitle;
      ModalContent.appendInfoString(listInfo, terms, descriptions);
      ModalContent.appendUserLikes(secondaryListInfo, currentCard.likes);
      openModalWindow(cardInfoModalWindow);
    })
    .catch((err) => {
      console.log(err);
    })
};

const handlePreviewPicture = ({ name, link }) => {
  imageElement.src = link;
  imageElement.alt = name;
  imageCaption.textContent = name;
  openModalWindow(imageModalWindow);
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  fetchingButtonState(profileEditButton, ButtonText.FETCH_BUTTON_SAVE_TEXT);
  setUserInfo({
    name: evt.target["user-name"].value,
    about: evt.target["user-description"].value,
  })
    .then((userData) => {
      profileTitle.textContent = userData.name;
      profileDescription.textContent = userData.about;
      closeModalWindow(profileFormModalWindow);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      resetButtonState(profileEditButton, ButtonText.BUTTON_SAVE_TEXT);
    });
};

const handleAvatarFormSubmit = (evt) => {
  evt.preventDefault();
  const avatarUrl = evt.target["user-avatar"].value.trim();
  fetchingButtonState(editAvatarButton, ButtonText.FETCH_BUTTON_SAVE_TEXT);
  setAvatar(avatarUrl)
    .then((userData) => {
      profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
      closeModalWindow(avatarFormModalWindow);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      resetButtonState(editAvatarButton, ButtonText.BUTTON_SAVE_TEXT);
    });
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const name = evt.target["place-name"].value.trim();
  const link = evt.target["place-link"].value.trim();
  fetchingButtonState(cardButton, ButtonText.FETCH_BUTTON_CREATE_TEXT);
  addCard({ name, link })
    .then((card) => {
      const cardElement = createCardElement(card, {
        onPreviewPicture: handlePreviewPicture,
        onShowInfoCard: showInfoCard,
      })
      placesWrap.prepend(cardElement);
      closeModalWindow(cardFormModalWindow);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      resetButtonState(cardButton, ButtonText.BUTTON_CREATE_TEXT);
    });
};

// EventListeners
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleCardFormSubmit);
avatarForm.addEventListener("submit", handleAvatarFormSubmit);
headerLogo.addEventListener('click', showAllCardsInfo)

openProfileFormButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModalWindow(profileFormModalWindow);
  clearValidation(profileFormModalWindow, validationSettings);
});

profileAvatar.addEventListener("click", () => {
  avatarForm.reset();
  openModalWindow(avatarFormModalWindow);
  clearValidation(avatarFormModalWindow, validationSettings);
});

openCardFormButton.addEventListener("click", () => {
  cardForm.reset();
  openModalWindow(cardFormModalWindow);
  clearValidation(cardFormModalWindow, validationSettings);
});

//настраиваем обработчики закрытия попапов
const allPopups = document.querySelectorAll(".popup");
allPopups.forEach((popup) => {
  setCloseModalWindowEventListeners(popup);
});

const setCards = (card) => {
  card.forEach((card) => {
    placesWrap.append(
      createCardElement(card, {
        onPreviewPicture: handlePreviewPicture,
        onShowInfoCard: showInfoCard,
      }),
    );
  });
};

const setProfile = (data) => {
  profileAvatar.style.backgroundImage = `url(${data.avatar})`;
  profileTitle.textContent = data.name;
  profileDescription.textContent = data.about;
  setIdOwner(data._id);
};

Promise.all([getCardList(), getUserInfo()])
  .then(([cards, userData]) => {
    setCards(cards);
    setProfile(userData);
  })
  .catch((err) => {
    if (isAxiosError(err)) {
      console.log(err.message)
    };
  });