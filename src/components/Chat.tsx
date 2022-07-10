import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Chat.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import MicIcon from "@mui/icons-material/Mic";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { useParams } from "react-router-dom";
import api from "../utils/api";

const Chat = () => {
  const [input, setInput] = useState<string>("");
  const [seed, setSeed] = useState<any>("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState<any>("");
  const [messages, setMessages] = useState<any>([]);

  useEffect(() => {
    // if you click on room in the sidebarchat you take the information in dabase
    if (roomId) {
      console.log("roomId from useeffect in roomId click==>>", roomId);

      //take the info from BDD and setRoomId
      try {
        (async function () {
          const axiosResponse = await api.get(`/ticket/one/${roomId}`);
          console.log("axiosResponse oneRoom ==>", axiosResponse.data);
          setRoomName(axiosResponse.data[0].name);
          console.log(
            "axiosResponse one room name===>",
            axiosResponse.data[0].name
          );
        })();
    
      } catch (error) {
        console.error(error);
      }
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));

    return;
  }, [roomId]);

  const sendMessage = (e: any) => {
    e.preventDefault();
    console.log("you typed >>> ", input);
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{roomName}</h3>
          <p>Vu pour la dernière fois à ...</p>
        </div>
        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlinedIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>

      <div className="chat__body">
        <p className={`chat__message ${true && "chat__receiver"}`}>
          <span className="chat__name">Admin</span>
          hello world
          <span className="chat__timestamp">3:52pm</span>
        </p>
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form action="">
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            type="text"
            placeholder="écrit ton message"
          />
          <button type="submit" onClick={sendMessage}>
            Envoie un message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
};

export default Chat;
