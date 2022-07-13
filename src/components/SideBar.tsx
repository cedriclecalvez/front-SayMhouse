import React, { useEffect, useState } from "react";
import "./SideBar.css";
import "../css/index.css";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SidebarChat from "./SidebarChat";
import api from "../utils/api";
import LogoutIcon from "@mui/icons-material/Logout";
import { Navigate } from "react-router-dom";

function SideBar() {
  const [rooms, setRooms] = useState<any[]>([]);
  const [addRoom, setAddRoom] = useState<boolean>(false);
  const [isLogout, setIsLogout] = useState<boolean>(false);

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
    const axiosResponse = await api.get("/user/auth/allUsers");
    console.log("axiosResponse users list==>", axiosResponse.data);
  }
  async function handleClickToLogout() {
    const axiosResponse = await api.get("/user/logout");
    console.log("axiosResponse LOGOUT==>", axiosResponse);
    console.log("axiosResponse", axiosResponse.status);

    if (axiosResponse.status == 200) {
      setIsLogout(true);
    }
  }
  if (isLogout == true) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="sideBar">
      <div className="sideBar__header">
        <Avatar />
        <div className="sidebar__headerRight">
          <Tooltip title="requete pour list users">
            <button onClick={handleClickTofindAllUsers}></button>
          </Tooltip>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <Tooltip title="LOGOUT">
            <IconButton>
              <LogoutIcon onClick={handleClickToLogout}></LogoutIcon>
            </IconButton>
          </Tooltip>
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
