import { Routes, Route,BrowserRouter } from "react-router-dom";

import HomePage from "./js/pages/HomePage";
import LoginPage from "./js/pages/LoginPage";
import RegisterPage from "./js/pages/RegisterPage";

const Router = () => {
  return (
    <BrowserRouter>
        <Routes>
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        </Routes>    
    </BrowserRouter>
  );
};

export default Router;
