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

ReactDOM.render(
  <React.StrictMode>
    <ModeProvider>
      <SocketProvider>
        <UserProvider>
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
        </UserProvider>
      </SocketProvider>
    </ModeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
