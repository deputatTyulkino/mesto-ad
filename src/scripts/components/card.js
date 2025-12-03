import { changeLikeCardStatus, deleteCard } from "./api";
import { confirmButton, openConfirmModalWindow } from "../index";
import { getIdOwner } from "./storage";
import { fetchingButtonState, resetButtonState } from "./modal";
import { getTemplate } from "./template";
import { getCountLike } from "./helpers";

const likeCard = (likeButton, id) => {
  likeButton.classList.toggle("card__like-button_is-active");
  const isLiked = likeButton.classList.contains("card__like-button_is-active");
  return changeLikeCardStatus(id, isLiked);
};

export const removeCard = (id, cardElement) => {
  fetchingButtonState(confirmButton, "Удаление...");
  deleteCard(id)
    .then((response) => {
      cardElement.remove();
      alert(response.message);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      resetButtonState(confirmButton, "Да");
    });
};

export const createCardElement = (
  data,
  { onPreviewPicture, onShowInfoCard },
) => {
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
  countLike.textContent = getCountLike(data.likes);

  const userLikes = data.likes.map((user) => user["_id"]);
  if (userLikes.includes(ownerId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  infoButton.addEventListener("click", () => onShowInfoCard(data["_id"]));

  likeButton.addEventListener("click", () => {
    likeButton.disabled = true;
    likeCard(likeButton, data["_id"])
      .then((response) => {
        countLike.textContent = getCountLike(response.likes);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        likeButton.disabled = false;
      });
  });

  if (ownerId === data.owner["_id"]) {
    deleteButton.addEventListener("click", () => {
      openConfirmModalWindow(data["_id"], cardElement);
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
