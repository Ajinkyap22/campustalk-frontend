import { GuestContext } from "../../Contexts/GuestContext";
import { ForumContext } from "../../Contexts/ForumContext";
import { PostContext } from "../../Contexts/PostContext";
import { useContext } from "react";
import { withRouter } from "react-router-dom";
import { demoForum, demoPosts } from "../../Config/guestConfig";

function GuestButton({ history }) {
  const [isGuest, setIsGuest] = useContext(GuestContext);
  const [forums, setForums] = useContext(ForumContext);
  const [posts, setPosts] = useContext(PostContext);

  function handleClick() {
    // set guest to true
    setIsGuest(true);

    // set forum context to demo forum
    setForums([demoForum]);

    // set post context to demo posts
    setPosts(demoPosts);

    // redirect to feed
    history.push("/feed");
  }

  return (
    <button
      onClick={handleClick}
      className="px-5 py-2 text-xs md:text-sm lg:text-base border shadow bg-white dark:bg-darkLight w-3/4 md:w-2/3 hover:scale-105 transition-transform"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-4 md:w-5 inline mr-5 stroke-[#818181]"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
      Continue as a Guest
    </button>
  );
}

export default withRouter(GuestButton);
