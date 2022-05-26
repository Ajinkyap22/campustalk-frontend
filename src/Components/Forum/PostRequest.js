import { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import moment from "moment";
import File from "../Post/File";

function PostRequest({ post, ...props }) {
  const [currentFile, setCurrentFile] = useState(0);

  // function onPostClick(e) {
  //   // dont redirect if e.target contains a class with 'pageChange'
  //   if (e.target.classList.contains("pageChange")) return;

  //   props.history.push(`/forums/${post.forum._id}/posts/${post._id}`);
  // }

  return (
    <div className="bg-white dark:bg-darkSecondary shadow-base py-2 lg:mt-8 w-full rounded">
      {/* user info */}
      <div className="flex my-1 px-2 w-full lg:max-w-[32rem] relative">
        {/* user profile pic */}
        {post.anonymous || !post.author.picture ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline mx-1 h-9 md:h-10 lg:h-9 xl:h-10 2xl:h-12  fill-[#818181] dark:fill-darkLight"
            viewBox="0 0 16 16"
          >
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path
              fillRule="evenodd"
              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
            />
          </svg>
        ) : (
          <img
            src={
              post.author.picture.includes("googleusercontent")
                ? post.author.picture
                : `/uploads/images/${post.author.picture}`
            }
            alt=""
            className="rounded-full inline h-8 md:h-9 lg:h-8 xl:h-10 2xl:h-12 mx-1"
          />
        )}
        <div className="mx-1 relative">
          {/* user name */}
          <span className="text-xs md:text-sm lg:text-xs xl:text-sm 2xl:text-xl dark:text-darkLight">
            {post.anonymous
              ? " Anonymous"
              : `${post.author.firstName} ${post.author.lastName}`}
          </span>

          <svg
            viewBox="0 0 16 16"
            className="inline ml-1 w-3 md:w-4 lg:w-3 xl:w-4 2xl:w-5"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.1844 7.71093L5.23437 2.57968C5.0125 2.38906 4.6875 2.56093 4.6875 2.86875V13.1312C4.6875 13.4391 5.0125 13.6109 5.23437 13.4203L11.1844 8.28906C11.3547 8.14218 11.3547 7.85781 11.1844 7.71093Z"
              className="fill-[#484848] dark:fill-darkLight"
            />
          </svg>

          {/* forum name */}
          <Link
            to={`/forums/${post.forum._id}/`}
            className="mx-1 text-xs md:text-sm lg:text-xs xl:text-sm 2xl:text-xl hover:underline dark:text-darkLight"
          >
            {post.forum.forumName}
            {/* important */}

            {post.important && (
              <button title="Unmark as important">
                <svg
                  viewBox="0 0 20 20"
                  fill="#027bff"
                  className="inline ml-1 align-text-top rotate-90 w-4 md:w-5 2xl:w-6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M2.9165 15.825L12.0832 15.8333C12.6415 15.8333 13.1415 15.5583 13.4415 15.1333L17.0832 9.99999L13.4415 4.86666C13.1415 4.44166 12.6415 4.16666 12.0832 4.16666L2.9165 4.17499L6.94984 9.99999L2.9165 15.825Z" />
                </svg>
              </button>
            )}
          </Link>

          {/* date */}
          <p className="text-xsm md:text-xs lg:text-xsm xl:text-xs 2xl:text-lg text-secondary dark:text-gray-300">
            {moment(post.timestamp).fromNow()}
          </p>
        </div>
      </div>

      {/* caption */}
      <p className="m-2 my-3 2xl:my-4 px-2 text-xs md:text-sm lg:text-xs xl:text-sm 2xl:text-xl dark:text-darkLight">
        {post.text}
      </p>

      {/* image */}
      {post.file.length ? (
        <File
          classes="flex items-center relative mt-2 mx-auto bg-black max-w-fit"
          files={post.file}
          // onPostClick={onPostClick}
          currentFile={currentFile}
          setCurrentFile={setCurrentFile}
          originalFileNames={post.originalFileNames}
        />
      ) : null}
    </div>
  );
}

export default withRouter(PostRequest);
