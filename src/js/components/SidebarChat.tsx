import { Avatar, dividerClasses } from "@mui/material";
import { create } from "@mui/material/styles/createTransitions";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";
import "./SidebarChat.css";
import instance from "../../utils/api";

function SidebarChat({ id, name, addNewChat ,setUpdateRooms}: any) {
  const [seed, setSeed] = useState<any>("");

  // function to return an random avatar
  useEffect(() => {
    return setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = async () => {
    const roomName = prompt("Please enter a name for chat room");
    const roomNameObject = { name: roomName };

    if (roomName) {
      try {
        const axiosResponse = await api.post("/rooms/register", roomNameObject);
        console.log("axiosResponse===>", axiosResponse);
        // to change state of parent child
        setUpdateRooms(true); //
      } catch (error) {
        console.error(error);
      }
      // do some stuff
    }
  };
  console.log("addNewChat", addNewChat);

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>last message ...</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add a new chat</h2>
    </div>
  );
}

export default SidebarChat;
