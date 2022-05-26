import { UserContext } from "../../Contexts/UserContext";
import { TabContext } from "../../Contexts/TabContext";
import { NotificationContext } from "../../Contexts/NotificationContext";
import { NavLink } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import Dropdown from "./Dropdown";
import Logo from "../Logo";
import Notifications from "./Notifications";
import MobileNav from "./MobileNav";
import axios from "axios";

function Nav() {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [showDropdown, setShowDropdown] = useState(false);
  const [
    notifications,
    setNotifications,
    showNotifications,
    setShowNotifications,
    notificationCount,
    setNotificationCount,
  ] = useContext(NotificationContext);

  const [user] = useContext(UserContext);

  useEffect(() => {
    if (!user) return;

    axios.get(`/api/notifications/${user._id}`).then((res) => {
      let newNotifications = res.data;
      let count = 0;

      newNotifications.map((notification) => {
        if (notification.seen.indexOf(user._id) === -1) {
          notification.hasSeen = false;
          count++;
        } else {
          notification.hasSeen = true;
        }
      });

      setNotifications(newNotifications);
      setNotificationCount(count);
    });
  }, [user]);

  useEffect(() => {
    let mounted = true;

    return () => {
      mounted = false;
    };
  }, []);

  // switch tab on button click
  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <nav className="sticky top-0 z-30 w-full flex bg-white dark:bg-darkSecondary pt-2 2xl:pt-3.5 shadow-md justify-between lg:justify-around items-center">
      {/* logo */}
      <div className="hidden lg:block mb-2 2xl:mb-4">
        <Logo width="120" height="40" />
      </div>

      {/* Mid part */}
      <div className="hidden lg:block tabs">
        {/* feed */}
        <NavLink
          to={"/feed"}
          onClick={() => handleClick("feed")}
          className={`mx-4 text-sm 2xl:text-lg py-3 2xl:py-2.5 3xl:text-xl 3xl:py-3 px-2 ${
            activeTab === "feed"
              ? "border-b-[3px] border-primary text-primary dark:text-primary-dark"
              : "dark:text-darkLight"
          }`}
        >
          Feed
        </NavLink>

        {/* chats */}
        <NavLink
          to={"/chats"}
          onClick={() => handleClick("chats")}
          className={`mx-4 text-sm 2xl:text-lg py-3 2xl:py-2.5 3xl:text-xl 3xl:py-3 px-2 ${
            activeTab === "chats"
              ? "border-b-[3px] border-primary text-primary dark:text-primary-dark"
              : "dark:text-darkLight"
          }`}
        >
          Chats
        </NavLink>

        {/* forums */}
        <NavLink
          to={"/forums"}
          onClick={() => handleClick("forums")}
          className={`mx-4 text-sm 2xl:text-lg py-3 2xl:py-2.5 3xl:text-xl 3xl:py-3 px-2 ${
            activeTab === "forums"
              ? "border-b-[3px] border-primary text-primary dark:text-primary-dark"
              : "dark:text-darkLight"
          }`}
        >
          Forums
        </NavLink>

        {/* events */}
        <NavLink
          to={"/events"}
          onClick={() => handleClick("events")}
          className={`mx-4 text-sm 2xl:text-lg py-3 2xl:py-2.5 3xl:text-xl 3xl:py-3 px-2 ${
            activeTab === "events"
              ? "border-b-[3px] border-primary text-primary dark:text-primary-dark"
              : "dark:text-darkLight"
          }`}
        >
          Events
        </NavLink>
      </div>

      {/* user section */}
      <div className="hidden lg:flex items-center dropDownToggle">
        {/* notifications */}
        <button
          className="h-auto relative notifications"
          onClick={toggleNotifications}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="fill-[#818181] inline dark:fill-gray-300 dropDownToggle w-5 2xl:w-7 3xl:w-8"
            viewBox="0 0 16 16"
          >
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zM8 1.918l-.797.161A4.002 4.002 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4.002 4.002 0 0 0-3.203-3.92L8 1.917zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5.002 5.002 0 0 1 13 6c0 .88.32 4.2 1.22 6z" />
          </svg>

          {notificationCount > 0 && (
            <span className="text-xsm absolute top-0 left-2 inline bg-[red] rounded-full px-1.5 text-white">
              {notificationCount}
            </span>
          )}
        </button>

        {/* profile */}
        <button
          className="mx-2 2xl:mx-3 dropDownToggle profile"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          {/* avatar */}
          {user && user.picture ? (
            <img
              src={
                user.picture.includes("googleusercontent")
                  ? user.picture
                  : `/uploads/images/${user.picture}`
              }
              alt=""
              className="rounded-full inline h-6 2xl:h-9 3xl:h-10 w-auto ml-1 dropDownToggle"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline ml-2 mr-1 align-middle dropDownToggle w-5 2xl:w-7 3xl:w-8 fill-[#818181] dark:fill-gray-300"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
          )}

          {/* dropdown */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline align-middle mx-1 stroke-[#818181] dark:stroke-gray-300 dropDownToggle w-4 2xl:w-5"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* notifications */}
      {showNotifications && (
        <Notifications
          showNotifications={showNotifications}
          setShowNotifications={setShowNotifications}
          notifications={notifications}
          setNotifications={setNotifications}
          setNotificationCount={setNotificationCount}
          classes="absolute max-h-[80vh] p-0 top-14 2xl:top-16 right-2 z-20 bg-white dark:bg-[#3e3d3d] shadow-base flex flex-col max-w-[32rem] 2xl:max-w-[34rem] 3xl:max-w-[36rem] rounded-lg overflow-auto postData"
        />
      )}

      {/*dropdown  */}
      <Dropdown showDropdown={showDropdown} setShowDropdown={setShowDropdown} />

      {/* mobile nav */}
      <MobileNav
        user={user}
        handleClick={handleClick}
        activeTab={activeTab}
        notificationCount={notificationCount}
      />
    </nav>
  );
}

export default Nav;
