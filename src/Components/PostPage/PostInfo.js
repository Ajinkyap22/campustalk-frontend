import { UserContext } from "../../Contexts/UserContext";
import { useState, useEffect, useContext } from "react";
import moment from "moment";
import Options from "../Post/Options";
import UserModal from "../UserModal";

function PostInfo({ post }) {
  const [showOptions, setShowOptions] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [overName, setOverName] = useState(false);
  const [overModal, setOverModal] = useState(false);
  const [user] = useContext(UserContext);

  useEffect(() => {
    if (post.anonymous) return;

    !overName && !overModal ? setHovering(false) : setHovering(true);
  }, [overName, overModal, post.anonymous]);

  function toggleOptions() {
    setShowOptions(!showOptions);
  }

  function handleHover() {
    setTimeout(() => {
      setOverName(true);
    }, 500);
  }

  function handleLeave() {
    setTimeout(() => {
      setOverName(false);
    }, 500);
  }

  return (
    <div className="my-1 px-2 w-full max-w-[32rem] relative">
      {/* forum name */}
      <p
        to={`/forums/${post.forum._id}`}
        className="p-1 py-1.5 text-sm font-semibold text-gray-700 dark:text-gray-300"
      >
        {post.forum.forumName}
      </p>
      <hr className="dark:border-t dark:border-secondary" />

      <div className="flex w-full my-1 py-1 relative">
        {/* user profile pic */}
        {post.anonymous || !post.author.picture ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="38"
            className="inline mx-1 h-10 fill-[#818181] dark:fill-darkLight"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        ) : (
          <img
            src={
              post.author.picture.includes("googleusercontent")
                ? post.author.picture
                : `/uploads/images/${post.author.picture}`
            }
            alt=""
            className="rounded-full inline h-10 mx-1"
          />
        )}

        <div className="inline mx-1 relative w-full">
          {/* user name */}
          <span
            className={`text-sm dark:text-darkLight ${
              !post.anonymous &&
              post.author._id !== user._id &&
              "hover:underline"
            }`}
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            {post.anonymous
              ? " Anonymous"
              : `${post.author.firstName} ${post.author.lastName}`}
          </span>

          {/* post options */}
          <button
            className="absolute top-0 right-0 dropDownToggle"
            title="Options"
            onClick={toggleOptions}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              className="fil-[#65676b] dark:fill-gray-300 inline rotate-90 dropDownToggle"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
          </button>

          {/* dropdown */}
          <Options
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            author={post.author}
            postId={post._id}
            forum={post.forum}
          />

          {/* date */}
          <p className="text-xs text-secondary dark:text-gray-300">
            {moment(post.timestamp).fromNow()}
          </p>
        </div>

        {/* user modal */}
        <UserModal
          hovering={hovering}
          setOverModal={setOverModal}
          receiver={post.author}
        />
      </div>
    </div>
  );
}

export default PostInfo;
