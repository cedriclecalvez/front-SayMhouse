import Chat from "../components/Chat";
import SideBar from "../components/SideBar";
import "./HomePage.css";

const ChatPage = () => {
  return (
    <div className="homepage">
      <div className="homepage__body">
        <SideBar />
        <Chat />
      </div>
    </div>
  );
};

export default ChatPage;
