import { UserContext } from "../../Contexts/UserContext";
import { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import useOutsideAlerter from "../../Hooks/useOutsideAlerter";
import LogoCropped from "../LogoCropped";

function MobileActions() {
  const [showActions, setShowActions] = useState(false);
  const [isModerator, setIsModerator] = useState(false);
  const [user] = useContext(UserContext);
  const wrapperRef = useRef();
  useOutsideAlerter(wrapperRef, setShowActions);

  useEffect(() => {
    if (!user) return;

    let forums = user.forums;

    if (!forums.length) return;

    // check if user is in the moderator array of any forum
    let isMod = forums.some(
      (forum) => forum.moderators.indexOf(user._id) !== -1
    );

    setIsModerator(isMod);
  }, [user]);

  function toggleActions() {
    setShowActions(!showActions);
  }
  return (
    <div className="relative lg:hidden">
      <button
        className="mobileActions fixed right-4 bottom-5 z-20 dropDownToggle"
        onClick={toggleActions}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 md:w-12 fill-primary-light dropDownToggle"
          viewBox="0 0 16 16"
        >
          <path
            className="dropDownToggle"
            d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"
          />
        </svg>
      </button>

      {showActions && (
        <div
          ref={wrapperRef}
          className="fixed bg-white dark:bg-darkSecondary shadow-base p-1.5 md:p-2 right-3 bottom-16 md:bottom-20 z-20 rounded"
        >
          <ul>
            {/* create post*/}
            <li className="p-1 text-mxs md:p-1.5 md:text-sm dark:text-darkLight">
              <Link to={`/create-post`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="inline mr-1.5 mb-0.52 w-3.5 fill-[#818181] dark:fill-darkLight"
                  viewBox="0 0 16 16"
                >
                  <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM4.5 3h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1zm0 2h7a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5z" />
                </svg>
                Create Post
              </Link>
            </li>
            <hr />

            {/* create event */}
            {isModerator && (
              <li className="p-1 text-mxs md:p-1.5 md:text-sm dark:text-darkLight">
                <Link to={`/create-event`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="inline mr-2 mb-0.52 w-3 h-5 fill-[#818181] dark:fill-darkLight"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zM1 3.857C1 3.384 1.448 3 2 3h12c.552 0 1 .384 1 .857v10.286c0 .473-.448.857-1 .857H2c-.552 0-1-.384-1-.857V3.857z" />
                    <path d="M12 7a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
                  </svg>
                  Create Event
                </Link>
              </li>
            )}

            {isModerator && <hr />}

            {/* create forum*/}
            <li className="p-1 text-mxs md:p-1.5 md:text-sm dark:text-darkLight">
              <Link to={`/create-forum`}>
                <LogoCropped width="18" color="#818181" />
                Create Forum
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default MobileActions;
