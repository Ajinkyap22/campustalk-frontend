function Overlay({ text, showOverlay }) {
  return (
    <div
      className={`fixed w-full ${
        showOverlay ? "flex" : ""
      } justify-center items-center h-full bg-[rgba(0,0,0,0.7)]`}
      hidden={showOverlay ? false : true}
    >
      <h1 className="text-2xl text-white tracking-wide pulse">{text}</h1>
    </div>
  );
}

export default Overlay;
