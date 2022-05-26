import { useState, useEffect } from "react";
import UserModal from "../../UserModal";
import ReplyActions from "./ReplyActions";
import ReplyOptions from "./ReplyOptions";
import CommentFile from "../Comment/CommentFile";

function Reply({
  reply,
  user,
  isModerator,
  setReplies,
  forumId,
  postId,
  commentId,
  comments,
  setComments,
}) {
  const [isAuthor, setIsAuthor] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [overName, setOverName] = useState(false);
  const [overModal, setOverModal] = useState(false);

  useEffect(() => {
    // check if author is the same as user
    if (user && user._id === reply.author._id) {
      setIsAuthor(true);
    } else {
      setIsAuthor(false);
    }

    return () => {
      setIsAuthor(false);
    };
  }, [user, reply.author]);

  useEffect(() => {
    !overName && !overModal ? setHovering(false) : setHovering(true);
  }, [overName, overModal]);

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
    <div className="grid grid-cols-10 my-1.5 w-full px-2 relative">
      {/* picture */}
      {reply.author.picture ? (
        <img
          src={
            reply.author.picture?.includes("googleusercontent")
              ? reply.author.picture
              : `/uploads/images/${reply.author.picture}`
          }
          alt=""
          className="rounded-full inline h-8 mx-1"
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          className="inline mx-1 col-span-1 mt-0.5 fill-[#818181] dark:fill-darkLight"
          viewBox="0 0 16 16"
        >
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
          <path
            fillRule="evenodd"
            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
          />
        </svg>
      )}

      {/* username and reply */}
      <div className="flex flex-col col-span-9 relative">
        <div className="flex flex-col mx-2 bg-[#f3f3f3] dark:bg-[#3e3d3d] p-2 rounded-lg">
          {/* name */}
          <p
            className="text-mxs font-semibold pr-1 dark:text-darkLight hover:underline inline self-start"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            {reply.author.firstName} {reply.author.lastName}
          </p>

          {/* text */}
          <p className="text-mxs dark:text-darkLight">{reply.text}</p>

          {/* options */}
          <button
            className="absolute top-1 right-3 dropDownToggle"
            title="Options"
            onClick={toggleOptions}
            hidden={!isAuthor && !isModerator}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              className="fil-[#65676b] dark:fill-gray-300 inline dropDownToggle"
              viewBox="0 0 16 16"
            >
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
            </svg>
          </button>

          {/* options dropdown */}
          <ReplyOptions
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            replyId={reply._id}
            user={user}
            isModerator={isModerator}
            setReplies={setReplies}
            forumId={forumId}
            postId={postId}
            commentId={commentId}
            comments={comments}
            setComments={setComments}
          />
        </div>

        <CommentFile
          file={reply?.file}
          type={reply?.originalFileName?.type}
          name={reply?.originalFileName?.name}
          size={reply?.originalFileName?.size}
          small={true}
        />

        {/* reply actions */}
        <ReplyActions
          reply={reply}
          user={user}
          setReplies={setReplies}
          forumId={forumId}
          postId={postId}
          commentId={commentId}
        />
      </div>

      {/* user modal */}
      <UserModal
        hovering={hovering}
        setOverModal={setOverModal}
        receiver={reply.author}
      />
    </div>
  );
}

export default Reply;
