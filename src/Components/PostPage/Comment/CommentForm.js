import { UserContext } from "../../../Contexts/UserContext";
import { PostContext } from "../../../Contexts/PostContext";
import { useContext, useState, useRef, useEffect } from "react";
import axios from "axios";
import FileInputs from "./FileInputs";
import FilePreview from "../../Create Post/FilePreview";

function CommentForm({
  forumId,
  forumName,
  postId,
  postAuthorId,
  postAuthorMail,
  postAuthorName,
  comments,
  setComments,
}) {
  const [user, setUser] = useContext(UserContext);
  const [posts, setPosts] = useContext(PostContext);

  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [originalFileName, setOriginalFileName] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [enablePost, setEnablePost] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [fileType, setFileType] = useState(null);

  const imageInput = useRef();
  const videoInput = useRef();
  const docInput = useRef();

  const imageButton = useRef();
  const videoButton = useRef();
  const docButton = useRef();

  useEffect(() => {
    // set enablepost to true if there is at least a text or a file, a forum, a mode and an author
    if ((text || file) && user) {
      setEnablePost(true);
    } else {
      setEnablePost(false);
    }
  }, [file, text, user]);

  useEffect(() => {
    // if there is a file in the formdata
    if (file && (file.length > 0 || file.name)) {
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
  }, [file]);

  function handleRemoveFile(e, index) {
    setFile(null);
    setOriginalFileName("");

    // reset the input
    imageInput.current.value = "";
    videoInput.current.value = "";
    docInput.current.value = "";
  }

  function handleSubmit(e) {
    e.preventDefault();

    let formData = new FormData();

    formData.append("text", text);
    formData.append("postId", postId);
    formData.append("authorId", user._id);
    if (file) {
      formData.append("file", file);
      formData.append("originalFileName", JSON.stringify(originalFileName));
    }

    setEnablePost(false);

    apiRequests(formData);
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
          `/api/forums/${forumId}/posts/${postId}/comments/create-comment`,
          formData,
          headers
        )
        .then((res) => {
          onPostSuccess(res.data, headers);
        });
    } else if (fileType === "video") {
      axios
        .post(
          `/api/forums/${forumId}/posts/${postId}/comments/create-vid-comment`,
          formData,
          headers
        )
        .then((res) => {
          onPostSuccess(res.data, headers);
        });
    } else if (fileType === "doc") {
      axios
        .post(
          `/api/forums/${forumId}/posts/${postId}/comments/create-doc-comment`,
          formData,
          headers
        )
        .then((res) => {
          onPostSuccess(res.data, headers);
        });
    }
  }

  function onPostSuccess(res, headers) {
    setText("");
    setFile(null);
    setOriginalFileName("");
    setDisabled(false);
    setEnablePost(true);

    // update user's comments
    setUser({
      ...user,
      comments: [...user.comments, res.comment],
    });

    // updates posts
    setPosts([
      ...posts.map((post) => {
        if (post._id === postId) {
          return {
            ...post,
            comments: [...post.comments, res.comment],
          };
        } else {
          return post;
        }
      }),
    ]);

    // update comments
    setComments([...comments, res.comment]);

    let body = {
      type: "comment",
      from: user._id,
      to: postAuthorId,
      post: postId,
      forum: forumId,
    };

    axios
      .post(`/api/notifications/activityNotification`, body, headers)
      .then(() => {
        let body = {
          author: `${user.firstName} ${user.lastName}`,
          email: postAuthorMail,
          postId,
          forumId,
          name: postAuthorName,
          forumName,
        };

        sendMail(body);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function sendMail(body) {
    axios.post("/api/mail/comment", body).catch((err) => {
      console.error(err);
    });
  }

  return (
    <div className="flex items-start p-1.5 sticky bottom-0 bg-white dark:bg-darkSecondary z-10 shadow-inner">
      {/* user picture */}
      {!user.picture ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
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
          src={
            user.picture.includes("googleusercontent")
              ? user.picture
              : `/uploads/images/${user.picture}`
          }
          alt=""
          className="rounded-full inline h-8 mx-1"
        />
      )}

      {/* form */}
      <form className="p-1" onSubmit={handleSubmit}>
        {/* text input */}
        <input
          type="text"
          name="text"
          onChange={(e) => setText(e.target.value)}
          value={text}
          placeholder="Write your comment"
          className="text-sm mx-1 p-1 border-b-2 border-gray-400 bg-transparent dark:text-darkLight focus:outline-none"
        />

        {/* icons for image & video */}
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
        />

        {/* file preview */}
        {file && (
          <FilePreview
            handleRemoveFile={handleRemoveFile}
            index={0}
            originalFileName={originalFileName}
            classes="border border-primary dark:border-primary-dark bg-[#f3f3f3] dark:bg-gray-800 mt-2 ml-1 px-1.5"
          />
        )}

        {/* submit button */}
        <button
          type="submit"
          disabled={!enablePost}
          className={
            enablePost
              ? "text-white border border-primary bg-primary mx-1 p-1 px-1.5 mt-2 rounded-full text-sm hover:bg-blue-700"
              : "text-[#ffffff80] bg-[#818181] border border-[#818181] mx-1 p-1 px-1.5 mt-2 rounded-full text-sm"
          }
        >
          Comment
        </button>
      </form>
    </div>
  );
}

export default CommentForm;
