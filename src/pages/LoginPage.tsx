import React from "react";
import SignInMui from "../components/sign/signInMui";
import "./LoginPage.css";
import Footer from "./partials/Footer";

const LoginPage = () => {
  return (
    <div className="login">
      <div className="login__container">
        <SignInMui />
        <Footer />
      </div>
    </div>
  );
};

export default LoginPage;
