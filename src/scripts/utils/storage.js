const idOwner = "id";

export const setIdOwner = (id) => {
  localStorage.setItem(idOwner, id);
};

export const getIdOwner = () => localStorage.getItem(idOwner);
