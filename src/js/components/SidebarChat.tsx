import { Avatar, dividerClasses } from "@mui/material";
import { create } from "@mui/material/styles/createTransitions";
import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import "./SidebarChat.css";

function SidebarChat({ name,addNewChat }: any) {
  const [seed, setSeed] = useState<any>("");

  // function to return an random avatar
  useEffect(() => {
    return setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = async () => {
    const roomName = prompt("Please enter a name for chat room");
    if (roomName) {
      try {
        const axiosResponse = await api.post("/rooms/register", roomName);
      } catch (error) {
        console.error(error);
      }
      // do some stuff
    }
  };
  console.log("addNewChat", addNewChat);

  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarChat__info">
        <h2>{name}</h2>
        <p>last message ...</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add a new chat</h2>
    </div>
  );
}

export default SidebarChat;
