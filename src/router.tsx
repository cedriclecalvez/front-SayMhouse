import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import ChatPage from "./js/pages/ChatPage";
import { useSelector } from "react-redux";
import { userStore } from "./utils/types/user.types";

import "./js/pages/HomePage.css";
import "./css/App.css";
import HomePage from "./js/pages/HomePage";
import LoginPage from "./js/pages/LoginPage";
import RegisterPage from "./js/pages/RegisterPage";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/HomePage"
          element={<PrivateRoute component={<HomePage />} />}
        />
        <Route path="/ticket/:roomId" element={<ChatPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

const PrivateRoute = ({ component: Component }: { component: JSX.Element }) => {
  const userState = useSelector((state: { user: userStore }) => state.user);
  console.log("check route ok");

  return !userState.isLogged ? <Navigate to="/HomePage" /> : Component;
};
