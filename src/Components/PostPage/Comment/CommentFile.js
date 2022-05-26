import { FileContext } from "../../../Contexts/FileContext";
import { withRouter } from "react-router-dom";
import { useContext, useEffect } from "react";

function CommentFile({ file, type, name, size, history, small = false }) {
  const [files, setFiles] = useContext(FileContext);

  useEffect(() => {
    let newFile = {
      file,
      type,
      name,
    };

    setFiles([...files, newFile]);
  }, []);

  function handleClick() {
    history.push(`/media/${file}`);
  }

  return (
    <div className="flex items-center cursor-pointer" onClick={handleClick}>
      {file && type === "image" ? (
        <img
          src={`/uploads/images/${file}`}
          alt=""
          className="mx-auto p-2 rounded-xl w-full h-full object-cover"
        />
      ) : file && type === "video" ? (
        <video
          src={`/uploads/videos/${file}`}
          alt=""
          className="mx-auto p-2 rounded-xl w-full h-full object-cover"
          controls
          hidden={!file}
        />
      ) : (
        file && (
          <div className="flex items-center justify-center bg-[#cfe2ff] max-w-full p-2 mt-2 ml-2 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="fill-current w-5 text-primary-light border-r-2 border-primary-light"
            >
              <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M13,13V18H10V13H13Z" />
            </svg>

            <span className={`ml-2 ${small ? "text-mxs" : "text-sm"} block`}>
              {name}
            </span>
            {/* convert file size from bytes to kb or mb */}
            {size && (
              <span className="ml-2 text-secondary text-xs">
                {size > 1000000
                  ? `(${(size / 1024 / 1024).toFixed(2)} MB)`
                  : size > 1024
                  ? `(${(size / 1024).toFixed(2)} KB)`
                  : `(${size} Bytes)`}
              </span>
            )}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="fill-current w-5 text-primary-light ml-2"
            >
              <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
            </svg>
          </div>
        )
      )}
    </div>
  );
}

export default withRouter(CommentFile);
