import React, { useState } from "react";

export const ChatContext = React.createContext();

export function ChatProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [activeChat, setActiveChat] = useState(null);

  return (
    <ChatContext.Provider value={[chats, setChats, activeChat, setActiveChat]}>
      {children}
    </ChatContext.Provider>
  );
}
