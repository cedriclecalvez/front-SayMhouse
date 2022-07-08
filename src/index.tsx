import React from "react";
import ReactDOM from "react-dom";
import "./css/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import { login, logout } from "./store/user.reducer";
import api from "./utils/api";

const isAuth = async () => {
  try {
    console.log("you asked to refresh");
    
    const response = await api.get('/user/refresh');
    console.log("response refresh route",response);
    console.log("response refresh route",response.data);
    
    store.dispatch(login(response.data));
  } catch (error: any) {
    console.log("refresh don't work",error);
    
    store.dispatch(logout());
  }
};

(async () => {
  await isAuth();

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );

  reportWebVitals();
})();
