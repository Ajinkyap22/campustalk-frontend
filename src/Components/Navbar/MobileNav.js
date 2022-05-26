import { ModeContext } from "../../Contexts/ModeContext";
import { SocketContext } from "../../Contexts/SocketContext";
import { UserContext } from "../../Contexts/UserContext";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Logo from "../Logo";

function MobileNav({ handleClick, activeTab, notificationCount }) {
  const [mode, setMode] = useContext(ModeContext);
  const [user, setUser] = useContext(UserContext);
  const [socket] = useContext(SocketContext);
  const [toggle, setToggle] = useState(true);

  useEffect(() => {
    if (mode === "dark") {
      setToggle(false);
    } else {
      setToggle(true);
    }
  }, []);

  function toggleMode() {
    setToggle(!toggle);
    if (mode === "light") {
      setMode("dark");
      localStorage.setItem("mode", "dark");
    } else {
      setMode("light");
      localStorage.setItem("mode", "light");
    }
  }

  function logout() {
    localStorage.removeItem("user");
    setUser(undefined);
    socket.current.emit("logout", user._id);
  }

  return (
    <div className="lg:hidden w-full">
      {/* top part */}
      <div className="flex items-center pb-0.5 md:pb-1 justify-between my-1.5 md:my-2">
        {/* logo */}
        <div className="px-4 md:px-6 pb-1">
          <Logo width="110" height="30" />
        </div>

        <div className="flex items-center">
          {/* notifications */}
          <NavLink
            to={"/notifications"}
            onClick={() => handleClick("notifications")}
            className={`mobileNotifications mx-1.5 md:mx-2.5 text-xsm md:text-sm flex flex-col relative justify-between items-center pb-0.5 md:pb-1 px-1 ${
              activeTab === "notifications"
                ? "border-b-[2px] border-primary text-primary dark:text-primary-dark"
                : "dark:text-darkLight"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 md:w-6 mx-auto mb-1 fill-[#818181] dark:fill-gray-400"
              viewBox="0 0 16 16"
            >
              <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
            </svg>

            {notificationCount > 0 && (
              <span className="text-[0.55rem] lg:text-xsm absolute top-[-2px] lg:top-0 left-3 lg:left-2 inline bg-[red] rounded-full px-1.5 text-white">
                {notificationCount}
              </span>
            )}
          </NavLink>

          {/* dark mode toggle */}
          <button
            className="mb-1 md:mb-1.5 mx-1.5 md:mx-2.5"
            onClick={toggleMode}
          >
            {mode === "light" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 md:w-7 stroke-[#818181]"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 md:w-7 stroke-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            )}
          </button>

          {/* profile */}
          <NavLink
            to={"/profile"}
            onClick={() => handleClick("profile")}
            className={`mobileProfile mx-2 md:mx-3 text-xsm md:text-sm flex-col justify-between items-center pb-1 md:pb-1.5 px-1 ${
              activeTab === "profile"
                ? "border-b-[2px] border-primary text-primary dark:text-primary-dark"
                : "dark:text-darkLight"
            }`}
          >
            {user && user.picture ? (
              <img
                src={
                  user.picture.includes("googleusercontent")
                    ? user.picture
                    : `/uploads/images/${user.picture}`
                }
                alt=""
                className="rounded-full w-6 md:w-7 mx-auto"
              />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 md:w-7 mx-auto mb-0.5 fill-[#818181] dark:fill-gray-400"
                viewBox="0 0 16 16"
              >
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path
                  fillRule="evenodd"
                  d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                />
              </svg>
            )}
          </NavLink>

          {/* logout */}
          <NavLink
            to={"/"}
            onClick={logout}
            className="mr-1.5 md:mr-2.5 mx-1 md:mx-2 text-xsm md:text-sm flex items-center relative pb-0.5 md:pb-1 px-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 md:w-6 mx-auto mb-0.5 fill-[#818181] dark:fill-gray-400"
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
          </NavLink>
        </div>
      </div>

      <hr className="py-0.5 md:py-1 dark:border-t dark:border-secondary" />

      {/* main nav */}
      <div className="mobileTabs grid grid-cols-4 justify-center w-full justify-items-center items-center">
        {/* feed */}
        <NavLink
          to={"/feed"}
          onClick={() => handleClick("feed")}
          className={`mx-2 text-xsm flex flex-col items-center justify-between md:text-sm pb-0.5 md:pb-1 px-1 ${
            activeTab === "feed"
              ? "border-b-[2px] border-primary text-primary dark:text-primary-dark"
              : "dark:text-darkLight"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 mx-auto mb-0.5 stroke-[#818181] dark:stroke-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
          </svg>
          <span>Feed</span>
        </NavLink>

        {/* chats */}
        <NavLink
          to={"/chats"}
          onClick={() => handleClick("chats")}
          className={`chats mx-2 text-xsm flex flex-col items-center justify-between md:text-sm pb-0.5 md:pb-1 px-1 ${
            activeTab === "chats"
              ? "border-b-[2px] border-primary text-primary dark:text-primary-dark"
              : "dark:text-darkLight"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 mx-auto mb-0.5 stroke-[#818181] dark:stroke-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span>Chats</span>
        </NavLink>

        {/* forums */}
        <NavLink
          to={"/forums"}
          onClick={() => handleClick("forums")}
          className={`mobileForums mx-2 text-xsm flex flex-col items-center justify-between md:text-sm py-0.5 md:pb-1 px-1 ${
            activeTab === "forums"
              ? "border-b-[2px] border-primary text-primary dark:text-primary-dark"
              : "dark:text-darkLight"
          }`}
        >
          <svg
            viewBox="0 0 30 26"
            className="w-6 mx-auto mb-0.5 stroke-[#818181] dark:stroke-gray-400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.65756 4.13204C3.75999 6.08891 0.565918 7.72233 0.565918 7.76277C0.565918 7.85172 7.31794 11.2399 7.48775 11.2399C7.58479 11.2399 7.68182 10.8194 7.68182 10.3827C7.68182 10.0512 8.00527 9.76007 8.95136 9.25872C12.0161 7.61721 12.3961 7.37463 13.2613 6.59026C14.1427 5.77355 14.5632 5.62799 15.3233 5.8625C16.6818 6.29107 17.2964 7.8032 16.5605 8.89484C16.3099 9.25872 15.5093 9.67921 14.7896 9.83285C14.1589 9.96223 12.6549 10.6576 11.7492 11.2399C11.1347 11.628 10.9163 11.9514 10.9163 12.469C10.9163 12.7924 10.9487 12.8733 11.1832 13.0673C11.4258 13.2776 14.7492 14.9595 14.919 14.9595C15.0646 14.9595 28.981 7.8598 29.0134 7.77085C29.0376 7.70616 15.9541 1.09161 15.0322 0.703465L14.7492 0.590258L7.65756 4.13204Z"
              className="stroke-[#484848] dark:stroke-gray-300"
            />
            <path
              d="M14.2964 6.95415C14.1832 7.03502 14.0458 7.21291 13.9973 7.34229C13.8517 7.69 13.4716 7.9245 9.62259 10.035L8.93526 10.407L8.87057 14.8463C8.80588 19.3342 8.83822 23.6684 8.93526 23.9919C9.04038 24.3234 9.46895 24.3234 9.59025 23.9919C9.62259 23.8949 9.67111 20.9595 9.69537 17.4663L9.74388 11.1186L11.2398 10.3342C13.0107 9.3962 14.2803 8.84634 14.8382 8.76547C15.6226 8.66035 15.849 8.44202 15.849 7.79512C15.849 7.46359 15.8086 7.38272 15.5336 7.10779C15.2668 6.83286 15.1698 6.79243 14.8625 6.79243C14.6199 6.79243 14.4258 6.84903 14.2964 6.95415Z"
              className="stroke-[#484848] dark:stroke-gray-300"
            />
            <path
              d="M19.3584 13.8436L14.8543 16.1159L12.8813 15.1374C11.7977 14.5956 10.9001 14.1509 10.8759 14.1509C10.8516 14.1509 10.8354 15.283 10.8354 16.6576V19.1644L11.5632 19.5283C12.4931 19.9811 13.2937 20.539 14.1427 21.3072C14.5147 21.6388 14.8462 21.9137 14.8867 21.9137C14.919 21.9137 15.1616 21.7196 15.4204 21.4851C16.9163 20.1105 17.7007 19.6253 18.8085 19.3746C19.4716 19.2291 21.388 19.0835 22.7627 19.0835C23.2964 19.0835 23.8139 19.0593 23.919 19.035L24.0969 18.9865V15.2749C24.0969 12.0808 24.0807 11.5633 23.9756 11.5633C23.9109 11.5633 21.8328 12.5903 19.3584 13.8436Z"
              className="stroke-[#484848] dark:stroke-gray-300"
            />
            <path
              d="M5.78973 11.9757C5.76547 12.1132 5.74121 13.7709 5.74121 15.655V19.0836H6.71156H7.68191V15.8005V12.5256L6.85711 12.1294C6.3962 11.903 5.9838 11.7251 5.93528 11.7251C5.88676 11.7251 5.82207 11.8383 5.78973 11.9757Z"
              className="stroke-[#484848] dark:stroke-gray-300"
            />
          </svg>

          <span>Forums</span>
        </NavLink>

        {/* events */}
        <NavLink
          to={"/events"}
          onClick={() => handleClick("events")}
          className={`mobileEvents mx-2 text-xsm flex flex-col items-center justify-between md:text-sm py-0.5 md:pb-1 px-1 ${
            activeTab === "events"
              ? "border-b-[2px] border-primary text-primary dark:text-primary-dark"
              : "dark:text-darkLight"
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 mx-auto mb-1 fill-[#818181] dark:fill-gray-400"
            viewBox="0 0 16 16"
          >
            <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
          </svg>

          <span>Events</span>
        </NavLink>
      </div>
    </div>
  );
}

export default MobileNav;
