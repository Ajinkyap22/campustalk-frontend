import { ForumContext } from "../../Contexts/ForumContext";
import { PostContext } from "../../Contexts/PostContext";
import { Link } from "react-router-dom";
import { useRef, useEffect, useState, useContext } from "react";
import { withRouter } from "react-router-dom";
import FilePreview from "./FilePreview";
import Caption from "./Caption";
import HiddenInputs from "./HiddenInputs";
import InputButtons from "./InputButtons";
import axios from "axios";

function PostForm({
  anonymous,
  setAnonymous,
  important,
  setImportant,
  forum,
  user,
  setUser,
  file,
  setFile,
  text,
  setText,
  progress,
  setProgress,
  setOriginalFileNames,
  originalFileNames,
  isEditing,
  setIsEditing,
  postId,
  ...props
}) {
  // refs for image input, video input & doc input
  const imageInput = useRef(null);
  const videoInput = useRef(null);
  const docInput = useRef(null);

  const imageButton = useRef(null);
  const videoButton = useRef(null);
  const docButton = useRef(null);

  const [disabled, setDisabled] = useState(false);
  const [enablePost, setEnablePost] = useState(false);
  const [fileType, setFileType] = useState(null);

  const [forums, setForums] = useContext(ForumContext);
  const [posts, setPosts] = useContext(PostContext);

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

  useEffect(() => {
    // set enablepost to true if there is at least a text or a file, a forum, a mode and an author
    if ((text || file) && forum && user) {
      setEnablePost(true);
    } else {
      setEnablePost(false);
    }
  }, [file, text, forum, user]);

  useEffect(() => {
    let mounted = true;

    return () => {
      mounted = false;
    };
  }, []);

  function handleRemoveFile(e, index) {
    // if index is not defined, setFormData.file to null
    if (!index && index !== 0) {
      setFile(null);
    } else {
      // remove the file at the index
      setFile(file.filter((file, i) => i !== index));
      // remove file name from originalFileNames
      setOriginalFileNames(originalFileNames.filter((file, i) => i !== index));
    }

    // reset the input
    imageInput.current.value = "";
    videoInput.current.value = "";
    docInput.current.value = "";
  }

  function handleSubmit(e) {
    e.preventDefault();

    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
      onUploadProgress: (data) => {
        setProgress(Math.round((100 * data.loaded) / data.total));
      },
    };

    setEnablePost(false);

    const formData = new FormData();
    formData.append("text", text);
    formData.append("anonymous", anonymous);
    formData.append("important", important);
    formData.append("forumId", forum || forum?._id);
    formData.append("authorId", user._id);
    // if file is an array, add each file to formData
    if (file instanceof Array) {
      file.forEach((file) => {
        formData.append("file", file);
      });
    } else {
      formData.append("file", file);
    }

    originalFileNames.forEach((originalFile, i) => {
      formData.append("originalFileNames", JSON.stringify(originalFile));
    });

    apiRequests(formData, headers);
  }

  function onSuccess(res, headers) {
    // reset form data
    setFile(null);
    setText("");
    setFileType(null);
    setEnablePost(false);
    setAnonymous(false);
    setImportant(false);
    setDisabled(false);
    setOriginalFileNames([]);

    // reset file type
    setFileType(null);

    // redirect to feed
    props.history.push("/feed");

    if (isEditing) {
      onEditingSuccess(res);
    } else {
      axios
        .post(
          `/api/notifications/requestNotification`,
          { forum: forum || forum?._id, type: "postRequest" },
          headers
        )
        .then((res) => {
          props.history.push("/feed");
          sendMail(forum);
        })
        .catch((err) => {
          console.error(err);
        });
    }

    setIsEditing(false);
  }

  function onEditingSuccess(res) {
    // update post in user's posts
    setUser({
      ...user,
      posts: user.posts.map((post) => {
        if (post._id === res._id) {
          return res;
        } else {
          return post;
        }
      }),
    });

    // update post in forum's posts
    setForums(
      forums.map((forum) => (forum._id === res.forum._id ? res.forum : forum))
    );

    // update post in posts
    setPosts(posts.map((post) => (post._id === res._id ? res : post)));
  }

  function apiRequests(formData, headers) {
    if (isEditing) {
      // if fileType is image or null
      if (fileType === "image" || !fileType) {
        axios
          .put(
            `/api/forums/${forum || forum?._id}/posts/update/${postId}`,
            formData,
            headers
          )
          .then((res) => {
            onSuccess(res.data, headers);
          })
          .catch((err) => {
            console.error(err);
          });
      } else if (fileType === "video") {
        axios
          .put(
            `/api/forums/${
              forum || forum?._id
            }/posts/update-vid-post/${postId}`,
            formData,
            headers
          )
          .then((res) => {
            onSuccess(res.data, headers);
          })
          .catch((err) => {
            console.error(err);
          });
      } else if (fileType === "doc") {
        axios
          .put(
            `/api/forums/${
              forum || forum?._id
            }/posts/update-doc-post/${postId}`,
            formData,
            headers
          )
          .then((res) => {
            onSuccess(res.data, headers);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    } else {
      // if fileType is image or null
      if (fileType === "image" || !fileType) {
        axios
          .post(
            `/api/forums/${forum || forum?._id}/posts/create-post`,
            formData,
            headers
          )
          .then((res) => {
            onSuccess(res.data, headers);
          })
          .catch((err) => {
            console.error(err);
          });
      } else if (fileType === "video") {
        axios
          .post(
            `/api/forums/${forum || forum?._id}/posts/create-vid-post`,
            formData,
            headers
          )
          .then((res) => {
            onSuccess(res.data, headers);
          })
          .catch((err) => {
            console.error(err);
          });
      } else if (fileType === "doc") {
        axios
          .post(
            `/api/forums/${forum || forum?._id}/posts/create-doc-post`,
            formData,
            headers
          )
          .then((res) => {
            onSuccess(res.data, headers);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
  }

  function sendMail(f) {
    let forum = forums.find((forum) => forum._id === f);

    let forumName = forum?.forumName;
    let forumId = forum?._id;

    let mods = forum?.moderators;

    mods = mods.map((moderator) => moderator.email);

    let body = {
      forumName,
      forumId,
      emails: mods,
      type: "post",
    };

    axios.post("/api/mail/requests", body).catch((err) => {
      console.error(err);
    });
  }

  return (
    <form
      className="py-2 pt-1"
      encType="multipart/form-data"
      onSubmit={handleSubmit}
    >
      {/* caption input */}
      <Caption setText={setText} text={text} />

      {/* hidden inputs */}
      <HiddenInputs
        setFile={setFile}
        imageInput={imageInput}
        videoInput={videoInput}
        docInput={docInput}
        setFileType={setFileType}
        setOriginalFileNames={setOriginalFileNames}
      />

      {/* names of the uploaded files with a cross button to remove them*/}
      <div className="flex flex-wrap">
        {/* if formData.file is an array map over it*/}
        {file &&
          Array.isArray(file) &&
          file.map((file, index) => (
            <FilePreview
              handleRemoveFile={handleRemoveFile}
              key={index}
              index={index}
              originalFileName={originalFileNames[index]}
              classes="w-full border border-primary dark:border-primary-dark bg-[#f3f3f3] dark:bg-gray-800 mx-4 my-1 mb-2 py-1 px-1.5"
            />
          ))}

        {/* if formData.file is not an array but is not null */}
        {file && !Array.isArray(file) && file !== null && (
          <FilePreview
            handleRemoveFile={handleRemoveFile}
            originalFileName={originalFileNames[0]}
            classes="w-full border border-primary bg-[#f3f3f3] mx-4 my-1 mb-2 py-1 px-1.5"
          />
        )}
      </div>

      {/* 3 input options */}
      <InputButtons
        imageButton={imageButton}
        videoButton={videoButton}
        docButton={docButton}
        imageInput={imageInput}
        videoInput={videoInput}
        docInput={docInput}
        disabled={disabled}
      />

      {/* form actions */}
      <div className="absolute right-3 bottom-2.5">
        <Link
          to="/feed"
          className=" text-primary dark:text-primary-light border border-primary dark:border-primary-light mx-1 p-1.5 px-4 rounded-full text-sm 2xl:text-base hover:bg-primary hover:text-white hover:dark:text-darkLight"
        >
          Cancel
        </Link>

        <button
          disabled={!enablePost}
          type="submit"
          className={
            enablePost
              ? "text-white border border-primary bg-primary mx-1 p-1.5 px-4 rounded-full text-sm 2xl:text-base hover:bg-blue-700"
              : "text-[#ffffff80] bg-[#818181] border border-[#818181] mx-1 p-1.5 px-4 rounded-full text-sm 2xl:text-base"
          }
        >
          {isEditing ? "Save" : "Post"}
        </button>
      </div>

      {/* overlay */}
      <div
        className={
          progress > 0
            ? "fixed top-0 left-0 bottom-0 right-0 bg-white opacity-50"
            : "hidden"
        }
      ></div>
    </form>
  );
}

export default withRouter(PostForm);
