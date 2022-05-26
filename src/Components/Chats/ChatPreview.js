import { useState, useEffect } from "react";

function ChatPreview({
  chat,
  user,
  socket,
  activeChat,
  setActiveChat,
  onlineUsers,
}) {
  const [receiver, setReceiver] = useState(null);
  const [online, setOnline] = useState(false);
  const [unReadCount, setUnReadCount] = useState({});

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      socket.on("updateReadCount", ({ receiverId, chatId }) => {
        if (chatId === chat._id && activeChat?._id !== chatId) {
          setUnReadCount((prev) => ({
            ...prev,
            [receiverId]: prev[receiverId] + 1,
          }));
        }
      });

      if (user) {
        socket?.on("clearChat", (message) => {
          // set unread count to 0
          setUnReadCount((prev) => ({
            ...prev,
            [user?._id]: 0,
          }));
        });
      }
    }

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let r = chat.members.find((member) => member._id !== user._id);
    setReceiver(r);

    if (onlineUsers[r._id]) {
      setOnline(true);
    } else {
      setOnline(false);
    }
  }, [onlineUsers]);

  useEffect(() => {
    let newUnReadCount = {};

    if (receiver) {
      newUnReadCount = {
        [user._id]: chat.unReadCounts[user._id],
        [receiver._id]: chat.unReadCounts[receiver._id],
      };

      setUnReadCount(newUnReadCount);
    }
  }, [chat, receiver]);

  function handleClick() {
    let newUnReadCount = {};

    setActiveChat(chat);
    if (receiver) {
      newUnReadCount = {
        [user._id]: 0,
        [receiver._id]: chat.unReadCounts[receiver._id],
      };

      setUnReadCount(newUnReadCount);
    }
  }

  return (
    <div
      className={`flex border-b justify-between items-center w-full p-2.5 dark:border-light cursor-pointer hover:bg-[#f3f3f3] dark:hover:bg-darkSecondary ${
        activeChat?._id === chat._id ? "bg-[#f3f3f3] dark:bg-darkSecondary" : ""
      }`}
      onClick={handleClick}
    >
      {/* picture and name */}
      <div className="flex items-center">
        {/* picture */}
        {receiver && receiver.picture ? (
          <img
            src={
              receiver.picture.includes("googleusercontent")
                ? receiver.picture
                : `/uploads/images/${receiver.picture}`
            }
            className="rounded-full object-cover w-10 md:w-12 lg:w-10 2xl:w-12 3xl:w-14 h-auto inline mx-2"
            alt=""
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline mx-2 w-10 md:w-12 lg:w-10 2xl:w-12 3xl:w-14 align-middle fill-[#818181] dark:fill-darkLight"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        )}

        {/* name */}
        <div className="flex items-center">
          <span className="text-sm md:text-base lg:text-sm 2xl:text-base 3xl:text-lg text-justify mx-1 dark:text-darkLight">
            {receiver && receiver.firstName} {receiver && receiver.lastName}
          </span>

          {user && unReadCount[user._id] > 0 && (
            <span className="text-xsm md:text-xs lg:text-xsm 2xl:text-sm 3xl:text-base text-center bg-primary-light text-white py-0.5 px-1.5 2xl:px-2 3xl:px-2.5 rounded-full mx-1">
              {unReadCount[user._id]}
            </span>
          )}
        </div>
      </div>

      {/* timestamp & unread messages count */}
      <div className="flex flex-col justify-center items-center">
        {/* online status */}
        {online && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            className="fill-green-500 inline 2xl:w-3 3xl:w-3.5"
            viewBox="0 0 16 16"
          >
            <circle cx="8" cy="8" r="8" />
          </svg>
        )}
      </div>
    </div>
  );
}

export default ChatPreview;
