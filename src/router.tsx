import { Routes, Route, BrowserRouter } from "react-router-dom";
import ChatPage from "./js/pages/ChatPage";

import HomePage from "./js/pages/HomePage";
import LoginPage from "./js/pages/LoginPage";
import RegisterPage from "./js/pages/RegisterPage";

const Router = () => {
  return (
    <div className="homepage">
      <div className="homepage__body">
        <BrowserRouter>          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/rooms/:roomId" element={<ChatPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Router;
