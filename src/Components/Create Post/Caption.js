function Caption({ text, setText }) {
  function handleKeyDown(e) {
    e.target.style.height = "inherit";
    e.target.style.height = `${e.target.scrollHeight}px`;
  }

  function handleTextInput(e) {
    setText(e.target.value);
  }

  return (
    <div className="p-2">
      <textarea
        name="text"
        cols="30"
        rows="1"
        className="p-2 2xl:text-base w-full rounded text-sm focus:outline-none focus:border-gray-500 dark:text-darkLight bg-transparent overflow-hidden"
        placeholder="Write something..."
        onKeyDown={handleKeyDown}
        onChange={handleTextInput}
        value={text}
      ></textarea>
    </div>
  );
}

export default Caption;
