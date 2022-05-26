import { SocketContext } from "../../Contexts/SocketContext";
import { useRef, useContext } from "react";
import useOutsideAlerter from "../../Hooks/useOutsideAlerter";
import axios from "axios";

function ChatOptions({
  chat,
  showOptions,
  setShowOptions,
  setActiveChat,
  chats,
  setChats,
  setMessages,
  receiver,
}) {
  const [socket] = useContext(SocketContext);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowOptions);

  function deleteChat() {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.token
        }`,
      },
    };

    axios
      .delete(`/api/chats/delete-chat/${chat._id}`, headers)
      .then((res) => {
        setChats(chats.filter((c) => c._id !== chat._id));
        setActiveChat(null);
        setShowOptions(false);

        socket.current.emit("deleteChat", {
          chatId: chat._id,
          receiverId: receiver._id,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function clearChat() {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.token
        }`,
      },
    };

    axios
      .delete(`/api/chats/clear-chat/${chat._id}`, headers)
      .then((res) => {
        setMessages([]);
        setShowOptions(false);

        socket.current.emit("clearChat", {
          chatId: chat._id,
          receiverId: receiver._id,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div
      ref={wrapperRef}
      className="absolute bg-white dark:bg-[#3e3d3d] shadow-base p-1.5 2xl:p-2 top-14 2xl:top-20 3xl:top-22 right-4 rounded z-10"
      hidden={!showOptions}
    >
      <ul>
        {/* delete chat */}
        <li
          className="p-1.5 2xl:p-2 text-sm 2xl:text-base 3xl:text-lg dark:text-darkLight"
          onClick={deleteChat}
        >
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline mr-2 fill-[#818181] dark:fill-darkLight w-4 2xl:w-5 3xl:w-6"
              viewBox="0 0 16 16"
            >
              <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
              <path
                fillRule="evenodd"
                d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
              />
            </svg>
            Delete Chat
          </button>
        </li>

        <hr className="dark:border-t dark:border-secondary" />

        {/* clear chat */}
        <li
          className="p-1.5 2xl:p-2 text-sm 2xl:text-base 3xl:text-lg dark:text-darkLight"
          onClick={clearChat}
        >
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline mr-2 fill-[#818181] dark:fill-darkLight w-4 2xl:w-5 3xl:w-6"
              viewBox="0 0 16 16"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
            Clear Chat
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ChatOptions;
