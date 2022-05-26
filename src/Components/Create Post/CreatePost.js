import { UserContext } from "../../Contexts/UserContext";
import { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import AuthorInfo from "./AuthorInfo";
import Dropdowns from "./Dropdowns";
import PostForm from "./PostForm";
import ProgressBar from "./ProgressBar";
import Guidelines from "./Guidelines";
import FAQ from "../Feed/FAQ";

const faqData = [
  {
    question: "How do I post anonymously?",
    answer:
      "You can post anonymously by selecting the anonymous mode in the post form.",
  },

  {
    question: "Can I attach files to my posts?",
    answer:
      "Yes you can attach different types of files to your posts such as images, videos, documents, etc.",
  },

  {
    question: "How do I mark a post as important?",
    answer:
      "Click on the icon on the right side of the post form to mark/unmark it.",
  },
  {
    question: "How many images can I include?",
    answer:
      "You can include up to 10 images in a post. If you want to include more images, you can upload them separately.",
  },
  {
    question: "Who will be able to see my post?",
    answer:
      "Once your post is approved by the moderators, it will be visible to all the users of the forum you selected.",
  },
];

function CreatePost({ title, post, ...props }) {
  const [user, setUser] = useContext(UserContext);
  const [forum, setForum] = useState(null);
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [originalFileNames, setOriginalFileNames] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [anonymous, setAnonymous] = useState(false);
  const [important, setImportant] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // if post is undefined or null
    if (!post) {
      document.title = title || "Create Post | CampusTalk";
    } else {
      document.title = title || "Edit Post | CampusTalk";
    }
  }, [title, post]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      // redirect to the previus page if there is no user or if the user is not the author of the post
      if (!user || (post && post.author._id !== user._id)) {
        props.history.goBack();
      }
    }

    return () => {
      mounted = false;
    };
  }, [user, post]);

  useEffect(() => {
    let mounted = true;

    if (mounted) {
      if (!post) return;

      setForum(post.forum);
      setText(post.text);
      setAnonymous(post.anonymous);
      setImportant(post.important);
      setOriginalFileNames(post.originalFileNames);
      setFile(post.file);
      setIsEditing(true);
    }

    return () => {
      mounted = false;
    };
  }, [post]);

  return (
    <main className="w-full h-full bg-[#F0F2F5] dark:bg-dark flex flex-col items-center lg:p-4 text-center relative">
      <h1 className="text-primary dark:text-primary-dark text-xl lg:text-3xl mt-3">
        Create a Post
      </h1>

      {/* dropdowns */}
      <Dropdowns
        forums={user?.forums || []}
        forum={post?.forum || forum}
        setForum={setForum}
        anonymous={anonymous}
        setAnonymous={setAnonymous}
      />

      <Guidelines />

      {/* post info */}
      <div className="bg-white dark:bg-darkSecondary shadow-base rounded relative w-full lg:w-[26rem] xl:w-[30rem] 2xl:w-[34rem] 3xl:w-[38rem]">
        {/* user profile picture & name */}
        <AuthorInfo
          picture={user?.picture}
          forum={forum}
          authorForums={user?.forums || []}
          firstName={user?.firstName}
          anonymous={anonymous}
          lastName={user?.lastName}
          important={important}
          setImportant={setImportant}
        />

        {/* form */}
        <PostForm
          anonymous={anonymous}
          setAnonymous={setAnonymous}
          important={important}
          setImportant={setImportant}
          forum={forum}
          user={user}
          setUser={setUser}
          file={file}
          setFile={setFile}
          text={text}
          setText={setText}
          progress={progress}
          setProgress={setProgress}
          originalFileNames={originalFileNames}
          setOriginalFileNames={setOriginalFileNames}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          postId={post?._id}
        />
      </div>

      <div className="hidden lg:block absolute 2xl:right-[5%] 3xl:right-[8%] right-2 top-[9%] mx-5">
        <FAQ faqData={faqData} />
      </div>

      {/* progress bar to show upload progress */}
      <ProgressBar progress={progress} />
    </main>
  );
}

export default withRouter(CreatePost);
