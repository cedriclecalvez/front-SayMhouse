import React from "react";
import SignInMui from "../components/sign/signInMui";
import "../components/sign/SignIn.css";

const LoginPage = () => {
  return (
    <div className="login">
      <div className="login__container">
        <SignInMui></SignInMui>;
      </div>
    </div>
  );
};

export default LoginPage;
