import { Avatar, dividerClasses, IconButton, Tooltip } from "@mui/material";
import { create } from "@mui/material/styles/createTransitions";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import "./SidebarChat.css";
import instance from "../utils/api";
import PostAddIcon from "@mui/icons-material/PostAdd";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
function SideBarChatAdmin({ id, name, addNewChat, setUpdateRooms }: any) {
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
        const axiosResponse = await api.post(
          "/ticket/register",
          roomNameObject
        );
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
    <div className="sidebarChat__globale">
      <Tooltip title="Supprimer le ticket">
        <IconButton onClick={createChat} className="sidebarChat">
          <DeleteForeverOutlinedIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Clic pour voir la discussion">
        <Link to={`/admin/ticket/${id}`}>
          <div className="sidebarChat">
            <Avatar
              src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
            />

            <div className="sidebarChat__info">
              <h2>{name}</h2>
              <p>Dernier message ...</p>
            </div>
          </div>
        </Link>
      </Tooltip>
    </div>
  ) : (
    <div className="sidebarChat__createTicket">
      <h3>Créer un ticket</h3>
      <Tooltip title="Clic pour créer un ticket">
        <IconButton onClick={createChat} className="sidebarChat">
          <PostAddIcon />
        </IconButton>
      </Tooltip>
    </div>
  );
}

export default SideBarChatAdmin;
