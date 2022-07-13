import Chat from "../components/Chat";
import SideBarAdmin from "../components/SideBarAdmin";
import "./HomePage.css";

const ChatPageAdmin = () => {
  return (
    <div className="homepage">
      <div className="homepage__body">
        <SideBarAdmin />
        <Chat />
      </div>
    </div>
  );
};

export default ChatPageAdmin;
