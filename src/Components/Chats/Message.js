import moment from "moment";
import File from "./File";

function Message({ message, user }) {
  return (
    <div
      className={`flex ${
        message.sender._id === user._id ? "flex-row-reverse" : "flex-row"
      } px-3 pt-2 py-1`}
    >
      {/* message */}
      <div>
        {/* text */}
        {message.text && (
          <div
            className={`${
              message.sender._id === user._id
                ? "bg-primary-light text-white dark:text-darkLight"
                : "bg-white dark:bg-darkLight shadow"
            } p-1.5 2xl:p-2 3xl:p-2.5 rounded-lg text-sm 2xl:text-lg 3xl:text-xl`}
          >
            {message.text}
          </div>
        )}

        {/* file */}
        {message.file && (
          <File
            file={message.file}
            user={user}
            sender={message.sender}
            originalFileName={message.originalFileName}
            type={message.originalFileName?.type || message.fileType}
          />
        )}

        {/* time */}
        <div
          className={`${
            message.sender._id === user._id ? "text-right" : "text-left"
          } text-xs 2xl:text-sm 3xl:text-base text-secondary dark:text-gray-300 p-1`}
        >
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    </div>
  );
}

export default Message;
