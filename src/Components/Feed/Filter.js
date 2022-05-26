import { useState, useEffect, useRef } from "react";
import useOutsideAlerter from "../../Hooks/useOutsideAlerter";

function Filter({
  activeFilter,
  setActiveFilter,
  posts,
  setPosts,
  dateRange = "Today",
  setDateRange,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showDay, setShowDay] = useState(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setShowDropdown);

  function switchActiveFilter(filter) {
    setActiveFilter(filter);

    if (filter === "latest") {
      setPosts(sortByDate(posts));
    } else if (filter === "top") {
      setPosts(sortByUpvotes(posts));
    }
  }

  function handleDropdown() {
    setShowDropdown(!showDropdown);
  }

  function toggleDay() {
    switchActiveFilter("top");
    setShowDay(true);
  }

  // sort posts by number of upvotes in descending order
  function sortByUpvotes(posts) {
    return posts.sort((a, b) => b.upvotes.length - a.upvotes.length);
  }

  // sort posts by date in descending order
  function sortByDate(posts) {
    return posts.sort((a, b) => -a.timestamp.localeCompare(b.timestamp));
  }

  function handleDay(range) {
    setDateRange(range);
    setShowDropdown(false);
    sortByUpvotes(posts);
  }

  return (
    <div className="filters bg-white dark:bg-darkSecondary relative shadow-base dark:shadow-darkLight flex justify-between items-center w-full rounded">
      {/* filter label */}
      <p className="inline p-2 md:p-3 lg:p-2.5 xl:p-3 text-xs md:text-sm lg:text-xs xl:text-sm 2xl:text-lg 3xl:text-xl bg-[#f3f3f3] dark:bg-neutral-700 dark:text-darkLight">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="inline align-text-bottom fill-[#818181] dark:fill-darkLight w-4 md:w-5 lg:w-4 xl:w-5 2xl:w-7"
          viewBox="0 0 16 16"
        >
          <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z" />
        </svg>{" "}
        <span className="hidden md:inline">Filter</span>
      </p>

      {/* latest */}
      <button
        onClick={() => switchActiveFilter("latest")}
        className="p-2 text-xsm md:text-sm lg:text-xs xl:text-sm 2xl:text-lg 3xl:text-xl"
      >
        <span
          className={`${
            activeFilter === "latest"
              ? "bg-[#E2EEFF] text-primary"
              : "dark:text-darkLight"
          } p-1 px-2 rounded-xl`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-4 md:w-5 lg:w-4 xl:w-5 inline lg:align-text-top ${
              activeFilter === "latest"
                ? "fill-[#0278E4]"
                : "fill-[#626262] dark:fill-darkLight"
            }`}
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
              clipRule="evenodd"
            />
          </svg>{" "}
          Latest
        </span>
      </button>

      {/* important */}
      <button
        onClick={() => switchActiveFilter("important")}
        className="p-2 text-xsm md:text-sm lg:text-xsm lg:text-xs xl:text-sm 2xl:text-lg 3xl:text-xl"
      >
        <span
          className={`${
            activeFilter === "important"
              ? "bg-[#E2EEFF] text-primary"
              : "dark:text-darkLight"
          } p-1 px-2 rounded-xl`}
        >
          <svg
            viewBox="0 0 20 20"
            className="inline lg:align-text-top w-4 md:w-5 lg:w-4 xl:w-5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.9165 15.825L12.0832 15.8333C12.6415 15.8333 13.1415 15.5583 13.4415 15.1333L17.0832 9.99999L13.4415 4.86666C13.1415 4.44166 12.6415 4.16666 12.0832 4.16666L2.9165 4.17499L6.94984 9.99999L2.9165 15.825Z"
              className={
                activeFilter === "important"
                  ? "fill-[#0278E4]"
                  : "fill-[#626262] dark:fill-[#cbcbcb]"
              }
            />
          </svg>{" "}
          Important
        </span>
      </button>

      {/* top */}
      <button
        onClick={toggleDay}
        className="p-2 text-xsm md:text-sm lg:text-xs xl:text-sm 2xl:text-lg 3xl:text-xl"
      >
        <span
          className={`${
            activeFilter === "top"
              ? "bg-[#E2EEFF] text-primary"
              : "dark:text-darkLight"
          } p-1 px-2 rounded-xl`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="inline w-3.5 md:w-4 lg:w-3.5 xl:w-4"
            viewBox="0 0 64 64"
          >
            <g
              className={
                activeFilter === "top"
                  ? "fill-[#0278E4]"
                  : "fill-[#626262] dark:fill-[#cbcbcb]"
              }
            >
              <path d="M21.539 38.05c0-1.322-.91-2.318-2.116-2.318H3.603c-1.209 0-2.118.996-2.118 2.318c0 1.287.921 2.26 2.146 2.26h5.495v17.813c0 1.299.986 2.198 2.397 2.198c1.416 0 2.406-.899 2.406-2.198V40.31h5.495c1.185 0 2.115-.993 2.115-2.26" />
              <path d="M31.05 35.3c-6.728 0-11.08 4.957-11.08 12.625c0 7.705 4.348 12.684 11.08 12.684c6.695 0 11.02-4.967 11.02-12.651c0-7.691-4.321-12.658-11.02-12.658m0 20.762c-3.815 0-6.184-3.104-6.184-8.104c0-5.02 2.369-8.142 6.184-8.142c3.78 0 6.127 3.056 6.127 7.966c.003 5.262-2.232 8.28-6.127 8.28" />
              <path d="M54.4 35.73h-6.376c-2.619 0-3.949 1.387-3.949 4.125v18.207c0 1.352.955 2.258 2.375 2.258c1.394 0 2.371-.916 2.371-2.228v-7.106h5.468c5.153 0 8.231-2.924 8.231-7.828c0-4.648-3.036-7.428-8.12-7.428m3.258 7.487c0 2.229-1.121 3.313-3.432 3.313H48.82v-6.312h5.406c2.311.001 3.432.981 3.432 2.999" />
              <path d="M37.825 29.542V19.236h2.887c1.697 0 3.093-1.625 3.259-3.708L30.978.583L18.071 15.522c.168 2.083 1.562 3.713 3.261 3.713h2.887v10.306l13.606.001" />
            </g>
          </svg>{" "}
          Top
        </span>
      </button>

      {/* day */}
      <button
        onClick={handleDropdown}
        disabled={activeFilter === "top" ? false : true}
        className="p-2 text-xsm md:text-sm lg:text-xs xl:text-sm 2xl:text-lg 3xl:text-xl dropDownToggle"
      >
        <span
          className={`${
            activeFilter === "top"
              ? "bg-[#E2EEFF] text-primary"
              : "bg-[#ccc] text-[#666]"
          } p-1 px-2 rounded-xl dropDownToggle`}
        >
          {dateRange}{" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            className="inline dropDownToggle align-middle w-2.5 md:w-3 xl:w-4"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              className="dropDownToggle"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </span>
      </button>

      <div
        className="absolute bg-white dark:bg-darkSecondary shadow-base p-1 md:p-2 top-10 right-0 z-10 rounded"
        hidden={showDropdown ? false : true}
        ref={wrapperRef}
      >
        <ul>
          <li
            className={`p-1 md:p-2 text-xsm md:text-xs xl:text-sm 2xl:text-lg 3xl:text-xl ${
              dateRange === "Today"
                ? "bg-[#E2EEFF] text-primary"
                : "dark:text-darkLight"
            }`}
            onClick={() => handleDay("Today")}
          >
            <button>Today</button>
          </li>
          <hr className="dark:bg-light dark:border-top dark:border-light" />

          <li
            className={`p-1 md:p-2 text-xsm md:text-xs xl:text-sm 2xl:text-lg 3xl:text-xl  ${
              dateRange === "This Week"
                ? "bg-[#E2EEFF] text-primary"
                : "dark:text-darkLight"
            }`}
            onClick={() => handleDay("This Week")}
          >
            <button>This Week</button>
          </li>
          <hr className="dark:bg-light dark:border-top dark:border-light" />

          <li
            className={`p-1 md:p-2 text-xsm md:text-xs xl:text-sm 2xl:text-lg 3xl:text-xl  ${
              dateRange === "This Month"
                ? "bg-[#E2EEFF] text-primary"
                : "dark:text-darkLight"
            }`}
            onClick={() => handleDay("This Month")}
          >
            <button>This Month</button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Filter;
