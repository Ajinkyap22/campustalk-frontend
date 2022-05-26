import { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";

function ReplyActions({ reply, setReplies, forumId, postId, commentId, user }) {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);

  useEffect(() => {
    if (!user) return;
    // check if post is upvoted
    reply.upvotes.indexOf(user._id) !== -1
      ? setUpvoted(true)
      : setUpvoted(false);

    // check if post is downvoted
    reply.downvotes.indexOf(user._id) !== -1
      ? setDownvoted(true)
      : setDownvoted(false);
  }, [user, reply.upvotes, reply.downvotes]);

  function handleUpvote() {
    if (!user) return;

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
          `/api/forums/${forumId}/posts/${postId}/comments/${commentId}/replies/${reply._id}/unupvote`,
          { id: user._id },
          headers
        )
        .then((res) => {
          updateReplies(res.data);
          setUpvoted(false);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .put(
          `/api/forums/${forumId}/posts/${postId}/comments/${commentId}/replies/${reply._id}/upvote`,
          {
            id: user._id,
          },
          headers
        )
        .then((res) => {
          updateReplies(res.data);
          setUpvoted(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function handleDownvote() {
    if (!user) return;

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
          `/api/forums/${forumId}/posts/${postId}/comments/${commentId}/replies/${reply._id}/undownvote`,
          { id: user._id },
          headers
        )
        .then((res) => {
          updateReplies(res.data);
          setDownvoted(false);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .put(
          `/api/forums/${forumId}/posts/${postId}/comments/${commentId}/replies/${reply._id}/downvote`,
          {
            id: user._id,
          },
          headers
        )
        .then((res) => {
          updateReplies(res.data);
          setDownvoted(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function updateReplies(data) {
    setReplies((prevState) =>
      prevState.map((c) => (data._id === c._id ? data : c))
    );
  }

  return (
    <div className="mx-2 inline">
      {/* upvote */}
      <button title="Upvote Reply" onClick={handleUpvote}>
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
        {reply.upvotes.length - reply.downvotes.length}
      </span>

      {/* downvote */}
      <button title="Downvote Reply" onClick={handleDownvote}>
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

      {/* timestamp */}
      <span className="text-xs text-secondary dark:text-gray-300 mx-2">
        {moment(reply.timestamp).fromNow()}
      </span>
    </div>
  );
}

export default ReplyActions;
