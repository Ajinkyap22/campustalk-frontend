import LogoCropped from "../LogoCropped";

function MobileTabs({
  tab,
  setTab,
  isModerator,
  postRequests,
  joinRequests,
  forumName,
}) {
  function toggleTab(tabName) {
    setTab(tabName);
  }

  return (
    <div className="lg:hidden w-full mb-5 shadow-base">
      {/* forum name */}
      <div className="bg-primary text-center py-1.5 md:py-2">
        <LogoCropped width="25" />

        <span className="text-mxs md:text-sm font-seminold text-white dark:text-darkLight">
          {forumName}
        </span>
      </div>

      {/* tabs */}
      <div
        className={`bg-white w-full dark:bg-darkSecondary text-center flex items-center ${
          isModerator ? "justify-between md:justify-evenly" : "justify-evenly"
        }`}
      >
        {/* posts */}
        <button
          className={`mx-1 text-[.7rem] md:text-mxs py-2 px-1 ${
            tab === "posts"
              ? "border-b-2 border-primary text-primary dark:text-primary-dark"
              : "dark:text-darkLight"
          }`}
          onClick={() => toggleTab("posts")}
        >
          Posts
        </button>

        {/* members */}
        <button
          className={`mx-1 text-[.7rem] md:text-mxs py-2 px-1 ${
            tab === "members"
              ? "border-b-2 border-primary text-primary dark:text-primary-dark"
              : "dark:text-darkLight"
          }`}
          onClick={() => toggleTab("members")}
        >
          Members
        </button>

        {/* info */}
        <button
          className={`mx-1 text-[.7rem] md:text-mxs py-2 px-1  ${
            tab === "info"
              ? "border-b-2 border-primary text-primary dark:text-primary-dark"
              : "dark:text-darkLight"
          }`}
          onClick={() => toggleTab("info")}
        >
          Info
        </button>

        {/* post requests */}
        <button
          className={`mx-1 text-[.7rem] md:text-mxs py-2 px-1 ${
            tab === "postRequests"
              ? "border-b-2 border-primary text-primary dark:text-primary-dark"
              : "dark:text-darkLight"
          }`}
          onClick={() => toggleTab("postRequests")}
          hidden={!isModerator}
        >
          Post Requests{" "}
          {postRequests.length > 0 && (
            <span className="text-xsm rounded-full bg-[red] dark:bg-red-600 px-1 text-white">
              {postRequests.length}
            </span>
          )}
        </button>

        {/* requests */}
        <button
          className={`mx-1 text-[.7rem] md:text-mxs py-2 px-1 ${
            tab === "joinRequests"
              ? "border-b-2 border-primary text-primary dark:text-primary-dark"
              : "dark:text-darkLight"
          }`}
          onClick={() => toggleTab("joinRequests")}
          hidden={!isModerator}
        >
          Join Requests{" "}
          {joinRequests.length > 0 && (
            <span className="text-xsm rounded-full bg-[red] dark:bg-red-600 px-1 text-white">
              {joinRequests.length}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export default MobileTabs;
