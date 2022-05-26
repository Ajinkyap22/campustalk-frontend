import { UserContext } from "../../Contexts/UserContext";
import { ForumContext } from "../../Contexts/ForumContext";
import { PostContext } from "../../Contexts/PostContext";
import { EventContext } from "../../Contexts/EventContext";
import { useContext } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

function LeaveModal({
  forumName,
  forumId,
  showModal,
  action = "Leave",
  setShowModal,
  setForumPosts,
  ...props
}) {
  const [user, setUser] = useContext(UserContext);
  const [forums, setForums] = useContext(ForumContext);
  const [posts, setPosts] = useContext(PostContext);
  const [events, setEvents] = useContext(EventContext);

  function leaveForum() {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user"))?.token
        }`,
      },
    };

    let body = {
      id: user._id,
    };

    axios
      .post(`/api/forums/${forumId}/members/delete`, body, headers)
      .then((res) => {
        // remove forum from users forums
        setUser({
          ...user,
          forums: user.forums.filter((forum) => forumId !== forum._id),
        });

        // remove user from forum members
        setForums((prevForums) =>
          prevForums.map((forum) => {
            if (forumId === forum._id) {
              return {
                ...forum,
                members: res.data,
              };
            } else {
              return forum;
            }
          })
        );

        setShowModal(false);
        props.history.push(`/forums/${forumId}`);
      });
  }

  function deleteForum() {
    axios
      .delete(`/api/forums/delete/${forumId}`, {
        data: { id: user._id },
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      })
      .then(() => {
        setShowModal(false);
        // update forums
        setForums(forums.filter((f) => f._id !== forumId));

        setUser({
          ...user,
          forums: user.forums.filter((f) => f._id !== forumId),
          posts: user.posts.filter((p) => p.forum !== forumId),
        });

        // update posts
        setPosts(posts.filter((p) => p.forum !== forumId));

        // set forumPosts to empty array
        setForumPosts([]);

        // remove all events from forum
        setEvents(events.filter((e) => e.forum._id !== forumId));

        // redirecr
        props.history.push("/feed");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleClose() {
    setShowModal(false);
  }

  return (
    <div
      className="absolute left-[10%] xsm:left-[15%] lg:left-1/3 top-[40vh] bg-white mx-auto rounded text-center py-2 shadow-base z-20 w-[80%] xsm:w-[70%] md:w-[50%] lg:w-[30%] 2xl:w-[25%]"
      hidden={!showModal}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="mx-auto mt-3 mb-2 w-10 lg:w-12"
        fill="#626262"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
      </svg>

      <p className="p-4 text-sm lg:text-base">
        Are you sure you want to {action} {forumName}?
      </p>

      <div>
        <button
          className="border border-primary font-bold text-primary text-xs lg:text-sm px-4 py-2 rounded mx-2 mb-4 hover:bg-primary hover:text-white"
          onClick={handleClose}
        >
          Cancel
        </button>

        <button
          className="border border-red-500 bg-red-500 text-xs lg:text-sm px-4 py-2 text-white rounded mx-2 mb-4 hover:bg-red-600"
          onClick={action === "Leave" ? leaveForum : deleteForum}
        >
          {action} Forum
        </button>
      </div>
    </div>
  );
}

export default withRouter(LeaveModal);
