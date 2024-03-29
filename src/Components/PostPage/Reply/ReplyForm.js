import { GuestContext } from "../../../Contexts/GuestContext";
import { PostContext } from "../../../Contexts/PostContext";
import { guestUser } from "../../../Config/guestConfig";
import { useContext, useState, useRef, useEffect } from "react";
import FileInputs from "../Comment/FileInputs";
import FilePreview from "../../Create Post/FilePreview";
import axios from "axios";

function ReplyForm({
  user,
  forumId,
  forumName,
  postId,
  commentId,
  commentAuthorName,
  commentAuthorMail,
  replies,
  setReplies,
  comments,
  setComments,
  commentAuthorId,
}) {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [originalFileName, setOriginalFileName] = useState();
  const [enablePost, setEnablePost] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [fileType, setFileType] = useState(null);
  const [isGuest] = useContext(GuestContext);
  const [posts, setPosts] = useContext(PostContext);

  const imageInput = useRef();
  const videoInput = useRef();
  const docInput = useRef();

  const imageButton = useRef();
  const videoButton = useRef();
  const docButton = useRef();

  useEffect(() => {
    // set enablepost to true if there is at least a text or a file, a forum, a mode and an author
    if ((text || file) && (user || isGuest)) {
      setEnablePost(true);
    } else {
      setEnablePost(false);
    }
  }, [file, text, user, isGuest]);

  useEffect(() => {
    // if there is a file in the formdata
    if (!isGuest && file && (file.length > 0 || file.name)) {
      // disable all input buttons
      imageButton.current.disabled = true;
      videoButton.current.disabled = true;
      docButton.current.disabled = true;

      // disable all input refs
      imageInput.current.disabled = true;
      videoInput.current.disabled = true;
      docInput.current.disabled = true;

      setDisabled(true);
    } else {
      // enable all input buttons
      imageButton.current.disabled = false;
      videoButton.current.disabled = false;
      docButton.current.disabled = false;

      // enable all input refs
      imageInput.current.disabled = false;
      videoInput.current.disabled = false;
      docInput.current.disabled = false;

      setDisabled(false);
      setFileType(null);
    }
  }, [file, isGuest]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!enablePost) return;

    if (isGuest) {
      let reply = {
        _id: "3e9g5f8x1f8f8f8f8f8l7k2g",
        text,
        postId,
        commentId,
        author: guestUser,
        upvotes: [],
        downvotes: [],
        timestamp: new Date().toISOString(),
      };

      let originalComment = comments.find(
        (comment) => comment._id === commentId
      );

      let comment = {
        ...originalComment,
        replies: [...originalComment.replies, reply],
      };

      setEnablePost(false);

      onPostSuccess(comment, reply);
    } else {
      let formData = new FormData();

      formData.append("text", text);
      formData.append("authorId", user._id);
      formData.append("commentId", commentId);
      if (file) {
        formData.append("file", file);
        formData.append("originalFileName", JSON.stringify(originalFileName));
      }

      setEnablePost(false);

      apiRequests(formData);
    }
  }

  function apiRequests(formData) {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    if (fileType === "image" || !fileType) {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/forums/${forumId}/posts/${postId}/comments/${commentId}/replies/create-reply`,
          formData,
          headers
        )
        .then((res) => {
          onPostSuccess(res.data.comment, res.data.reply, headers);
        });
    } else if (fileType === "video") {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/forums/${forumId}/posts/${postId}/comments/${commentId}/replies/create-vid-reply`,
          formData,
          headers
        )
        .then((res) => {
          onPostSuccess(res.data.comment, res.data.reply, headers);
        });
    } else if (fileType === "doc") {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/forums/${forumId}/posts/${postId}/comments/${commentId}/replies/create-doc-reply`,
          formData,
          headers
        )
        .then((res) => {
          onPostSuccess(res.data.comment, res.data.reply, headers);
        });
    }
  }

  function onPostSuccess(comment, reply, headers) {
    setText("");
    setFile(null);
    setOriginalFileName("");
    setDisabled(false);
    setEnablePost(true);

    // update comments
    setComments(comments.map((c) => (c._id === comment._id ? comment : c)));

    // update replies
    setReplies([...replies, reply]);

    if (isGuest) {
      // update posts
      setPosts(
        posts.map((p) => {
          if (p._id === postId) {
            return {
              ...p,
              comments: p.comments.map((c) => {
                if (c._id === comment._id) {
                  return comment;
                } else {
                  return c;
                }
              }),
            };
          } else {
            return p;
          }
        }),
        headers
      );
    }

    if (!isGuest) {
      let body = {
        type: "reply",
        from: user._id,
        to: commentAuthorId,
        post: postId,
        forum: forumId,
      };

      axios
        .post(
          `${process.env.REACT_APP_API_URL}/api/notifications/activityNotification`,
          body,
          headers
        )
        .then(() => {
          let body = {
            author: `${user.firstName} ${user.lastName}`,
            email: commentAuthorMail,
            postId,
            forumId,
            name: commentAuthorName,
            forumName,
          };

          sendMail(body);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  function sendMail(body) {
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/mail/reply`, body)
      .catch((err) => {
        console.error(err);
      });
  }

  function handleRemoveFile(e, index) {
    setFile(null);
    setOriginalFileName("");

    // reset the input
    imageInput.current.value = "";
    videoInput.current.value = "";
    docInput.current.value = "";
  }

  return (
    <div className="flex items-start p-1.5">
      {/* user picture */}
      {!user?.picture ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          className="inline mx-0.5 mt-0.5 h-6 fill-[#818181] dark:fill-darkLight"
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
            user?.picture.includes("googleusercontent")
              ? user?.picture
              : `${process.env.REACT_APP_API_KEY}/uploads/images/${user.picture}`
          }
          alt=""
          className="rounded-full inline h-6 mx-1 mt-0.5"
        />
      )}

      {/* form */}
      <form onSubmit={handleSubmit}>
        <div className="py-1 pr-1 bg-[#f3f3f3] dark:bg-[#3e3d3d] rounded-full">
          {/* text input */}
          <input
            type="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Write your reply"
            className="text-mxs mx-1 p-1 py-0.5 bg-transparent dark:text-darkLight focus:outline-none"
          />

          <FileInputs
            imageInput={imageInput}
            videoInput={videoInput}
            docInput={docInput}
            imageButton={imageButton}
            videoButton={videoButton}
            docButton={docButton}
            setFile={setFile}
            setFileType={setFileType}
            setOriginalFileName={setOriginalFileName}
            disabled={disabled}
            small={true}
            isGuest={isGuest}
          />
        </div>

        {/* file preview */}
        {file && (
          <FilePreview
            handleRemoveFile={handleRemoveFile}
            index={0}
            originalFileName={originalFileName}
            classes="border border-primary dark:border-primary-dark bg-[#f3f3f3] dark:bg-gray-800 mt-2 ml-1 px-1.5"
          />
        )}
      </form>
    </div>
  );
}

export default ReplyForm;
