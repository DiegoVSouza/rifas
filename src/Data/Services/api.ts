import axios from "axios";
import { store } from "../../store";
import { Creators as UserActions } from "../../store/modules/user/actions";

const localhost = 'http://localhost:81';

const token = localStorage.getItem("@token");
export let api = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    authorization: `Bearer: ${token}`,
  },
  baseURL: localhost,
  validateStatus: (status) => {
    if (status === 401) {
      store.dispatch(UserActions.logout());
      if (window.location.pathname !== "/login") {
        window.location.pathname = "/login";
      }
    }
    return status >= 200 && status < 300;
  },
});

export let apiViaCep = axios.create({
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer: ${token}`
  },
  validateStatus: (status) => {
    if (status === 401) {
      store.dispatch(UserActions.logout());
      if (window.location.pathname !== "/login") {
        window.location.pathname = "/login";
      }
    }
    return status >= 200 && status < 300;
  },
});


