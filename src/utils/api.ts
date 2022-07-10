import axios from "axios";
import { API_BASE_URL } from "./constants";
import store from "../store";
import { login } from "../store/user.reducer";

const instance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

instance.interceptors.request.use((request) => {
  const state = store.getState();
  console.log("state from interceptors: ",state.user.user);
  
  
  if (request.headers)
    request.headers[
      "Authorization"
    ] = `Bearer ${state.user.user&&state.user.user}`;
    // ] = `Bearer ${state.user.user?.access_token}`;
  return request;
});


instance.interceptors.response.use(
  (response) => {
    // if there is no error
    return response;
  },
  async (error) => {
    if (error.response.status !== 401) {
      // if error we send error
      return Promise.reject(error);
    }
    try {
      // ask refresh token
      const response = await instance.get("/user/refresh");
      store.dispatch(login(response.data));
      // add field hasRefreshToken
      error.hasRefreshToken = true;
      return Promise.reject(error);
    } catch (error) {
      const tokenError = new Error("Cannot refresh token");
      return Promise.reject(tokenError);
    }
  }
);
export default instance;
