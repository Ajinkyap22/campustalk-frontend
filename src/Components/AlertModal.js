function AlertModal({ text, subtext, showAlert, setShowAlert }) {
  function hide() {
    setShowAlert(false);
    // show overflow
    document.body.style.overflow = "visible";
  }
  return (
    <div
      className="bg-white rounded shadow-base w-[80%] md:w-1/2 xl:w-1/3 text-center md:p-4"
      hidden={showAlert ? false : true}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="50"
        className="mx-auto mt-3"
        fill="#626262"
        viewBox="0 0 16 16"
      >
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
        <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
      </svg>

      <div className="text-center p-3 px-4">
        <p className="xl:text-lg m-auto py-2 2xl:text-xl">{text}</p>
        <p className="text-xs xl:text-sm py-3 2xl:text-base">{subtext}</p>
      </div>

      <button
        className="bg-primary text-sm xl:text-base px-4 py-2 text-white rounded mb-4"
        onClick={hide}
      >
        OK
      </button>
    </div>
  );
}

export default AlertModal;
