import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = React.createContext();

export function SocketProvider({ children }) {
  const socket = useRef(null);
  const [onlineUsers, setOnlineUsers] = useState({});

  useEffect(() => {
    const url =
      process.env.NODE_ENV === "production"
        ? "https://campustalk-app.herokuapp.com/"
        : "http://localhost:3000";

    socket.current = io(url);

    socket.current.on("users", (users) => {
      setOnlineUsers(users);
    });
  }, []);

  return (
    <SocketContext.Provider value={[socket, onlineUsers, setOnlineUsers]}>
      {children}
    </SocketContext.Provider>
  );
}
