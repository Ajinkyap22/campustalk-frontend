import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LogoCropped from "../LogoCropped";
import ForumsList from "./ForumsList";

function ForumBox({ user, fixed = true, onProfilePage = false }) {
  const [isModerator, setIsModerator] = useState(false);

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

  return (
    <div
      className={`forumsBox ${
        onProfilePage ? "" : "hidden"
      } lg:block bg-white dark:bg-darkSecondary shadow-base lg:max-w-[18rem] xl:max-w-[21rem] 2xl:max-w-[26rem] 3xl:max-w-[30rem] my-4 rounded`}
    >
      {/* title */}
      <div className="w-full bg-primary-light px-2 xl:p-3 2xl:px-4 2xl:py-3 py-2 rounded-t">
        <LogoCropped width="40" />

        <p className="text-white text-base xl:text-lg 2xl:text-2xl inline">
          {" "}
          Your Forums
        </p>
      </div>

      {/* forums list */}
      <div>
        {user && user.forums.length ? (
          <div>
            {user.forums.map((forum, i) => {
              return (
                <ForumsList
                  key={i}
                  forumName={forum.forumName}
                  forumId={forum._id}
                />
              );
            })}
            <Link
              to={`/forums/`}
              className="block p-2.5 xl:p-3 text-primary dark:text-[#389fff] text-center text-mxs xl:text-sm 2xl:text-xl underline underline-offset-1 hover:bg-blue-100 dark:hover:bg-slate-800"
            >
              See all
            </Link>
          </div>
        ) : (
          <p className="block p-2.5 xl:p-3 text-center text-sm 2xl:text-xl text-slate-800 dark:text-gray-400 hover:bg-gray-100">
            You have not joined any forums yet.
          </p>
        )}
      </div>
    </div>
  );
}

export default ForumBox;
