import React, { useEffect, useState } from "react";
import "./SideBar.css";
import "../css/index.css";
import { Avatar, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SidebarChat from "./SidebarChat";
import api from "../utils/api";

function SideBar() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [addRoom, setAddRoom] = useState<boolean>(false);

  useEffect(() => {
    (async function () {
      const axiosResponse = await api.get("/ticket/auth/myTickets");
      setRooms(axiosResponse.data);
      console.log("useEffect : all my tickets", rooms);
    })();
  }, []);

  // to display directly the new list of rooms when user create in the child component
  useEffect(() => {
    (async function () {
      const axiosResponse = await api.get("/ticket/auth/myTickets");

      setRooms(axiosResponse.data);
      console.log("list tickets after creation new ticket", rooms);
      setAddRoom(false);
    })();
  }, [addRoom]);

  async function handleClickTofindAllUsers() {
    const axiosResponse = await api.get("/user/allUsers");
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
        <SidebarChat addNewChat setUpdateRooms={setAddRoom} />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.name} />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
