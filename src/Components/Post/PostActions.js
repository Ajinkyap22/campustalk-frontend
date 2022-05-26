import { UserContext } from "../../Contexts/UserContext";
import { PostContext } from "../../Contexts/PostContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

function PostActions({
  id,
  forumId,
  upvotes,
  downvotes,
  comments,
  onPostClick,
  showCommentButton = true,
  setForumPosts,
}) {
  const [user] = useContext(UserContext);
  const [upvoted, setUpvoted] = useState(false);
  const [downvoted, setDownvoted] = useState(false);
  const [posts, setPosts] = useContext(PostContext);

  useEffect(() => {
    if (!user) return;
    // check if post is upvoted
    upvotes.indexOf(user._id) !== -1 ? setUpvoted(true) : setUpvoted(false);
    // check if post is downvoted
    downvotes.indexOf(user._id) !== -1
      ? setDownvoted(true)
      : setDownvoted(false);
  }, [user, upvotes, downvotes]);

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
          `/api/forums/${forumId}/posts/unupvote/${id}`,
          { id: user._id },
          headers
        )
        .then((res) => {
          updatePosts(res.data);
          setUpvoted(false);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .put(
          `/api/forums/${forumId}/posts/upvote/${id}`,
          {
            id: user._id,
          },
          headers
        )
        .then((res) => {
          updatePosts(res.data);
          setUpvoted(true);
          setDownvoted(false);
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
          `/api/forums/${forumId}/posts/undownvote/${id}`,
          { id: user._id },
          headers
        )
        .then((res) => {
          updatePosts(res.data);
          setDownvoted(false);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      axios
        .put(
          `/api/forums/${forumId}/posts/downvote/${id}`,
          {
            id: user._id,
          },
          headers
        )
        .then((res) => {
          updatePosts(res.data);
          setDownvoted(true);
          setUpvoted(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function updatePosts(data) {
    setPosts((prevState) =>
      prevState.map((post) => (data._id === post._id ? data : post))
    );

    if (setForumPosts) {
      setForumPosts((prevState) =>
        prevState.map((post) => (data._id === post._id ? data : post))
      );
    }
  }

  return (
    <div
      className={`w-full grid ${
        showCommentButton
          ? "grid-cols-3 px-1.5 md:px-2 lg:px-1.5 xl:px-2"
          : "grid-cols-2 px-4"
      } grid-flow-col py-0.5 md:py-1 lg:py-0.5 xl:py-1 2xl:py-1.5 border-t dark:border-light`}
    >
      {/* upvotes */}
      <div className="my-1 inline">
        <button onClick={handleUpvote} title="Upvote Post">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={upvoted ? "#0F8CFF" : "#484848"}
            className="inline mx-1 w-4 md:w-5 lg:w-4 xl:w-5 2xl:w-6"
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

        <span className="text-xs md:text-mxs lg:text-xs xl:text-mxs 2xl:text-base align-middle dark:text-darkLight">
          {upvotes.length - downvotes.length}
        </span>

        <button onClick={handleDownvote} title="Downvote Post">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={downvoted ? "red" : "#484848"}
            className="inline mx-1 w-4 md:w-5 lg:w-4 xl:w-5 2xl:w-6"
            viewBox="0 0 256 256"
          >
            <rect width="256" height="256" fill="none"></rect>
            <path
              d="M32,136l96,96,96-96H176V48a8,8,0,0,0-8-8H88a8,8,0,0,0-8,8v88Z"
              fill={downvoted ? "red" : "none"}
              stroke={downvoted ? "red" : "#484848"}
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
      </div>

      {/* comment */}
      <button
        className="my-1 mr-4"
        title="Post a comment"
        onClick={onPostClick}
        hidden={!showCommentButton}
      >
        <svg
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="inline mx-1 w-4 md:w-5 lg:w-4 xl:w-5 align-sub lg:align-middle"
        >
          <path
            d="M5.83333 6.66665H14.1667H5.83333ZM5.83333 9.99998H9.16667H5.83333ZM10 16.6666L6.66667 13.3333H4.16667C3.72464 13.3333 3.30072 13.1577 2.98816 12.8452C2.67559 12.5326 2.5 12.1087 2.5 11.6666V4.99998C2.5 4.55795 2.67559 4.13403 2.98816 3.82147C3.30072 3.50891 3.72464 3.33331 4.16667 3.33331H15.8333C16.2754 3.33331 16.6993 3.50891 17.0118 3.82147C17.3244 4.13403 17.5 4.55795 17.5 4.99998V11.6666C17.5 12.1087 17.3244 12.5326 17.0118 12.8452C16.6993 13.1577 16.2754 13.3333 15.8333 13.3333H13.3333L10 16.6666Z"
            className="stroke-[#484848] dark:stroke-gray-300"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-xs md:text-mxs lg:text-xs xl:text-mxs 2xl:text-base align-middle dark:text-gray-300">
          Comment
        </span>
      </button>

      {/* comment number */}
      <button
        className="text-xs md:text-mxs lg:text-xs xl:text-mxs 2xl:text-base my-1 text-right text-secondary dark:text-gray-400"
        title="See Comments"
        onClick={onPostClick}
      >
        {comments.length} {comments.length === 1 ? "Comment" : "Comments"}
      </button>
    </div>
  );
}

export default PostActions;
