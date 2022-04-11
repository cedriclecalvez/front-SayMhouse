import React, { useEffect, useState } from "react";
import "./SideBar.css";
import "../../css/index.css";
import { Avatar, IconButton } from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import SidebarChat from "./SidebarChat";
import api from "../../utils/api";

function SideBar() {
  const [rooms, setRooms] = useState<any[]>([]);

  useEffect(() => {
    (async function () {
      const axiosResponse = await api.get("/rooms/list");
      console.log("axiosResponse.data==>", axiosResponse.data);
      setRooms(axiosResponse.data);
      console.log("rooms1", rooms);
    })();
  }, []);

  return (
    <div className="sideBar">
      <div className="sideBar__header">
        <Avatar />
        <div className="sidebar__headerRight">
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
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>

      <div className="sideBar__chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} name={room.name} />
        ))}
      </div>
    </div>
  );
}

export default SideBar;
