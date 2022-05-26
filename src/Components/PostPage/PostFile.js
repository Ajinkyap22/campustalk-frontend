import { useEffect, useState } from "react";
import File from "../Post/File";

function PostFile({ post, handleBack }) {
  const [folder, setFolder] = useState("images");
  const [currentFile, setCurrentFile] = useState(0);

  useEffect(() => {
    if (!post.file.length || post.originalFileNames.length) return;

    if (post.originalFileNames[currentFile].type === "image") {
      setFolder("images");
    } else if (post.originalFileNames[currentFile].type === "video") {
      setFolder("videos");
    } else {
      setFolder("docs");
    }
  }, []);

  function handleDownload() {
    fetch(`/uploads/${folder}/${post.file[currentFile]}`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = post.file[0];
        a.click();
      });
    });
  }

  return (
    <section
      className={`${
        !post.file || !post.file.length ? "hidden lg:block" : ""
      } lg:col-span-3 bg-black relative`}
    >
      {/* file */}
      {post.file.length ? (
        <File
          classes="flex items-center relative mx-auto bg-black max-w-fit"
          files={post.file}
          fullScreen={true}
          currentFile={currentFile}
          setCurrentFile={setCurrentFile}
        />
      ) : (
        <p className="text-white text-lg dark:text-darkLight text-center relative top-[45%]">
          This post does not contain any media.
        </p>
      )}

      {/* back button */}
      <button
        onClick={handleBack}
        className="absolute left-3 lg:left-5 top-3 lg:top-4 bg-[rgba(10,10,10,0.5)] lg:bg-[rgba(255,255,255,0.2)]  p-1 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* download button */}
      <button
        onClick={handleDownload}
        className="absolute right-5 top-4 bg-[rgba(10,10,10,0.5)] lg:bg-[rgba(255,255,255,0.2)] p-1 rounded-full"
        hidden={!post.file.length}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="white"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
          />
        </svg>
      </button>
    </section>
  );
}

export default PostFile;
