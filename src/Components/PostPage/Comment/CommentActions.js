import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../../Contexts/UserContext";
import { PostContext } from "../../../Contexts/PostContext";
import moment from "moment";
import axios from "axios";

function CommentActions({
  comment,
  setComments,
  forumId,
  postId,
  toggleReplies,
  isGuest = false,
}) {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [user] = useContext(UserContext);
  const [posts, setPosts] = useContext(PostContext);

  useEffect(() => {
    if (!user && !isGuest) return;

    if (isGuest) {
      // check if comment is upvoted by guest
      comment.upvotes.indexOf(process.env.REACT_APP_GUEST_ID) !== -1
        ? setUpvoted(true)
        : setUpvoted(false);

      // check if comment is downvoted
      comment.downvotes.indexOf(process.env.REACT_APP_GUEST_ID) !== -1
        ? setDownvoted(true)
        : setDownvoted(false);
    } else {
      // check if comment is upvoted
      comment.upvotes.indexOf(user._id) !== -1
        ? setUpvoted(true)
        : setUpvoted(false);
      // check if comment is downvoted
      comment.downvotes.indexOf(user._id) !== -1
        ? setDownvoted(true)
        : setDownvoted(false);
    }
  }, [user, comment.upvotes, comment.downvotes, isGuest]);

  function handleUpvote() {
    if (!user && !isGuest) return;

    if (isGuest) {
      if (upvoted) {
        let updatedComment = {
          ...comment,
          upvotes: comment.upvotes.filter(
            (id) => id !== process.env.REACT_APP_GUEST_ID
          ),
        };

        updateComments(updatedComment);
        setUpvoted(false);
      } else {
        let updatedComment = {
          ...comment,
          upvotes: [...comment.upvotes, process.env.REACT_APP_GUEST_ID],
          downvotes: comment.downvotes.filter(
            (id) => id !== process.env.REACT_APP_GUEST_ID
          ),
        };

        updateComments(updatedComment);
        setUpvoted(true);
      }
    } else {
      let headers = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.token
          }`,
        },
      };

      if (upvoted) {
        axios
          .put(
            `${process.env.REACT_APP_API_URL}/api/forums/${forumId}/posts/${postId}/comments/${comment._id}/unupvote`,
            { id: user._id },
            headers
          )
          .then((res) => {
            updateComments(res.data);
            setUpvoted(false);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        axios
          .put(
            `${process.env.REACT_APP_API_URL}/api/forums/${forumId}/posts/${postId}/comments/${comment._id}/upvote`,
            {
              id: user._id,
            },
            headers
          )
          .then((res) => {
            updateComments(res.data);
            setUpvoted(true);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }

  function handleDownvote() {
    if (!user && !isGuest) return;

    if (isGuest) {
      if (downvoted) {
        let updatedComment = {
          ...comment,
          downvotes: comment.downvotes.filter(
            (id) => id !== process.env.REACT_APP_GUEST_ID
          ),
        };

        updateComments(updatedComment);
        setDownvoted(false);
      } else {
        let updatedComment = {
          ...comment,
          downvotes: [...comment.downvotes, process.env.REACT_APP_GUEST_ID],
          upvotes: comment.upvotes.filter(
            (id) => id !== process.env.REACT_APP_GUEST_ID
          ),
        };

        updateComments(updatedComment);
        setDownvoted(true);
      }
    } else {
      let headers = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user"))?.token
          }`,
        },
      };

      if (downvoted) {
        axios
          .put(
            `${process.env.REACT_APP_API_URL}/api/forums/${forumId}/posts/${postId}/comments/${comment._id}/undownvote`,
            { id: user._id },
            headers
          )
          .then((res) => {
            updateComments(res.data);
            setDownvoted(false);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        axios
          .put(
            `${process.env.REACT_APP_API_URL}/api/forums/${forumId}/posts/${postId}/comments/${comment._id}/downvote`,
            {
              id: user._id,
            },
            headers
          )
          .then((res) => {
            updateComments(res.data);
            setDownvoted(true);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }

  function updateComments(data) {
    setComments((prevState) =>
      prevState.map((c) => (data._id === c._id ? data : c))
    );

    if (isGuest) {
      setPosts((prevState) =>
        prevState.map((p) => {
          if (p._id === postId) {
            return {
              ...p,
              comments: p.comments.map((c) => (data._id === c._id ? data : c)),
            };
          }
          return p;
        })
      );
    }
  }

  return (
    <div className="mx-2 inline">
      {/* upvote */}
      <button title="Upvote Comment" onClick={handleUpvote}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          fill={upvoted ? "#0F8CFF" : "#484848"}
          className="inline mx-1"
          viewBox="0 0 256 256"
        >
          <rect width="256" height="256" fill="none"></rect>
          <path
            d="M32,120l96-96,96,96H176v88a8,8,0,0,1-8,8H88a8,8,0,0,1-8-8V120Z"
            fill={upvoted ? "#0F8CFF" : "none"}
            className={`${
              upvoted
                ? "stroke-[#0F8CFF]"
                : "stroke-[#484848] dark:stroke-darkLight"
            }`}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          ></path>
        </svg>
      </button>

      <span className="text-mxs dark:text-darkLight">
        {comment.upvotes.length - comment.downvotes.length}
      </span>

      {/* downvote */}
      <button title="Downvote Comment" onClick={handleDownvote}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          fill={downvoted ? "red" : "#484848"}
          className="inline mx-1"
          viewBox="0 0 256 256"
        >
          <rect width="256" height="256" fill="none"></rect>
          <path
            d="M32,136l96,96,96-96H176V48a8,8,0,0,0-8-8H88a8,8,0,0,0-8,8v88Z"
            fill={downvoted ? "red" : "none"}
            className={`${
              downvoted
                ? "stroke-red-500"
                : "stroke-[#484848] dark:stroke-darkLight"
            }`}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
          ></path>
        </svg>
      </button>

      <button
        className="text-mxs dark:text-gray-300 mx-2 hover:underline"
        onClick={toggleReplies}
      >
        Reply
      </button>

      {/* timestamp */}
      <span className="text-xs text-secondary dark:text-gray-300 mx-2">
        {moment(comment.timestamp).fromNow()}
      </span>
    </div>
  );
}

export default CommentActions;
