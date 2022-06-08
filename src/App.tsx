import { useState } from "react";
import Router from "./router";
import "./css/App.css";

function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="homepage">

    <div className="homepage__body">{!user ? <h1>LOGIN</h1> : <Router></Router>}</div>
  </div>
  );
}

export default App;
