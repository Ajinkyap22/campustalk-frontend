import { UserContext } from "../../Contexts/UserContext";
import { ForumContext } from "../../Contexts/ForumContext";
import { PostContext } from "../../Contexts/PostContext";
import { EventContext } from "../../Contexts/EventContext";
import { NotificationContext } from "../../Contexts/NotificationContext";
import { SocketContext } from "../../Contexts/SocketContext";
import { NavLink } from "react-router-dom";
import { useContext, useRef } from "react";
import useOutsideAlerter from "../../Hooks/useOutsideAlerter";

function Dropdown({ showDropdown, setShowDropdown }) {
  const [user, setUser] = useContext(UserContext);
  const [forums, setForums] = useContext(ForumContext);
  const [posts, setPosts] = useContext(PostContext);
  const [events, setEvents] = useContext(EventContext);
  const [notifications, setNotifications] = useContext(NotificationContext);
  const [socket] = useContext(SocketContext);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowDropdown);

  function handleClick() {
    setShowDropdown(!showDropdown);
  }

  function logout() {
    handleClick();
    localStorage.removeItem("user");
    setUser(undefined);
    socket.current.emit("logout", user._id);
    setForums([]);
    setPosts([]);
    setEvents([]);
    setNotifications([]);
  }

  return (
    <div
      className="absolute bg-white shadow-base p-2 2xl:p-2.5 top-14 2xl:top-15 3xl:top-20 right-28 2xl:right-36 3xl:right-52 z-30 rounded dark:bg-darkSecondary"
      hidden={showDropdown ? false : true}
      ref={wrapperRef}
    >
      <ul>
        {/* profile */}
        <li
          className="p-2 2xl:p-2.5 text-sm 2xl:text-lg 3xl:p-3 3xl:text-xl dark:text-darkLight"
          onClick={handleClick}
        >
          <NavLink to="/profile">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline mr-2 fill-[#818181] dark:fill-darkLight w-4 2xl:w-5 3xl:w-6"
              viewBox="0 0 16 18"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
            Profile
          </NavLink>
        </li>
        <hr />

        {/* logout */}
        <li
          className="p-2 2xl:p-2.5 text-sm 2xl:text-lg 3xl:p-3 3xl:text-xl dark:text-darkLight"
          onClick={logout}
        >
          <NavLink to="/">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline mr-2 fill-[#818181] dark:fill-darkLight w-4 2xl:w-5 3xl:w-6"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"
              />
              <path
                fillRule="evenodd"
                d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"
              />
            </svg>
            Log out
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Dropdown;
