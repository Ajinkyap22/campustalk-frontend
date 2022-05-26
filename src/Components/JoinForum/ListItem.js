import { useState, useContext } from "react";
import { JoinContext } from "./Join";

function ListItem({ forum, setShowAlert }) {
  const [joined, setJoined] = useState(false);
  const [joinList, setJoinList] = useContext(JoinContext);

  const handleJoin = (forumId) => {
    // limit join requests to 3 & show an alert modal if the user has already joined 3 forums
    if (joinList.length >= 3) {
      // set the alert modal to show
      setShowAlert(true);
      // hide overflow
      document.body.style.overflow = "hidden";
      return;
    }

    setJoined(true);
    setJoinList((joinList) => [...joinList, forumId]);
  };

  const handleCancel = (forumId) => {
    setJoined(false);
    setJoinList((joinList) => joinList.filter((id) => id !== forumId));
  };

  const actionHandler = (e, forumId) => {
    if (joined) {
      e.target.classList.remove("requested");
      handleCancel(forumId);
    } else {
      e.target.classList.add("requested");
      handleJoin(forumId);
    }
  };

  return (
    <tr className="text-center text-sm py-4 dark:bg-[#89b8ff]">
      <td className="text-xs lg:text-sm 2xl:text-lg pl-4">{forum.forumName}</td>
      <td className="text-xs lg:text-sm 2xl:text-lg">{forum.members.length}</td>
      <td>
        <button
          onClick={(e) => actionHandler(e, forum._id)}
          className="px-3 py-1 xl:py-1.5 my-2 text-xs lg:text-sm xl:my-2 2xl:text-lg 2xl:px-4 2xl:my-3 bg-primary border border-primary text-white rounded-full hover:bg-blue-700"
        >
          {joined ? "Cancel" : "Join"}
        </button>
      </td>
    </tr>
  );
}

export default ListItem;
