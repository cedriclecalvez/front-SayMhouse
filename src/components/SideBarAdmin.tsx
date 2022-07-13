import React, { useEffect, useState } from "react";
import "./SideBar.css";
import "../css/index.css";
import { Avatar, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SideBarChatAdmin from "./SideBarChatAdmin";
import api from "../utils/api";

function SideBarAdmin() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [addRoom, setAddRoom] = useState<boolean>(false);

  // to display directly the new list of rooms when user create in the child component
  useEffect(() => {
    (async function () {
      const axiosResponse = await api.get("/ticket/auth/list");
      console.log("axiosResponse room list==>", axiosResponse.data);
      setRooms(axiosResponse.data);
      console.log("response rooms list", rooms);
      setAddRoom(false);
    })();
  }, [addRoom]);

  useEffect(() => {
    (async function () {
      const axiosResponse = await api.get("/ticket/auth/list");
      console.log("axiosResponse room list==>", axiosResponse.data);
      setRooms(axiosResponse.data);
      console.log("response rooms list after add room", rooms);
    })();
  }, []);

  async function handleClickTofindAllUsers() {
    const axiosResponse = await api.get("/user/auth/allUsers");
    console.log("axiosResponse users list==>", axiosResponse.data);
  }

  return (
    <div className="sideBar">
      <div className="sideBar__header">
        <Avatar />
        <div className="sidebar__headerRight">
          <button onClick={handleClickTofindAllUsers}></button>
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="sideBar__search">
        <div className="sideBar__searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Cherche un ticket" type="text" />
        </div>
      </div>

      <div className="sideBar__chats">
        <SideBarChatAdmin addNewChat setUpdateRooms={setAddRoom} />
        {rooms.map((room) => (
          <SideBarChatAdmin key={room.id} id={room.id} name={room.name} />
        ))}
      </div>
    </div>
  );
}

export default SideBarAdmin;
