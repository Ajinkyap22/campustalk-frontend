import { ChatContext } from "../../Contexts/ChatContext";
import { SocketContext } from "../../Contexts/SocketContext";
import { useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import MemberActions from "./MemberActions";
import axios from "axios";

function Member({
  members,
  member,
  removeMember,
  makeModerator,
  dismissModerator,
  moderatorsList,
  user,
  i,
  history,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [chats, setChats, activeChat, setActiveChat] = useContext(ChatContext);
  const [socket] = useContext(SocketContext);

  function toggleDropdown() {
    setShowDropdown(!showDropdown);
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
      .post("/api/chats/new-chat", { members: [member._id, user._id] }, headers)
      .then((res) => {
        setChats([...chats, res.data]);
        setActiveChat(res.data);
        socket.current.emit("newChat", {
          chat: res.data,
          receiverId: member._id,
        });
        history.push("/chats");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div
      className={`flex border-b relative dark:border-secondary justify-between items-center w-full p-2 md:p-2.5 2xl:p-3 ${
        i === members.length - 1 ? "border-none" : ""
      }`}
    >
      <div className="flex items-center relative">
        {/* image */}
        {member.picture ? (
          <img
            src={
              member.picture.includes("googleusercontent")
                ? member.picture
                : `/uploads/images/${member.picture}`
            }
            className="rounded-full object-cover w-8 md:w-10 2xl:w-12 3xl:w-14 h-auto inline mx-1 md:mx-2"
            alt=""
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline mx-1 md:mx-2 w-8 md:w-10 2xl:w-12 3xl:w-14 align-middle fill-[#818181] dark:fill-darkLight"
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
        <span className="text-xs md:text-sm 2xl:text-base 3xl:text-lg text-justify mx-1 dark:text-darkLight">
          {member.firstName} {member.lastName}
        </span>

        {moderatorsList[member._id] && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#0F8CFF"
            className="inline mx-1 md:mx-2 w-3.5 md:w-4 2xl:w-5"
            viewBox="0 0 16 16"
            hidden={moderatorsList[member._id] ? false : true}
          >
            <path
              fillRule="evenodd"
              d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z"
            />
          </svg>
        )}
      </div>

      {/* make moderator */}
      {member._id !== user._id && (
        <div className="flex items-center">
          {/* remove member */}
          <button
            onClick={newChat}
            className="p-1 px-1.5 md:px-2 2xl:px-2.5 3xl:px-3 rounded-full text-xsm md:text-mxs 2xl:text-sm 3xl:text-base text-white dark:text-darkLight mx-1 bg-primary-light hover:bg-primary hover:scale-105 transition-all "
          >
            Message
          </button>

          {/* remove member */}
          {moderatorsList[user._id] && (
            <button
              className="bg-red-500 p-1 px-1.5 md:px-2 2xl:px-2.5 3xl:px-3 rounded-full text-xsm md:text-mxs 2xl:text-sm 3xl:text-base text-white dark:text-darkLight mx-1 hover:bg-red-600 hover:scale-105 transition-all"
              onClick={() => removeMember(member)}
            >
              Remove
            </button>
          )}

          {/* options */}
          {moderatorsList[user._id] && member._id !== user._id && (
            <button
              className="dropDownToggle"
              title="Options"
              onClick={toggleDropdown}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                className="fil-slate-400 inline dropDownToggle dark:fill-darkLight"
                viewBox="0 0 16 16"
              >
                <path
                  className="dropDownToggle"
                  d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
                />
              </svg>
            </button>
          )}
        </div>
      )}

      <MemberActions
        showDropdown={showDropdown}
        setShowDropdown={setShowDropdown}
        moderatorsList={moderatorsList}
        member={member}
        dismissModerator={dismissModerator}
        makeModerator={makeModerator}
      />
    </div>
  );
}

export default withRouter(Member);
