import { useRef, useEffect } from "react";
import Message from "./Message";

function Messages({ messages, user, loading }) {
  const scrollRef = useRef(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  useEffect(() => {
    if (!loading) scrollToBottom();
  }, [messages, loading]);

  return (
    <div>
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} user={user} />
        </div>
      ))}

      <div
        ref={scrollRef}
        style={{ float: "left", clear: "both" }}
        className="scroll"
      ></div>
    </div>
  );
}

export default Messages;
