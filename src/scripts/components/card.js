import { changeLikeCardStatus, deleteCard } from "../api/api";
import { openConfirmModalWindow } from "./modal";
import { getIdOwner } from "../utils/storage";
import { fetchingButtonState, resetButtonState } from "./modal";
import { getTemplate } from "../helpers/template";
import { CardInfo } from "../helpers/modal_inf";
import { ButtonText } from "../constants/button_text";

const likeCard = (likeButton, id) => {
  likeButton.classList.toggle("card__like-button_is-active");
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  return changeLikeCardStatus(id, isLiked);
};

export const removeCard = (id, cardElement, confirmButton) => {
  fetchingButtonState(confirmButton, ButtonText.FETCH_BUTTON_REMOVE_TEXT);
  deleteCard(id)
    .then((response) => {
      cardElement.remove();
      alert(response.message);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      resetButtonState(confirmButton, ButtonText.CONFIRM_BUTTON_TEXT);
    });
};

export const createCardElement = (
  data,
  { onPreviewPicture, onShowInfoCard },
) => {
  const confirmModalWindow = document.querySelector(".popup_type_remove-card");
  const confirmButton = confirmModalWindow.querySelector(".popup__button");
  const ownerId = getIdOwner();
  const cardElement = getTemplate();
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(
    ".card__control-button_type_delete",
  );
  const infoButton = cardElement.querySelector(
    ".card__control-button_type_info",
  );
  const cardImage = cardElement.querySelector(".card__image");
  const countLike = cardElement.querySelector(".card__like-count");

  cardImage.src = data.link;
  cardImage.alt = data.name;
  cardElement.querySelector(".card__title").textContent = data.name;
  countLike.textContent = CardInfo.getCountLike(data.likes);

  const userLikes = data.likes.map((user) => user._id);
  if (userLikes.includes(ownerId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  infoButton.addEventListener("click", () => onShowInfoCard(data._id));

  likeButton.addEventListener("click", () => {
    likeButton.disabled = true;
    likeCard(likeButton, data._id)
      .then((response) => {
        countLike.textContent = CardInfo.getCountLike(response.likes);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        likeButton.disabled = false;
      });
  });

  if (ownerId === data.owner._id) {
    deleteButton.addEventListener("click", () => {
      openConfirmModalWindow(data._id, cardElement, confirmModalWindow, confirmButton);
    });
  } else {
    deleteButton.style.display = "none";
  }

  if (onPreviewPicture) {
    cardImage.addEventListener("click", () =>
      onPreviewPicture({ name: data.name, link: data.link }),
    );
  }

  return cardElement;
};
