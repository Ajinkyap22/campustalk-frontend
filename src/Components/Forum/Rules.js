import { Link } from "react-router-dom";

function Rules({ forumId, rules, isModerator }) {
  return (
    <div
      className="bg-white dark:bg-darkSecondary shadow-base max-w-[22rem] 2xl:max-w-[26rem] 3xl:max-w-[30rem] pb-2 my-8 2xl:my-12 3xl:my-16 rounded"
      hidden={rules.length || isModerator ? false : true}
    >
      {/* title */}
      <div className="w-full bg-primary-light p-3 2xl:p-4 py-2 rounded-t flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          fill="white"
          className="inline mr-1"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm2.146 5.146a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647z"
          />
        </svg>
        <p className="text-white text-lg 2xl:text-xl ml-1 inline"> Rules</p>
      </div>

      {/* rules */}
      <div>
        {rules.length &&
          rules.map((rule, i) => (
            <div
              className={`${
                rules[i + 1]
                  ? "border-b border-[#cfcfcf] dark:border-secondary dark:text-darkLight"
                  : ""
              } py-3 flex items-center justify-between flex-nowrap`}
              key={i}
            >
              <p className="pl-3 px-1 inline text-sm 2xl:text-base 3xl:text-lg dark:text-darkLight">
                {i + 1}. {rule}
              </p>

              {isModerator && (
                <Link to={`/forums/${forumId}/rules`}>
                  <button
                    className="inline hover:scale-110 mr-1 transition-all"
                    title="Edit Rules"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 2xl:w-5 fill-[#818181] dark:fill-gray-300"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </Link>
              )}
            </div>
          ))}

        {!rules.length && (
          <p className="text-secondary text-center pt-3 px-3 text-sm 2xl:text-base 3xl:text-lg dark:text-gray-300 hover:underline transition-all cursor-pointer">
            <Link to={`/forums/${forumId}/rules`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 inline fill-[#818181] mx-1 align-text-top dark:fill-gray-300"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
              Click here to add rules.
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}

export default Rules;
