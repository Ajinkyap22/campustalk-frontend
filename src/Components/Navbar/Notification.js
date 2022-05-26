import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import LogoCropped from "../LogoCropped";

function Notification({
  notification,
  setNotifications,
  setShowNotifications,
  history,
  user,
}) {
  useEffect(() => {
    let mounted = true;

    if (mounted && !notification.hasSeen) {
      let headers = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
          }`,
        },
      };

      axios
        .put(
          `/api/notifications/${notification._id}/mark`,
          { userId: user._id },
          headers
        )
        .catch((err) => {
          console.error(err);
        });
    }

    return () => {
      // mark the notification as seen
      setNotifications((prev) =>
        prev.map((n) => {
          if (n._id === notification._id) {
            n.seen.push(user._id);
            n.hasSeen = true;
          }

          return n;
        })
      );

      mounted = false;
    };
  }, []);

  function handleClick(e) {
    if (e.target.classList.contains("delete")) return;

    if (
      notification.type === "joinRequest" ||
      notification.type === "postRequest"
    ) {
      history.push(`/forums/${notification.forum?._id}/${notification.type}s`);
    } else if (notification.type === "requestApproved") {
      history.push(`/forums/${notification.forum?._id}`);
    } else {
      history.push(
        `/forums/${notification.forum?._id}/posts/${notification.post}`
      );
    }

    setShowNotifications(false);
  }

  function handleDelete() {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    axios
      .delete(`/api/notifications/${notification._id}`, headers)
      .then((res) => {
        setNotifications((notifications) =>
          notifications.filter((n) => n._id !== notification._id)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div
      className={`flex items-center justify-between p-2.5 2xl:p-3 dark:border-secondary cursor-pointer ${
        !notification.hasSeen
          ? "bg-[#cfe2ff] dark:bg-dark"
          : "bg-[#f3f3f3] dark:bg-transparent"
      } ${!notification.forum ? "hidden" : ""}`}
      onClick={handleClick}
    >
      <div className="flex items-center">
        {/* picture */}
        {notification.type === "comment" || notification.type === "reply" ? (
          notification.from.picture ? (
            <img
              src={
                notification.from.picture.includes("googleusercontent")
                  ? notification.from.picture
                  : `/uploads/images/${notification.from.picture}`
              }
              className="rounded-full object-cover w-10 3xl:w-11 h-auto inline mx-2 md:mx-2.5 lg:mx-2"
              alt=""
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="inline mx-2 md:mx-2.5 lg:mx-2 w-10 2xl:w-12 3xl:w-14 2xl:mx-3 align-middle fill-[#818181] dark:fill-darkLight"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
              />
            </svg>
          )
        ) : notification.type === "joinRequest" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 2xl:w-12 3xl:w-14 2xl:mx-3 inline mx-2 md:mx-2.5 lg:mx-2 align-middle fill-primary"
            viewBox="0 0 24 24"
          >
            <path d="M16 9v-4l8 7-8 7v-4h-8v-6h8zm-2 10v-.083c-1.178.685-2.542 1.083-4 1.083-4.411 0-8-3.589-8-8s3.589-8 8-8c1.458 0 2.822.398 4 1.083v-2.245c-1.226-.536-2.577-.838-4-.838-5.522 0-10 4.477-10 10s4.478 10 10 10c1.423 0 2.774-.302 4-.838v-2.162z" />
          </svg>
        ) : notification.type === "postRequest" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 2xl:w-12 3xl:w-14 2xl:mx-3 inline mx-2.5 md:mx-3 lg:mx-2.5 align-middle fill-primary"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4Zm7.5.5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 1 0v-7ZM2 5.5a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5H6a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5ZM10.5 5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3ZM13 8h-2V6h2v2Z"
            />
          </svg>
        ) : (
          <LogoCropped width="100" color="#0F8CFF" />
        )}

        {/* text */}
        {notification.type === "comment" || notification.type === "reply" ? (
          <p className="text-mxs md:text-sm lg:text-mxs 2xl:text-sm 3xl:text-base dark:text-darkLight mr-1">
            <span className="font-semibold">
              {notification.from.firstName} {notification.from.lastName}
            </span>{" "}
            {notification.type === "comment"
              ? "commented on your post in"
              : "replied to your comment on a post in"}{" "}
            <span className="font-semibold">
              {notification.forum?.forumName}
            </span>
          </p>
        ) : notification.type === "requestApproved" ? (
          <p className="text-mxs md:text-sm lg:text-mxs 2xl:text-sm 3xl:text-base ml-2.5 dark:text-darkLight mr-1">
            Your request to join{" "}
            <span className="font-semibold">
              {notification.forum?.forumName}
            </span>{" "}
            has been approved. You can now view and create posts in the forum.
          </p>
        ) : (
          <p className="text-mxs md:text-sm lg:text-mxs 2xl:text-sm 3xl:text-base dark:text-darkLight mr-1">
            There are new{" "}
            {notification.type === "joinRequest" ? "join" : "post"} requests in{" "}
            <span className="font-semibold">
              {notification.forum?.forumName}
            </span>
          </p>
        )}
      </div>

      {/* time and delete button */}
      <div className="ml-1 flex flex-col items-center">
        {/* time */}
        <p className="text-xsm md:text-mxs lg:text-xsm 2xl:text-mxs 3xl:text-sm text-center pb-1.5 2xl:pb-1 dark:text-darkLight">
          {moment(notification.timestamp).fromNow()}
        </p>

        {/* delete button */}
        <button title="Delete" className="delete" onClick={handleDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 md-w-5 lg:w-4 2xl:w-5 3xl:w-6 stroke-[#818181] dark:stroke-gray-300 delete"
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              className="delete"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default withRouter(Notification);
