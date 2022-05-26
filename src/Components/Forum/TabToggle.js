function TabToggle({ tab, setTab, isModerator, postRequests, joinRequests }) {
  function toggleTab(tabName) {
    setTab(tabName);
  }

  return (
    <div className="hidden lg:block text-center w-full sticky mb-8 lg:min-w-[28rem] xl:min-w-[32rem] 2xl:max-w-[36rem] 3xl:max-w-[40rem] mx-auto">
      {/* posts */}
      <button
        className={`p-2 2xl:p-2.5 3xl:p-3 px-5 shadow text-xs lg:text-sm 2xl:text-base 3xl:text-lg border-r border-light dark:border-zinc-700 rounded-l ${
          tab === "posts"
            ? "bg-primary-light text-white"
            : "bg-white dark:bg-darkSecondary dark:text-darkLight"
        }`}
        onClick={() => toggleTab("posts")}
      >
        Posts
      </button>

      {/* members */}
      <button
        className={`p-2 2xl:p-2.5 3xl:p-3 px-3 shadow text-xs lg:text-sm 2xl:text-base 3xl:text-lg border-x border-light dark:border-zinc-700  ${
          tab === "members"
            ? "bg-primary-light text-white"
            : "bg-white dark:bg-darkSecondary dark:text-darkLight"
        }`}
        onClick={() => toggleTab("members")}
      >
        Members
      </button>

      {/* post requests */}
      <button
        className={`p-2 2xl:p-2.5 3xl:p-3 px-1 shadow text-xs lg:text-sm 2xl:text-base 3xl:text-lg border-x border-light dark:border-zinc-700  ${
          tab === "postRequests"
            ? "bg-primary-light text-white"
            : "bg-white dark:bg-darkSecondary dark:text-darkLight"
        }`}
        onClick={() => toggleTab("postRequests")}
        hidden={!isModerator}
      >
        Post Requests{" "}
        {postRequests.length > 0 && (
          <span className="text-mxs rounded-full bg-[red] dark:bg-red-600 px-1.5 text-white">
            {postRequests.length}
          </span>
        )}
      </button>

      {/* join requests */}
      <button
        className={`p-2 2xl:p-2.5 3xl:p-3 px-1 shadow text-xs lg:text-sm 2xl:text-base 3xl:text-lg border-l border-light dark:border-zinc-700 rounded-r ${
          tab === "joinRequests"
            ? "bg-primary-light text-white"
            : "bg-white dark:bg-darkSecondary dark:text-darkLight"
        }`}
        onClick={() => toggleTab("joinRequests")}
        hidden={!isModerator}
      >
        Join Requests{" "}
        {joinRequests.length > 0 && (
          <span className="text-mxs rounded-full bg-[red] dark:bg-red-600 px-1.5 text-white">
            {joinRequests.length}
          </span>
        )}
      </button>
    </div>
  );
}

export default TabToggle;
