function InputButtons({
  imageButton,
  imageInput,
  disabled,
  videoButton,
  videoInput,
  docButton,
  docInput,
}) {
  function handleFileInput(e, ref) {
    // trigger click on the ref
    ref.current.click();
  }

  return (
    <div className="p-2 flex items-center w-full">
      {/* images */}
      <button
        type="button"
        ref={imageButton}
        className="mx-2"
        onClick={(e) => handleFileInput(e, imageInput)}
        title="Add images"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          className={`inline ${
            disabled ? "fill-[#ababab]" : "fill-[#818181] dark:fill-gray-300"
          }`}
          viewBox="0 0 16 16"
        >
          <path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
          <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z" />
        </svg>
      </button>

      {/* video */}
      <button
        type="button"
        ref={videoButton}
        className="mx-2"
        onClick={(e) => handleFileInput(e, videoInput)}
        title="Add a video"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          className={`inline ${
            disabled ? "fill-[#ababab]" : "fill-[#818181] dark:fill-gray-300"
          }`}
          viewBox="0 0 16 16"
        >
          <path d="M0 12V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm6.79-6.907A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
        </svg>
      </button>

      {/* doc */}
      <button
        type="button"
        ref={docButton}
        className="mx-2"
        onClick={(e) => handleFileInput(e, docInput)}
        title="Add a document"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          className={`inline ${
            disabled ? "fill-[#ababab]" : "fill-[#818181] dark:fill-gray-300"
          }`}
          viewBox="0 0 16 16"
        >
          <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z" />
          <path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z" />
        </svg>
      </button>
    </div>
  );
}

export default InputButtons;
