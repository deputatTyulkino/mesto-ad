import axios from "axios";

export const api = axios.create({
  baseURL: "https://mesto.nomoreparties.co/v1/apf-cohort-202",
  headers: {
    authorization: "ba2038c9-2510-4068-90c2-32c8e82b434a",
    "Content-Type": "application/json",
  },
});
