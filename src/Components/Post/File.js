import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { withRouter } from "react-router-dom";
import Swipe from "react-easy-swipe";
import "./File.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
};

function File({
  files,
  onPostClick,
  classes,
  fullScreen = false,
  currentFile,
  setCurrentFile,
  originalFileNames,
  small = false,
  history,
}) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [isPDF, setIsPDF] = useState(false);

  useEffect(() => {
    // check if the file is a pdf
    if (files[currentFile].type === "application/pdf") {
      setIsPDF(true);
    } else {
      setIsPDF(false);
    }
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setIsPDF(true);
  }

  function changePage(diff) {
    setPageNumber(pageNumber + diff);
  }

  function handleClick(direction) {
    if (direction === "left") {
      if (currentFile === 0) return;
      setCurrentFile(currentFile - 1);
    } else {
      if (currentFile === files.length - 1) return;
      setCurrentFile(currentFile + 1);
    }
  }

  function handleDownload(e, name, file) {
    e.stopPropagation();

    fetch(`https://campustalk-api.herokuapp.com/uploads/docs/${file}`).then(
      (response) => {
        response.blob().then((blob) => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a");
          a.href = url;
          a.download = name;
          a.click();
        });
      }
    );
  }

  return (
    <div className={classes} onClick={onPostClick}>
      <AiOutlineLeft
        onClick={handleClick.bind(this, "left")}
        className="pageChange absolute left-0 text-3xl top-[45%] bg-[rgba(0,0,0,0.5)] rounded text-white cursor-pointer"
        hidden={files.length === 1 || currentFile === 0}
      />
      <Swipe
        onSwipeLeft={handleClick.bind(this, "left")}
        onSwipeRight={handleClick.bind(this, "right")}
      >
        {/* for each file */}
        {files.map(
          (file, i) =>
            // if it is an image or gif
            ((file.endsWith(".jpg") ||
              file.endsWith(".jpeg") ||
              file.endsWith(".png") ||
              file.endsWith(".gif")) && (
              <img
                src={`https://campustalk-api.herokuapp.com/uploads/images/${file}`}
                key={i}
                alt=""
                className={`mx-auto ${
                  !fullScreen ? "w-full h-full" : "h-screen"
                } object-cover`}
                hidden={i !== currentFile}
              />
            )) ||
            // if file is a .mp4 or .mkv or .mpeg-4
            ((file.endsWith(".mp4") ||
              file.endsWith(".mkv") ||
              file.endsWith(".mpeg-4")) && (
              <video
                src={`https://campustalk-api.herokuapp.com/uploads/videos/${file}`}
                key={i}
                alt=""
                className="mx-auto w-full h-full object-cover"
                hidden={i !== currentFile}
                controls
              />
            )) ||
            // if file is a pdf
            (file.endsWith(".pdf") && (
              <Document
                file={`https://campustalk-api.herokuapp.com/uploads/docs/${file}`}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
                key={i}
                hidden={i !== currentFile}
              >
                <AiOutlineLeft
                  className="pageChange absolute left-0 text-4xl inset-y-1/2 bg-[rgba(0,0,0,0.5)] rounded text-white cursor-pointer z-10"
                  hidden={pageNumber === 1}
                  onClick={() => changePage(-1)}
                />
                <Page pageNumber={pageNumber} renderAnnotationLayer={false} />
                <AiOutlineRight
                  className="pageChange absolute right-0 text-4xl inset-y-1/2 bg-[rgba(0,0,0,0.5)] rounded text-white cursor-pointer z-10"
                  hidden={pageNumber === numPages}
                  onClick={() => changePage(1)}
                />
              </Document>
            )) || (
              <div
                key={i}
                className="flex items-center justify-center bg-[#cfe2ff] max-w-full p-2 doc dark:bg-[#3e3d3d]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="fill-current w-5 text-primary-light border-r-2 border-primary-light doc"
                >
                  <path
                    className="doc"
                    d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20M13,13V18H10V13H13Z"
                  />
                </svg>

                <span
                  className={`ml-2 ${
                    small ? "text-mxs" : "text-sm"
                  } block doc dark:text-darkLight`}
                >
                  {originalFileNames[i].name.length > 25
                    ? originalFileNames[i].name.substring(0, 25) + "..."
                    : originalFileNames[i].name}
                </span>

                {/* convert file size from bytes to kb or mb */}
                {originalFileNames[i].size && (
                  <span className="ml-2 text-secondary text-center text-xs doc dark:text-gray-300">
                    {originalFileNames[i].size > 1000000
                      ? `${(originalFileNames[i].size / 1024 / 1024).toFixed(
                          2
                        )} MB`
                      : originalFileNames[i].size > 1024
                      ? `${(originalFileNames[i].size / 1024).toFixed(2)} KB`
                      : `${originalFileNames[i].size} Bytes`}
                  </span>
                )}

                {/* download button */}
                <button
                  onClick={(e) =>
                    handleDownload(e, originalFileNames[i].name, file)
                  }
                  title="Download"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current w-5 text-primary-light ml-2 doc"
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
              </div>
            )
        )}
      </Swipe>
      <AiOutlineRight
        onClick={handleClick.bind(this, "right")}
        className="pageChange absolute right-0 top-[45%] bg-[rgba(0,0,0,0.5)] rounded text-3xl inset-y-1/2 text-white cursor-pointer"
        hidden={files.length === 1 || currentFile === files.length - 1}
      />

      {/* show current image number on the top right */}
      <span
        hidden={files.length === 1}
        className="text-sm bg-[rgba(10,10,10,0.5)] rounded p-1 px-2 text-white absolute md:top-1 md:right-1"
      >
        {currentFile + 1}/{files.length}
      </span>

      {/* show current page number on the bottom center */}
      <div
        className="text-center text-sm bg-[rgba(0,0,0,0.7)] p-2.5 text-white absolute w-full bottom-0"
        hidden={!isPDF || fullScreen}
      >
        Page {pageNumber} out of {numPages}
      </div>

      {/* show current page number on the top-right */}
      <span
        className="text-sm bg-[rgba(10,10,10,0.5)] rounded p-1 px-2 text-white absolute top-1 right-1"
        hidden={!isPDF}
      >
        {pageNumber}/{numPages}
      </span>
    </div>
  );
}

export default withRouter(File);
