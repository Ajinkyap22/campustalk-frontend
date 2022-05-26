import { useEffect, useState } from "react";

function AuthorInfo({
  authorId,
  authorForums,
  forum,
  picture,
  firstName,
  lastName,
  anonymous,
  important = false,
  setImportant,
}) {
  const [isModerator, setIsModerator] = useState(false);

  useEffect(() => {
    if (!forum) return;

    let f = authorForums.find((f) => f._id === forum._id);
    let isMod = f?.moderators.indexOf(authorId) !== -1;

    setIsModerator(isMod);
  }, [forum]);

  function handleImportant() {
    // set formData.important to the opposite of important
    setImportant(!important);
  }

  return (
    <div className="flex items-center px-2 pt-2.5 relative">
      {anonymous || !picture ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="38"
          className="inline mx-1 h-10 fill-[#818181] dark:fill-darkLight"
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
          src={`/uploads/images/${picture}`}
          alt=""
          className="rounded-full inline h-10 mx-1"
        />
      )}

      <span className="text-sm 2xl:text-base mx-1 dark:text-darkLight">
        {!anonymous ? `${firstName} ${lastName}` : "Anonymous"}
      </span>

      <button
        onClick={handleImportant}
        className="absolute right-5 top-3.5"
        title={`${important ? "Unmark" : "Mark"} as important`}
        hidden={!isModerator}
      >
        <svg
          width="20"
          viewBox="0 0 20 20"
          fill={important ? "#027bff" : "none"}
          className={`inline ml-1 rotate-90 ${
            important ? "stroke-none" : "stroke-[#545454] dark:stroke-darkLight"
          }`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.9165 15.825L12.0832 15.8333C12.6415 15.8333 13.1415 15.5583 13.4415 15.1333L17.0832 9.99999L13.4415 4.86666C13.1415 4.44166 12.6415 4.16666 12.0832 4.16666L2.9165 4.17499L6.94984 9.99999L2.9165 15.825Z" />
        </svg>
      </button>
    </div>
  );
}

export default AuthorInfo;
