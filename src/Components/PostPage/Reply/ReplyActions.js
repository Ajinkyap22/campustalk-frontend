import { PostContext } from "../../../Contexts/PostContext";
import { useState, useEffect, useContext } from "react";
import moment from "moment";
import axios from "axios";

function ReplyActions({
  reply,
  setReplies,
  forumId,
  postId,
  commentId,
  user,
  isGuest = false,
}) {
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [posts, setPosts] = useContext(PostContext);

  useEffect(() => {
    if (!user && !isGuest) return;

    if (isGuest) {
      // check if reply is upvoted by guest
      reply.upvotes.indexOf(process.env.REACT_APP_GUEST_ID) !== -1
        ? setUpvoted(true)
        : setUpvoted(false);

      // check if reply is downvoted
      reply.downvotes.indexOf(process.env.REACT_APP_GUEST_ID) !== -1
        ? setDownvoted(true)
        : setDownvoted(false);
    } else {
      // check if post is upvoted
      reply.upvotes.indexOf(user._id) !== -1
        ? setUpvoted(true)
        : setUpvoted(false);

      // check if post is downvoted
      reply.downvotes.indexOf(user._id) !== -1
        ? setDownvoted(true)
        : setDownvoted(false);
    }
  }, [user, reply.upvotes, reply.downvotes, isGuest]);

  function handleUpvote() {
    if (!user && !isGuest) return;

    if (isGuest) {
      if (upvoted) {
        let updatedReply = {
          ...reply,
          upvotes: reply.upvotes.filter(
            (id) => id !== process.env.REACT_APP_GUEST_ID
          ),
        };

        updateReplies(updatedReply);
        setUpvoted(false);
      } else {
        let updatedReply = {
          ...reply,
          upvotes: [...reply.upvotes, process.env.REACT_APP_GUEST_ID],
          downvotes: reply.downvotes.filter(
            (id) => id !== process.env.REACT_APP_GUEST_ID
          ),
        };

        updateReplies(updatedReply);
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
            `https://campustalk-api.herokuapp.com/api/forums/${forumId}/posts/${postId}/comments/${commentId}/replies/${reply._id}/unupvote`,
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
            `https://campustalk-api.herokuapp.com/api/forums/${forumId}/posts/${postId}/comments/${commentId}/replies/${reply._id}/upvote`,
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
  }

  function handleDownvote() {
    if (!user && !isGuest) return;

    if (isGuest) {
      if (downvoted) {
        let updatedReply = {
          ...reply,
          downvotes: reply.downvotes.filter(
            (id) => id !== process.env.REACT_APP_GUEST_ID
          ),
        };

        updateReplies(updatedReply);
        setDownvoted(false);
      } else {
        let updatedReply = {
          ...reply,
          downvotes: [...reply.downvotes, process.env.REACT_APP_GUEST_ID],
          upvotes: reply.upvotes.filter(
            (id) => id !== process.env.REACT_APP_GUEST_ID
          ),
        };

        updateReplies(updatedReply);
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
            `https://campustalk-api.herokuapp.com/api/forums/${forumId}/posts/${postId}/comments/${commentId}/replies/${reply._id}/undownvote`,
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
            `https://campustalk-api.herokuapp.com/api/forums/${forumId}/posts/${postId}/comments/${commentId}/replies/${reply._id}/downvote`,
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
  }

  function updateReplies(data) {
    setReplies((prevState) =>
      prevState.map((c) => (data._id === c._id ? data : c))
    );

    if (isGuest) {
      // update posts
      setPosts((prevState) =>
        prevState.map((p) => {
          if (p._id === postId) {
            return {
              ...p,
              comments: p.comments.map((c) => {
                if (c._id === commentId) {
                  return {
                    ...c,
                    replies: c.replies.map((r) =>
                      data._id === r._id ? data : r
                    ),
                  };
                }
                return c;
              }),
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
