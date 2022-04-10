import React from "react";
import Chat from "../components/Chat";
import SideBar from "../components/SideBar";
import "./HomePage.css";
const HomePage = () => {
  return (
    <div className="homepage">
      <div className="homepage__body">
        <SideBar />
        <Chat />
        {/* <Chat /> */}
      </div>
    </div>
  );
};

export default HomePage;
