import ForumForm from "./ForumForm";
import { useEffect, useState } from "react";
import Overlay from "../Overlay";

function CreateForum({ title }) {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    document.title = title || "Create Forum | CampusTalk";
  }, [title]);

  return (
    <main className="w-full bg-bubble h-full overflow-auto flex flex-col justify-center items-center md:pt-20 md:pb-10 dark:bg-dark">
      {/* form */}
      <section className="bg-white dark:bg-darkSecondary rounded shadow-base w-[90%] md:w-2/3 xl:w-1/2 2xl:w-1/3 md:mt-10 inline-block 2xl:my-8">
        {/* title */}
        <h1 className="text-center font-bold mb-1 lg:mb-2 mt-5 lg:mt-8 text-primary dark:text-primary-light text-lg md:text-xl xl:text-2xl 2xl:text-3xl">
          Create Your Institute's Forum
        </h1>
        <h2 className="text-center my-1 text-xs md:text-sm xl:text-base lg:my-2 text-primary dark:text-primary-light 2xl:text-xl">
          Tell us a bit about your institute
        </h2>

        {/* form */}
        <ForumForm setShowOverlay={setShowOverlay} />
      </section>

      {/* overlay */}
      <Overlay text="Creating Forum..." showOverlay={showOverlay} />
    </main>
  );
}

export default CreateForum;
