import { useState } from "react";
import Router from "./router";
import "./css/App.css";
import SignIn from "./js/components/sign/SignIn";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="homepage">
      {!user ? (
        <>
          <SignIn></SignIn>
        </>
      ) : (
        <div className="homepage__body">
          <Router></Router>
        </div>
      )}
    </div>
  );
}

export default App;
