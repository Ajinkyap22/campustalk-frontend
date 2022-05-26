import { Link } from "react-router-dom";
import moment from "moment";
import axios from "axios";

function ForumInfoMobile({
  forum,
  user,
  showModal,
  setShowModal,
  requestSent,
  setRequestSent,
  joinRequests,
  setJoinRequests,
  isModerator,
  ...props
}) {
  function toggleModal() {
    setShowModal(!showModal);
  }

  function joinForum() {
    if (!user) return;

    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    let body = {
      id: user._id,
    };

    axios
      .post(`/api/forums/${forum._id}/join`, body, headers)
      .then((res) => {
        // update requestSent
        setRequestSent(true);

        // update joinRequests
        setJoinRequests([...joinRequests, user]);
        props.history.push(`/forums/${forum._id}`);

        axios
          .post(
            `/api/notifications/requestNotification`,
            { forum: forum._id || forum, type: "joinRequest" },
            headers
          )
          .catch((err) => {
            console.log(err.response);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div className="lg:hidden w-full h-full">
      {/* info */}
      <div className="bg-white dark:bg-darkSecondary shadow-base pb-1 md:pb-1.5 rounded">
        {/* info */}
        <div className="p-2 md:p-2.5 border-b border-[#cfcdcd] dark:border-secondary px-3 md:px-3.5">
          {/* website */}
          <p className="text-xs md:text-mxs p-1 md:p-1.5">
            <span className="underline underline-offset-1 dark:text-darkLight">
              Website:{" "}
            </span>
            <a
              href={forum.website}
              target="_blank"
              rel="noreferrer"
              className="text-primary dark:text-primary-dark px-2 md:px-2.5 hover:underline"
            >
              {forum.website}
            </a>
          </p>

          {/* email */}
          <p className="text-xs md:text-mxs p-1 md:p-1.5">
            <span className="underline underline-offset-1 dark:text-darkLight">
              Email:{" "}
            </span>
            <span className="text-primary dark:text-primary-dark px-6 md:px-7">
              {forum.email}
            </span>
          </p>

          {/* address */}
          <p className="text-xs md:text-mxs p-1 md:p-1.5">
            <span className="underline underline-offset-1 dark:text-darkLight">
              Address:{" "}
            </span>
            <span className="px-2 md:px-2.5 dark:text-darkLight">
              {forum.address}
            </span>
          </p>
        </div>

        {/* stats */}
        <div className="p-3 py-2 md:py-3 border-b border-[#cfcdcd] dark:border-secondary text-center px-24">
          <div className="flex justify-center items-center">
            {/* members */}
            <div className="flex flex-col items-center px-2 md:px-2.5">
              <span className="text-sm md:text-base dark:text-darkLight">
                {forum.members.length}
              </span>
              <span className="text-mxs md:text-sm dark:text-darkLight">
                Members
              </span>
            </div>

            {/* posts */}
            <div className="flex flex-col items-center px-2 md:px-2.5">
              <span className="text-sm md:text-base dark:text-darkLight">
                {forum.posts.length}
              </span>
              <span className="text-mxs md:text-sm dark:text-darkLight">
                Posts
              </span>
            </div>
          </div>

          {/* created date */}
          <p className="text-xs md:text-mxs pt-3 md:pt-3.5 text-secondary dark:text-gray-300">
            Created {moment(forum.timestamp).format("LL")}
          </p>
        </div>

        {/* buttons */}
        {user &&
        user.forums.some((userForum) => userForum._id === forum._id) ? (
          <div>
            <Link
              to="/create-post"
              className="mx-auto text-center w-1/2 md:w-1/3 block p-2 md:p-2.5 py-1.5 md:py-2 my-5 md:my-6 text-xs md:text-sm border border-primary-light bg-primary-light text-white rounded-full hover:bg-blue-700"
            >
              Create Post
            </Link>

            <button
              onClick={toggleModal}
              className="mx-auto w-1/2 md:w-1/3 block text-centr p-2 md:p-2.5 py-1.5 md:py-2 my-5 md:my-6 text-xs md:text-sm border border-red-500 bg-transparent text-red-500 dark:text-[#ff5656] rounded-full hover:bg-red-500 hover:text-white dark:hover:text-darkLight"
            >
              Leave Forum
            </button>

            {isModerator && (
              <button className="mx-auto w-1/2 md:w-1/3 block text-centr p-2 md:p-2.5 py-1.5 md:py-2 my-5 md:my-6 text-xs md:text-sm border border-red-500 bg-transparent text-red-500 dark:text-[#ff5656] rounded-full hover:bg-red-500 hover:text-white dark:hover:text-darkLight">
                Delete Forum
              </button>
            )}
          </div>
        ) : (
          <div>
            {requestSent ? (
              <button
                disabled
                className="mx-auto w-1/2 md:w-1/3 block p-2 md:p-2.5 py-1.5 md:py-2 my-5 md:my-6 text-xs md:text-sm border-primary-light bg-primary-light text-white rounded-full"
              >
                Request Pending
              </button>
            ) : (
              <button
                onClick={joinForum}
                disabled={!user}
                className="mx-auto w-1/2 md:w-1/3 block p-2 md:p-2.5 py-1.5 md:py-2 my-5 md:my-6 text-xs md:text-sm border-primary-light bg-primary-light text-white rounded-full hover:bg-blue-700 disabled:opacity-70 disabled:hover:bg-primary-light"
              >
                Join Forum
              </button>
            )}
          </div>
        )}
      </div>

      {/* rules */}
      <div
        className="bg-white dark:bg-darkSecondary shadow-base pb-2 md:pb-2.5 my-8 md:my-10 rounded"
        hidden={forum.rules.length ? false : true}
      >
        {/* title */}
        <div className="w-full bg-primary-light p-2 md:p-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            className="inline mr-1 my-1 w-6"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z"
            />
          </svg>
          <p className="text-white inline"> Rules</p>
        </div>

        {/* rules */}
        <div>
          {forum.rules.map((rule, i) => (
            <div
              className={`${
                forum.rules[i + 1]
                  ? "border-b border-[#cfcfcf] dark:border-secondary dark:text-darkLight"
                  : ""
              } py-3 md:py-3.5`}
              key={i}
            >
              <p className="px-3 text-mxs md:text-sm md:px-3.5 dark:text-darkLight">
                {i + 1}. {rule}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ForumInfoMobile;
