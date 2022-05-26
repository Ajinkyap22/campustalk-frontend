import { Document, Page, pdfjs } from "react-pdf";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
};

function FileView({ file, name, type, title, history }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [folder, setFolder] = useState("images");

  useEffect(() => {
    if (type === "image") {
      setFolder("images");
    } else if (type === "video") {
      setFolder("videos");
    } else {
      setFolder("docs");
    }
  }, []);

  function handleBack() {
    history.goBack();
  }

  function handleDownload() {
    fetch(`/uploads/${folder}/${file}`).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = name;
        a.click();
      });
    });
  }

  useEffect(() => {
    document.title = title || `${name} | CampusTalk`;
  }, [title]);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function changePage(diff) {
    setPageNumber(pageNumber + diff);
  }
  return (
    <main className="flex items-center justify-center bg-black w-full h-screen overflow-hidden">
      <div className=" relative mx-auto bg-black max-w-fit">
        {/* image */}
        {type === "image" ? (
          <img
            src={`/uploads/images/${file}`}
            alt=""
            className="mx-auto max-h-screen object-cover"
          />
        ) : type === "doc" ? (
          <Document
            file={`/uploads/docs/${file}`}
            onLoadSuccess={onDocumentLoadSuccess}
            options={options}
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
        ) : (
          <div>
            <iframe
              src={`https://view.officeapps.live.com/op/embed.aspx?src=https://campustalk-app.herokuapp.com/public/uploads/docs/${file}`}
              title={name}
              width="1366px"
              height="623px"
              frameborder="0"
            >
              This is an embedded{" "}
              <a
                target="_blank"
                href="http://office.com"
                rel="noopener noreferrer"
              >
                Microsoft Office
              </a>{" "}
              document, powered by{" "}
              <a
                target="_blank"
                href="http://office.com/webapps"
                rel="noopener noreferrer"
              >
                Office Online
              </a>
            </iframe>
          </div>
        )}
      </div>

      {/* back button */}
      <button
        onClick={handleBack}
        title="Back"
        className="absolute left-5 top-4 bg-[rgba(255,255,255,0.2)]  p-1 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
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
        title="Download"
        className="absolute right-5 top-4 bg-[rgba(255,255,255,0.2)] p-1 rounded-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-7 w-7"
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

      {/* show current page number on the bottom center */}
      <div
        className="text-center text-sm bg-[rgba(0,0,0,0.7)] p-2.5 text-white absolute w-full bottom-0"
        hidden={type !== "doc"}
      >
        Page {pageNumber} out of {numPages}
      </div>
    </main>
  );
}

export default withRouter(FileView);
