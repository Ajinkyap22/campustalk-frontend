import { TabContext } from "../../Contexts/TabContext";
import { UserContext } from "../../Contexts/UserContext";
import { GuestContext } from "../../Contexts/GuestContext";
import { useEffect, useContext, useState } from "react";
import { demoForum } from "../../Config/guestConfig";
import axios from "axios";
import Nav from "../Navbar/Nav";
import List from "./List";

function Forums({ title }) {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [user] = useContext(UserContext);
  const [isGuest] = useContext(GuestContext);
  const [forums, setForums] = useState([]);
  const [forumsTab, setForumsTab] = useState("userForums");

  useEffect(() => {
    document.title = title || `Your Forums | CampusTalk`;
  }, [title]);

  useEffect(() => {
    setActiveTab("forums");
  }, [activeTab]);

  useEffect(() => {
    if (isGuest) {
      setForums([demoForum]);
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/forums/`)
        .then((res) => {
          setForums(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, []);

  function toggleTab() {
    setForumsTab(forumsTab === "userForums" ? "allForums" : "userForums");
  }

  return (
    <main className="w-full min-h-full overflow-visible bg-[#F0F2F5] dark:bg-dark">
      <Nav />

      <div className="my-5 mt-8 text-center">
        <button
          className={`p-2 md:p-3 shadow text-xs md:text-sm rounded-l ${
            forumsTab === "userForums"
              ? "bg-primary-light text-white"
              : "bg-white dark:bg-zinc-700 dark:text-darkLight dark:hover:bg-gray-600"
          }`}
          onClick={toggleTab}
        >
          My Forums
        </button>
        <button
          className={`p-2 md:p-3 shadow text-xs md:text-sm rounded-r ${
            forumsTab === "allForums"
              ? "bg-primary-light text-white"
              : "bg-white dark:bg-zinc-700 dark:text-darkLight hover:bg-blue-100 dark:hover:bg-gray-600"
          }`}
          onClick={toggleTab}
        >
          All Forums
        </button>
      </div>

      {isGuest ? (
        <List forums={forums} forumsTab={forumsTab} isGuest={isGuest} />
      ) : (
        <List
          forums={forumsTab === "userForums" && user ? user.forums : forums}
          forumsTab={forumsTab}
        />
      )}
    </main>
  );
}

export default Forums;
