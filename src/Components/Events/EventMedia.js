import { FileContext } from "../../Contexts/FileContext";
import { withRouter } from "react-router-dom";
import { useRef, useContext } from "react";
import axios from "axios";

function EventMedia({
  id,
  video,
  doc,
  name,
  images,
  setEvents,
  isModerator,
  history,
}) {
  const [files, setFiles] = useContext(FileContext);
  const videoRef = useRef();
  const docRef = useRef();
  const imageRef = useRef();

  function handleClick() {
    history.push(`/media/${doc}`);
  }

  function handleImageClick(i) {
    history.push(`/media/${images[i]}`);
  }

  function handleDownload() {
    fetch(`/uploads/docs/${doc}`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = name;
        a.click();
      });
    });
  }

  function handleFileInput(ref) {
    // trigger click on the ref
    ref.current.click();
  }

  function uploadMedia(e, type) {
    if (e.target.files.length > 5) {
      alert("You can only upload 5 images");
      return;
    }

    let files;

    if (type === "images") {
      files = [...images];

      // append images to files array upto 5
      for (let i = 0; i < e.target.files.length; i++) {
        if (files.length < 5) {
          files.push(e.target.files[i]);
        } else {
          break;
        }
      }
    }

    let formData = new FormData();

    if (type === "images") {
      files.forEach((file) => {
        formData.append("images", file);
      });
    } else {
      formData.append(type, e.target.files[0]);
    }

    formData.append("type", type);

    apiRequest(formData, type);
  }

  function apiRequest(formData, type) {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    axios
      .post(`/api/events/${id}/upload-event-${type}`, formData, headers)
      .then((res) => {
        setEvents((prevEvents) =>
          prevEvents.map((e) => (e._id === res.data._id ? res.data : e))
        );

        setFiles([...files, ...res.data[type]]);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function deleteMedia(type, file) {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    let body = {};

    type === "image" ? (body.imageName = file) : (body.type = type);

    let path =
      type === "image"
        ? `/api/events/${id}/delete-event-image`
        : `/api/events/${id}/delete-event-media`;

    axios
      .post(path, body, headers)
      .then((res) => {
        console.log(res.data);

        setEvents((prevEvents) =>
          prevEvents.map((e) => (e._id === res.data._id ? res.data : e))
        );

        if (type !== "video") {
          setFiles((prevFiles) => prevFiles.filter((f) => f.name !== file));
        }
      })
      .catch((err) => {
        console.log(err.response);
        console.error(err);
      });
  }

  return (
    <div className="lg:col-span-2 2xl:col-span-3">
      {/* event doc */}
      <section className="text-center my-8 lg:w-2/3">
        <h2 className="text-xl 2xl:text-3xl my-4 2xl:my-5 text-primary dark:text-primary-dark">
          Information Document
        </h2>

        {doc ? (
          <div className="flex items-center bg-white dark:bg-[#3e3d3d] mx-auto w-[90%] lg:w-full 2xl:w-[90%] justify-between h-full p-2 rounded">
            {/* info */}
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="fill-current text-primary-light border-r-2 mx-1 border-primary-light inline w-6 2xl:w-7"
              >
                <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M13,13V18H10V13H13Z" />
              </svg>

              <span className="ml-2 2xl:text-xl dark:text-darkLight">
                {name.length > 25
                  ? `${name.substring(0, 25)}...`
                  : name + "." + doc.split(".")[1]}
              </span>
            </div>

            {/* actions */}
            <div className="flex items-center">
              {/* delete */}
              {isModerator && (
                <button
                  className="inline-flex items-center hover:scale-110 transition-all"
                  title="Delete Document"
                  onClick={() => deleteMedia("document", doc)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 2xl:w-7 2xl:mx-1.5 mx-1 stroke-red-500 dark:stroke-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              )}

              {/* download button */}
              <button
                onClick={handleDownload}
                title="Download"
                className="p-1 rounded-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 2xl:w-8 2xl:w-9 stroke-primary-light"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                  />
                </svg>
              </button>

              {/* open icon */}
              <button onClick={handleClick} title="Open Document">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="fill-current text-primary-light ml-2 justify-self-end w-6 2xl:w-7"
                >
                  <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <span className="text-secondary dark:text-gray-300 2xl:text-xl">
              There are no documents
            </span>

            <button
              className="mt-4 2xl:mt-5 2xl:mb-2 block mx-auto hover:scale-125 transition-all"
              onClick={() => handleFileInput(docRef)}
              hidden={!isModerator}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 2xl:w-9 fill-[#818181] dark:fill-gray-300 mx-auto"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
            </button>

            <span className="mt-2 block text-secondary dark:text-gray-300 2xl:text-xl">
              Click here to add a document
            </span>

            {/* docs input - accept only pdf|doc|docx|ppt|pptx|xls|xlsx */}
            <input
              onChange={(e) => uploadMedia(e, "document")}
              ref={docRef}
              type="file"
              name="file"
              accept="application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              className="hidden"
              data-max-size="10485760"
            />
          </div>
        )}
      </section>

      {/* event video */}
      <section className="my-8 text-center lg:w-2/3">
        <div className="flex items-center justify-center">
          <h2 className="text-xl 2xl:text-3xl my-4 2xl:my-5 text-primary dark:text-primary-dark">
            Video
          </h2>

          {isModerator && video && (
            <button
              className="hover:scale-110 transition-all"
              title="Delete Document"
              onClick={() => deleteMedia("video", video)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 2xl:w-6 mx-1.5 2xl:mx-2 stroke-red-500 dark:stroke-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          )}
        </div>

        {video ? (
          <video
            src={`/uploads/videos/${video}`}
            controls
            className="w-[90%] mx-auto lg:w-full 2xl:w-[90%] h-full"
          />
        ) : (
          <div>
            <span className="text-secondary dark:text-gray-300 2xl:text-xl">
              There are no videos
            </span>

            <button
              className="mt-4 2xl:mt-5 2xl:mb-2 block mx-auto hover:scale-125 transition-all"
              onClick={() => handleFileInput(videoRef)}
              hidden={!isModerator}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 2xl:w-9 fill-[#818181] dark:fill-gray-300 mx-auto"
                viewBox="0 0 16 16"
              >
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
              </svg>
            </button>

            <span className="mt-2 block text-secondary dark:text-gray-300 2xl:text-xl">
              Click here to add a video
            </span>

            {/* video inputm accept only videos */}
            <input
              onChange={(e) => uploadMedia(e, "video")}
              ref={videoRef}
              type="file"
              name="file"
              accept="video/*"
              className="hidden"
              data-max-size=" 10485760"
            />
          </div>
        )}
      </section>

      {/* images */}
      <section className="my-8 text-center lg:w-2/3">
        <h2 className="text-xl 2xl:text-3xl my-4 text-primary dark:text-primary-dark">
          Images
        </h2>

        {images && images.length > 0 ? (
          <div className="flex flex-wrap justify-center">
            {images.map((image, i) => (
              <div
                key={i}
                className="relative w-full h-full dark:text-gray-300"
              >
                <img
                  src={`/uploads/images/${image}`}
                  alt={image}
                  onClick={() => handleImageClick(i)}
                  className="m-2 cursor-pointer w-[90%] lg:w-full 2xl:w-[90%] 2xl:text-xl"
                />

                {isModerator && (
                  <button
                    className="text-sm text-secondary dark:text-gray-300 2xl:text-xl hover:scale-105 transition-all underline dark:hover:text-red-500 hover:text-red-500"
                    title="Delete Document"
                    onClick={() => deleteMedia("image", image)}
                  >
                    Delete Image
                  </button>
                )}
              </div>
            ))}
          </div>
        ) : null}

        <span
          className="text-secondary dark:text-gray-300 2xl:text-xl"
          hidden={images.length !== 0}
        >
          There are no images
        </span>

        <div hidden={images.length === 5 || !isModerator}>
          <button
            className="mt-4 2xl:mt-5 2xl:mb-2 block mx-auto hover:scale-125 transition-all"
            onClick={() => handleFileInput(imageRef)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 2xl:w-9 fill-[#818181] dark:fill-gray-300 mx-auto"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
            </svg>
          </button>

          <span className="mt-2 block text-secondary dark:text-gray-300 2xl:text-xl">
            Click here to add images
          </span>
          <span className="mt-2 block text-sm text-secondary dark:text-gray-300 2xl:text-xl">
            (You can add upto 5 images)
          </span>

          <input
            onChange={(e) => uploadMedia(e, "images")}
            ref={imageRef}
            type="file"
            name="file"
            accept="image/*"
            multiple
            className="hidden"
            data-max-size="20971520"
          />
        </div>
      </section>
    </div>
  );
}

export default withRouter(EventMedia);
