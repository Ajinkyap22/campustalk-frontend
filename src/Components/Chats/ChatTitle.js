import { useState, useEffect } from "react";
import ChatOptions from "./ChatOptions";

function ChatTitle({
  receiver,
  chat,
  chats,
  setChats,
  setActiveChat,
  setMessages,
}) {
  const [showOptions, setShowOptions] = useState(false);

  function back() {
    setActiveChat(null);
    setMessages([]);
  }

  function toggleOptions() {
    setShowOptions(!showOptions);
  }

  useEffect(() => {
    let isMounted = true;

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="w-full mt-28 lg:mt-0 lg:sticky lg:top-0 z-10 lg:row-span-1 bg-primary-light flex justify-between items-center p-3 border-b border-primary-light">
      {/* picture and name */}
      <div className="flex items-center">
        {/* back button for mobile */}
        <button onClick={back}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 xl:w-7 xl:mx-1 2xl:w-9 3xl:w-10 stroke-darkLight"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>

        {/* picture */}
        {receiver && receiver.picture ? (
          <img
            src={
              receiver.picture.includes("googleusercontent")
                ? receiver.picture
                : `/uploads/images/${receiver.picture}`
            }
            className="rounded-full object-cover w-9 2xl:w-12 3xl:w-14 h-auto inline mx-2"
            alt=""
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline mx-2 w-10 2xl:w-14 3xl:16 align-middle fill-darkLight"
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
        <span className="text-justify mx-1 2xl:text-2xl 3xl:text-3xl text-white dark:text-darkLight">
          {receiver && receiver.firstName} {receiver && receiver.lastName}
        </span>
      </div>

      {/* optionsToggle */}
      <button
        className="mr-2 dropDownToggle"
        title="Options"
        onClick={toggleOptions}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="fill-white inline w-6 2xl:w-7 3xl:w-8 rotate-90 dropDownToggle"
          viewBox="0 0 16 16"
        >
          <path
            className="dropDownToggle"
            d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
          />
        </svg>
      </button>

      {/* options */}
      <ChatOptions
        chat={chat}
        showOptions={showOptions}
        setShowOptions={setShowOptions}
        chats={chats}
        setChats={setChats}
        setActiveChat={setActiveChat}
        receiver={receiver}
        setMessages={setMessages}
      />
    </div>
  );
}

export default ChatTitle;
