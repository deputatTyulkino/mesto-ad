const handleEscUp = (evt) => {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector(".popup_is-opened");
    closeModalWindow(activePopup);
  }
};

export const fetchingButtonState = (button, text) => {
  button.textContent = text;
  button.disabled = true;
  button.style.opacity = "0.7";
};

export const resetButtonState = (button, text) => {
  button.textContent = text;
  button.disabled = false;
  button.style.opacity = "1";
};

export const openModalWindow = (modalWindow) => {
  modalWindow.classList.add("popup_is-opened");
  document.body.style.overflow = "hidden";
  document.addEventListener("keyup", handleEscUp);
};

export const closeModalWindow = (modalWindow) => {
  modalWindow.classList.remove("popup_is-opened");
  document.body.style.overflow = "";
  document.removeEventListener("keyup", handleEscUp);
};

export const setCloseModalWindowEventListeners = (modalWindow) => {
  const closeButtonElement = modalWindow.querySelector(".popup__close");
  closeButtonElement.addEventListener("click", () => {
    closeModalWindow(modalWindow);
  });

  modalWindow.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModalWindow(modalWindow);
    }
  });
};
