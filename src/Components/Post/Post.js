import { FileContext } from "../../Contexts/FileContext";
import { useEffect, useState, useContext } from "react";
import PostInfo from "./PostInfo";
import PostActions from "./PostActions";
import { withRouter } from "react-router-dom";
import File from "./File";

function Post({
  post,
  activeFilter,
  range = "Today",
  setForumPosts,
  ...props
}) {
  const [showPost, setShowPost] = useState(true);
  const [currentFile, setCurrentFile] = useState(0);
  const [files, setFiles] = useContext(FileContext);

  useEffect(() => {
    if (activeFilter !== "top") return;
    const now = new Date();
    const postDate = new Date(post.timestamp);
    const diff = now - postDate;
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    // if range is today, show post if it's within the last 24 hours
    if (range === "Today") {
      setShowPost(diffDays <= 1);
      // if range is This week, show post if it's within the last 7 days
    } else if (range === "This week") {
      setShowPost(diffDays <= 7);
    } else if (range === "This month") {
      setShowPost(diffDays <= 30);
    } else {
      setShowPost(true);
    }
  }, [activeFilter, range, post.timestamp]);

  useEffect(() => {
    if (activeFilter === "important" && !post.important) setShowPost(false);

    if (activeFilter === "latest") setShowPost(true);
  }, [activeFilter]);

  useEffect(() => {
    if (!post.originalFileNames) return;

    post.originalFileNames.forEach((file, i) => {
      if (
        file.type.match("application/msword") ||
        file.type.match(
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) ||
        file.type.match("text/plain") ||
        file.type.match("application/vnd.ms-powerpoint") ||
        file.type.match(
          "application/vnd.openxmlformats-officedocument.presentationml.presentation"
        ) ||
        file.type.match("application/vnd.ms-excel") ||
        file.type.match(
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        ) ||
        file.type.match("text/csv")
      ) {
        let newFile = {
          file: post.file[i],
          name: file.name,
          type: file.type,
        };

        // if file is not already in files array, add it
        if (!files.some((f) => f.name === newFile.name)) {
          setFiles((files) => [...files, newFile]);
        }
      }
    });
  }, []);

  function onPostClick(e) {
    // dont redirect if e.target contains a class with 'pageChange'
    if (
      e.target.classList.contains("pageChange") ||
      e.target.classList.contains("doc")
    )
      return;

    props.history.push(`/forums/${post.forum._id}/posts/${post._id}`);
  }

  return (
    <div
      className="bg-white dark:bg-darkSecondary shadow-base py-1 md:py-1.5 xl:py-2 mt-4 md:mt-8 w-full lg:rounded"
      hidden={!showPost}
    >
      {/* user info */}
      <PostInfo
        postId={post._id}
        author={post.author}
        forum={post.forum}
        timestamp={post.timestamp}
        anonymous={post.anonymous}
        important={post.important}
        setForumPosts={setForumPosts}
      />

      {/* caption */}
      <p className="m-2 my-3 2xl:my-4 px-1 md:px-1.5 xl:px-2 text-xs md:text-sm lg:text-xs xl:text-sm 2xl:text-xl dark:text-darkLight">
        {post.text}
      </p>

      {/* image */}
      {post.file.length ? (
        <File
          classes="flex items-center relative mt-2 mx-auto bg-black max-w-fit cursor-pointer"
          files={post.file}
          onPostClick={onPostClick}
          currentFile={currentFile}
          setCurrentFile={setCurrentFile}
          originalFileNames={post?.originalFileNames}
        />
      ) : null}

      {/* actions */}
      <PostActions
        id={post._id}
        forumId={post.forum._id}
        upvotes={post.upvotes}
        downvotes={post.downvotes}
        comments={post.comments}
        onPostClick={onPostClick}
        setForumPosts={setForumPosts}
      />
    </div>
  );
}

export default withRouter(Post);
