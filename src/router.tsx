import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import { useSelector } from "react-redux";
import { userStore } from "./utils/types/user.types";

import "./pages/HomePage.css";
import "./css/App.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPage from "./pages/AdminPage"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/HomePage"
          element={<PrivateRoute component={<HomePage />} />}
        />
        <Route path="/ticket/:roomId" element={<ChatPage />} />
        <Route
          path="/AdminPage"
          element={<PrivateRoute component={<AdminPage />} />}
        />
        <Route path="/admin/ticket/:roomId" element={<ChatPage />} />

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
