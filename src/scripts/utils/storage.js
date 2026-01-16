const ID_OWNER = "id";

export const setIdOwner = (id) => {
  localStorage.setItem(ID_OWNER, id);
};

export const getIdOwner = () => localStorage.getItem(ID_OWNER);
