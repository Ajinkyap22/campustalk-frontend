import { useEffect } from "react";
import { withRouter } from "react-router-dom";
import PostData from "./PostData";
import PostFile from "./PostFile";

function PostPage({ post, title, ...props }) {
  function handleBack() {
    props.history.goBack();
  }

  useEffect(() => {
    if (!post) return;

    document.title =
      title ||
      `${post.author.firstName}'s Post in ${post.forum.forumName} | CampusTalk`;
  }, []);

  return (
    <main className="flex flex-col lg:grid lg:grid-cols-4 overflow-auto lg:overflow-hidden h-full">
      <PostFile post={post} handleBack={handleBack} />

      {/* post info */}
      <PostData post={post} />
    </main>
  );
}

export default withRouter(PostPage);
