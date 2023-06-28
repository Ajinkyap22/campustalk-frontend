import { GuestContext } from "../../Contexts/GuestContext";
import { useState, useEffect, useContext } from "react";
import PostActions from "../Post/PostActions";
import PostInfo from "./PostInfo";
import Comment from "./Comment/Comment";
import CommentForm from "./Comment/CommentForm";
import axios from "axios";
import "./PostData.css";

function PostData({ post }) {
  const [comments, setComments] = useState([]);
  const [isGuest] = useContext(GuestContext);

  useEffect(() => {
    if (isGuest) {
      setComments(post.comments);
    } else if (post.comments) {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}/api/forums/${post.forum._id}/posts/${post._id}/comments`
        )
        .then((res) => {
          // only keep the comments that in the post's comments array
          setComments(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  return (
    <section className="lg:postData lg:sticky lg:top-0 lg:max-h-screen lg:col-span-1 bg-white dark:bg-darkSecondary py-2 pb-0 lg:overflow-auto w-full">
      <PostInfo post={post} />

      {/* caption */}
      <p className="m-2 my-3 px-2 text-sm dark:text-darkLight whitespace-pre-wrap !leading-relaxed">
        {post.text}
      </p>

      {/* actions */}
      <PostActions
        post={post}
        id={post._id}
        forumId={post.forum._id}
        upvotes={post.upvotes}
        downvotes={post.downvotes}
        comments={post.comments}
        showCommentButton={false}
      />
      <hr className="dark:border-t dark:border-secondary" />

      {/* comments */}
      <div className="flex flex-col py-1">
        {comments.map((comment, i) => (
          <Comment
            comment={comment}
            key={i}
            forumId={post.forum._id}
            forumName={post.forum.forumName}
            postId={post._id}
            comments={comments}
            setComments={setComments}
            moderators={post.forum.moderators}
          />
        ))}
      </div>

      {/* comment form */}
      <CommentForm
        forumId={post.forum._id}
        postId={post._id}
        postAuthorId={post.author._id}
        postAuthorMail={post.author.email}
        postAuthorName={post.author.firstName}
        forumName={post.forum.forumName}
        comments={comments}
        setComments={setComments}
      />
    </section>
  );
}

export default PostData;
