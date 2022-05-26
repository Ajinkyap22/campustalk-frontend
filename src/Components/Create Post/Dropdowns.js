function Dropdowns({ forums, forum, setForum, anonymous, setAnonymous }) {
  function handleForumChange(e) {
    setForum(e.target.value);
  }

  function handleModeChange(e) {
    setAnonymous(e.target.value === "anonymous");
  }

  return (
    <div className="flex justify-center items-center py-6 lg:px-4 xl:p-6">
      {/* dropdown 1 */}
      <div className="relative mx-2">
        <select
          onChange={handleForumChange}
          value={forum || ""}
          className="block appearance-none max-w-[12rem] lg:max-w-[16rem] xl:max-w-[18rem] 2xl:max-w-[20rem] 3xl:max-w-[24rem] text-sm w-full bg-white dark:bg-darkSecondary dark:text-darkLight shadow-base px-4 py-2 pr-8 rounded shadow focus:outline-none cursor-pointer focus:shadow-outline"
        >
          <option className="text-xsm lg:text-sm 2xl:text-base">
            Select a Forum
          </option>
          {forums.map((f, i) => (
            <option
              key={i}
              className="text-xsm lg:text-sm 2xl:text-base"
              value={f._id}
            >
              {f.forumName}
            </option>
          ))}
        </select>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          fill="#818181"
          className="absolute right-2 top-3 inline"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>

      {/* dropdown 2 */}
      <div className="relative mx-2">
        <select
          onChange={handleModeChange}
          value={anonymous ? "anonymous" : "public"}
          className="block appearance-none text-sm w-full bg-white dark:bg-darkSecondary dark:text-darkLight shadow-base px-4 py-2 pr-8 rounded shadow focus:outline-none cursor-pointer focus:shadow-outline"
        >
          <option value="public" className="text-xsm lg:text-sm 2xl:text-base">
            Public Mode
          </option>
          <option
            value="anonymous"
            className="text-xsm lg:text-sm 2xl:text-base"
          >
            Anonymous Mode
          </option>
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          fill="#818181"
          className="absolute right-2 top-3 inline"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          />
        </svg>
      </div>
    </div>
  );
}

export default Dropdowns;
