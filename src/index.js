import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ForumProvider } from "./Contexts/ForumContext";
import { PostProvider } from "./Contexts/PostContext";
import { UserProvider } from "./Contexts/UserContext";
import { ModeProvider } from "./Contexts/ModeContext";
import { SocketProvider } from "./Contexts/SocketContext";
import { ChatProvider } from "./Contexts/ChatContext";
import { FileProvider } from "./Contexts/FileContext";
import { EventProvider } from "./Contexts/EventContext";
import { NotificationProvider } from "./Contexts/NotificationContext";
import { TabProvider } from "./Contexts/TabContext";
import { GuestProvider } from "./Contexts/GuestContext";

ReactDOM.render(
  <React.StrictMode>
    <ModeProvider>
      <SocketProvider>
        <UserProvider>
          <GuestProvider>
            <ForumProvider>
              <PostProvider>
                <FileProvider>
                  <ChatProvider>
                    <EventProvider>
                      <NotificationProvider>
                        <TabProvider>
                          <App />
                        </TabProvider>
                      </NotificationProvider>
                    </EventProvider>
                  </ChatProvider>
                </FileProvider>
              </PostProvider>
            </ForumProvider>
          </GuestProvider>
        </UserProvider>
      </SocketProvider>
    </ModeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
