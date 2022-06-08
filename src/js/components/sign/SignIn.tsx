import React from "react";
import "./SignIn.css";
import SignInMui from "./signInMui";
function SignIn() {
  return (
    <div className="login">
      <div className="login__container">
        <SignInMui></SignInMui>
      </div>
    </div>
  );
}

export default SignIn;
