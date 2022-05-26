import { UserContext } from "../../../Contexts/UserContext";
import { useState, useContext, useEffect } from "react";
import CommentOptions from "./CommentOptions";
import CommentFile from "./CommentFile";
import CommentActions from "./CommentActions";
import UserModal from "../../UserModal";
import Reply from "../Reply/Reply";
import ReplyForm from "../Reply/ReplyForm";
import axios from "axios";

function Comment({
  moderators,
  comment,
  forumId,
  forumName,
  postId,
  comments,
  setComments,
}) {
  const [showOptions, setShowOptions] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [user, setUser] = useContext(UserContext);
  const [isModerator, setIsModerator] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [overName, setOverName] = useState(false);
  const [overModal, setOverModal] = useState(false);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState([]);

  useEffect(() => {
    // check if author is the same as user
    if (user && user._id === comment.author._id) {
      setIsAuthor(true);
    } else {
      setIsAuthor(false);
    }

    return () => {
      setIsAuthor(false);
    };
  }, [user, comment.author]);

  useEffect(() => {
    if (moderators.includes(user._id)) {
      setIsModerator(true);
    } else {
      setIsModerator(false);
    }
  }, [moderators, user]);

  useEffect(() => {
    !overName && !overModal ? setHovering(false) : setHovering(true);
  }, [overName, overModal]);

  useEffect(() => {
    // get replies
    if (!comment.replies.length) return;

    axios
      .get(
        `/api/forums/${forumId}/posts/${postId}/comments/${comment._id}/replies`
      )
      .then((res) => {
        setReplies(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

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

  function toggleReplies() {
    setShowReplies(!showReplies);
  }

  return (
    <div className="grid grid-cols-10 my-1.5 w-full px-2 relative">
      {/* author picture */}
      {comment.author.picture ? (
        <img
          src={
            comment.author.picture.includes("googleusercontent")
              ? comment.author.picture
              : `/uploads/images/${comment.author.picture}`
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

      {/* user name & comment */}
      <div className="flex flex-col col-span-9 relative">
        <div className="flex flex-col mx-2 bg-[#f3f3f3] dark:bg-[#3e3d3d] p-2 rounded-lg">
          {/* name */}
          <p
            className="text-mxs font-semibold pr-1 dark:text-darkLight hover:underline inline self-start"
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
          >
            {comment.author.firstName} {comment.author.lastName}
          </p>

          {/* text */}
          <p className="text-mxs dark:text-darkLight">{comment.text}</p>

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
          <CommentOptions
            showOptions={showOptions}
            setShowOptions={setShowOptions}
            author={comment.author}
            forumId={forumId}
            postId={postId}
            commentId={comment._id}
            comments={comments}
            setComments={setComments}
            isAuthor={isAuthor}
            user={user}
            setUser={setUser}
            isModerator={isModerator}
          />
        </div>

        {/* file */}
        {comment.file && (
          <CommentFile
            file={comment?.file}
            type={comment?.originalFileName?.type}
            name={comment?.originalFileName?.name}
            size={comment?.originalFileName?.size}
          />
        )}

        {/* actions */}
        <CommentActions
          comment={comment}
          setComments={setComments}
          toggleReplies={toggleReplies}
        />

        {/* view reply button */}
        {replies.length > 0 && (
          <button
            className="text-sm text-left mt-1 dark:text-gray-300 mx-2 hover:underline"
            onClick={toggleReplies}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline mx-1 w-4 fill-[#818181] dark:fill-darkLight"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M1.5 1.5A.5.5 0 0 0 1 2v4.8a2.5 2.5 0 0 0 2.5 2.5h9.793l-3.347 3.346a.5.5 0 0 0 .708.708l4.2-4.2a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 8.3H3.5A1.5 1.5 0 0 1 2 6.8V2a.5.5 0 0 0-.5-.5z"
              />
            </svg>

            <span>{showReplies ? "Hide Replies" : "View Replies"}</span>
          </button>
        )}

        {/* replies */}
        {showReplies && (
          <div className="flex flex-col py-1">
            {replies.map((reply, i) => (
              <Reply
                key={i}
                reply={reply}
                user={user}
                isModerator={isModerator}
                forumId={forumId}
                postId={postId}
                commentId={comment._id}
                setReplies={setReplies}
                comments={comments}
                setComments={setComments}
              />
            ))}

            <ReplyForm
              user={user}
              replies={replies}
              forumId={forumId}
              forumName={forumName}
              postId={postId}
              commentId={comment._id}
              commentAuthorName={comment.author.firstName}
              commentAuthorMail={comment.author.email}
              setReplies={setReplies}
              comments={comments}
              setComments={setComments}
              commentAuthorId={comment.author._id}
            />
          </div>
        )}

        {/* user modal */}
        <UserModal
          hovering={hovering}
          setOverModal={setOverModal}
          receiver={comment.author}
        />
      </div>
    </div>
  );
}

export default Comment;
