import { ChatContext } from "../Contexts/ChatContext";
import { SocketContext } from "../Contexts/SocketContext";
import { UserContext } from "../Contexts/UserContext";
import { withRouter } from "react-router-dom";
import { useContext } from "react";
import axios from "axios";

function UserModal({ receiver, hovering, setOverModal, history }) {
  const [chats, setChats, activeChat, setActiveChat] = useContext(ChatContext);
  const [socket] = useContext(SocketContext);
  const [user] = useContext(UserContext);

  function handleHover() {
    setOverModal(true);
  }

  function handleLeave() {
    setTimeout(() => {
      setOverModal(false);
    }, 500);
  }

  function newChat() {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    axios
      .post(
        "/api/chats/new-chat",
        { members: [receiver._id, user._id] },
        headers
      )
      .then((res) => {
        setChats([...chats, res.data]);
        setActiveChat(res.data);
        socket.current.emit("newChat", {
          chat: res.data,
          receiverId: receiver._id,
        });
        history.push("/chats");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div
      className="absolute top-8 -left-1.5 p-2 z-20 bg-white dark:bg-[#3e3d3d] shadow-base rounded"
      hidden={!hovering || receiver._id === user._id}
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      {/* picture and name */}
      <div className="flex items-center relative">
        {/* picture */}
        {!receiver.picture ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#818181"
            className="inline mx-1 lg:w-7 xl:w-9 2lx:w-11 fill-[#818181] dark:fill-darkLight"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        ) : (
          <img
            src={
              receiver.picture.includes("googleusercontent")
                ? receiver.picture
                : `/uploads/images/${receiver.picture}`
            }
            alt=""
            className="rounded-full inline lg:h-8 xl:h-10 2xl:h-12 mx-1"
          />
        )}

        {/* name */}
        <span className="lg:text-xs xl:text-sm 2xl:text-base text-justify mx-1 dark:text-darkLight">
          {receiver.firstName} {receiver.lastName}
        </span>
      </div>

      {/* stats */}
      <div className="flex justify-center items-center my-1">
        {/* members */}
        <div className="flex flex-col items-center px-2.5">
          <span className="lg:text-xsm xl:text-xs 2xl:text-sm text-secondary dark:text-gray-300">
            {receiver.posts.length}
          </span>
          <span className="lg:text-xsm xl:text-xs 2xl:text-sm text-secondary dark:text-gray-300">
            {receiver.posts.length === 1 ? "Post" : "Posts"}
          </span>
        </div>

        {/* posts */}
        <div className="flex flex-col items-center px-2.5">
          <span className="lg:text-xsm xl:text-xs 2xl:text-sm text-secondary dark:text-gray-300">
            {receiver.forums.length}
          </span>
          <span className="lg:text-xsm xl:text-xs 2xl:text-sm text-secondary dark:text-gray-300">
            {receiver.forums.length === 1 ? "Forum" : "Forums"}
          </span>
        </div>
      </div>

      {/* message */}
      <button
        onClick={newChat}
        className="p-1 px-2 my-1.5 rounded-full w-full lg:text-xs xl:text-sm 2xl:text-base text-white dark:text-darkLight bg-primary-light hover:bg-primary"
      >
        Message
      </button>
    </div>
  );
}

export default withRouter(UserModal);
