import { UserContext } from "../../Contexts/UserContext";
import { useEffect, useContext } from "react";
import { withRouter } from "react-router-dom";
import ForumForm from "../Create Forum/ForumForm";

function EditForum({ forum, title, ...props }) {
  const [user] = useContext(UserContext);

  useEffect(() => {
    document.title = title || "Edit Forum | CampusTalk";
  }, [title]);

  useEffect(() => {
    if (!user) return;

    // check if user is a moderator of the forum
    if (!forum.moderators.some((moderator) => moderator._id === user?._id)) {
      // if not, redirect to forum page
      props.history.push(`/forums/${forum._id}`);
    }
  }, [user]);

  return (
    <main className="w-full bg-bubble h-full overflow-auto flex flex-col justify-center items-center md:pt-20 md:pb-10 dark:bg-dark">
      {/* form */}
      <section className="bg-white rounded shadow-base w-[90%] md:w-2/3 xl:w-1/2 2xl:w-1/3 md:mt-10 inline-block 2xl:my-8">
        {/* title */}
        <h1 className="text-center font-bold mb-1 lg:mb-2 mt-5 lg:mt-8 text-primary text-lg md:text-xl xl:text-2xl 2xl:text-3xl">
          Edit Forum Info
        </h1>
        <h2 className="text-center my-1 text-xs md:text-sm xl:text-base lg:my-2 text-primary 2xl:text-xl">
          Tell us a bit about your institute
        </h2>

        <ForumForm forum={forum} />
      </section>
    </main>
  );
}

export default withRouter(EditForum);
