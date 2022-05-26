import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useContext, useEffect, lazy, Suspense } from "react";

import { Join } from "./Components/JoinForum/Join";
import Loading from "./Components/Loading";
import PageNotFound from "./Components/404";

import { ForumContext } from "./Contexts/ForumContext";
import { PostContext } from "./Contexts/PostContext";
import { ModeContext } from "./Contexts/ModeContext";
import { FileContext } from "./Contexts/FileContext";
import { EventContext } from "./Contexts/EventContext";
import { NotificationContext } from "./Contexts/NotificationContext";
import { UserContext } from "./Contexts/UserContext";
import Forum from "./Components/Forum/Forum";

const Home = lazy(() => import("./Components/Homepage/Home"));
const UserInfo = lazy(() => import("./Components/User Info/UserInfo"));
const CreateForum = lazy(() => import("./Components/Create Forum/Create"));
const Forums = lazy(() => import("./Components/Forum/Forums"));
// const Forum = lazy(() => import("./Components/Forum/Forum"));
const Login = lazy(() => import("./Components/Auth/Login"));
const Signup = lazy(() => import("./Components/Auth/Signup"));
const Feed = lazy(() => import("./Components/Feed/Feed"));
const CreatePost = lazy(() => import("./Components/Create Post/CreatePost"));
const PostPage = lazy(() => import("./Components/PostPage/PostPage"));
const Profile = lazy(() => import("./Components/Profile/Profile"));
const Chats = lazy(() => import("./Components/Chats/Chats"));
const FileView = lazy(() => import("./Components/Chats/FileView"));
const Events = lazy(() => import("./Components/Events/Events"));
const Event = lazy(() => import("./Components/Events/Event"));
const CreateEvent = lazy(() => import("./Components/Events/CreateEvent"));
const Notifications = lazy(() => import("./Components/Navbar/Notifications"));
const Verify = lazy(() => import("./Components/Auth/Verify"));
const Confirm = lazy(() => import("./Components/Auth/Confirm"));
const Forget = lazy(() => import("./Components/Auth/Forget"));
const Reset = lazy(() => import("./Components/Auth/Reset"));
const EditForum = lazy(() => import("./Components/Forum/EditForum"));
const EditEvent = lazy(() => import("./Components/Events/EditEvent"));
const AddRules = lazy(() => import("./Components/Forum/AddRules"));

function App() {
  const [forums, setForums] = useContext(ForumContext);
  const [events, setEvents] = useContext(EventContext);
  const [files] = useContext(FileContext);
  const [posts] = useContext(PostContext);
  const [mode] = useContext(ModeContext);
  const [user] = useContext(UserContext);
  const [
    notifications,
    setNotifications,
    showNotifications,
    setShowNotifications,
    notificationCount,
    setNotificationCount,
  ] = useContext(NotificationContext);

  useEffect(() => {
    if (mode === "light") {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
    // add dark class to html element
  }, [mode]);

  return (
    <div className="App relative dark:bg-dark">
      <Suspense
        fallback={
          <div className="w-full h-full flex justify-center items-center">
            <Loading />
          </div>
        }
      >
        <Router basename="/">
          <Switch>
            {/* Homepage */}
            <Route exact path="/" render={() => <Home />} />

            {/* Login */}
            <Route
              exact
              path="/login"
              render={() => <Login title="Log in | CampusTalk" />}
            />

            {/* Signup */}
            <Route
              exact
              path="/signup"
              render={() => <Signup title={"Sign up | CampusTalk"} />}
            />

            {/* User info page*/}
            <Route
              exact
              path="/user-info"
              render={() => <UserInfo title={"User Profile | CampusTalk"} />}
            />

            {/* verify page */}
            <Route
              exact
              path="/verify"
              render={() => <Verify title={"Account Created | CampusTalk"} />}
            />

            {/* confirm page */}
            {user && (
              <Route
                exact
                path={`/confirm/${user._id}`}
                render={() => (
                  <Confirm title={"Account Confirmed | CampusTalk"} />
                )}
              />
            )}

            {/* forget password */}
            <Route
              exact
              path="/forgot-password"
              render={() => <Forget title={"Forget Password | CampusTalk"} />}
            />

            {/* reset password */}
            <Route
              exact
              path="/reset-password/:id"
              render={() => <Reset title={"Reset Password | CampusTalk"} />}
            />

            {/* Join Forum */}
            <Route
              exact
              path="/join-forum"
              render={() => (
                <Join
                  title={"Join Forum | CampusTalk"}
                  forums={forums}
                  setForums={setForums}
                />
              )}
            />

            {/* Create forum */}
            <Route
              exact
              path="/create-forum"
              render={() => <CreateForum title={"Create Forum | CampusTalk"} />}
            />

            {/* chat file view */}
            {files.map((file, i) => (
              <Route
                exact
                path={`/media/${file.file}`}
                render={() => (
                  <FileView
                    file={file.file}
                    name={file.name}
                    type={file.type}
                    title={`${file.name} | CampusTalk`}
                  />
                )}
                key={i}
              />
            ))}

            {/* Feed */}
            <Route
              exact
              path="/feed"
              render={() => <Feed title={"Feed | CampusTalk"} />}
            />

            {/* Forums */}
            <Route
              exact
              path="/forums"
              render={() => <Forums title={"Forums | CampusTalk"} />}
            />

            {/* forum page */}
            {forums.map((forum, i) => {
              return (
                <Route
                  key={i}
                  exact
                  path={`/forums/${forum._id}`}
                  render={() => (
                    <Forum
                      title={`${forum.forumName} | CampusTalk`}
                      forum={forum}
                    />
                  )}
                />
              );
            })}

            {/* postRequests */}
            {forums.map((forum, i) => {
              return (
                <Route
                  exact
                  key={i}
                  path={`/forums/${forum._id}/postRequests`}
                  render={() => (
                    <Forum
                      title={`${forum.forumName} | CampusTalk`}
                      forum={forum}
                      defaultTab="postRequests"
                    />
                  )}
                />
              );
            })}

            {/* joinRequests */}
            {forums.map((forum, i) => {
              return (
                <Route
                  key={i}
                  exact
                  path={`/forums/${forum._id}/joinRequests`}
                  render={() => (
                    <Forum
                      title={`${forum.forumName} | CampusTalk`}
                      forum={forum}
                      defaultTab="joinRequests"
                    />
                  )}
                />
              );
            })}

            {/* edit */}
            {forums.map((forum, i) => {
              return (
                <Route
                  key={i}
                  exact
                  path={`/forums/${forum._id}/edit-forum`}
                  render={() => (
                    <EditForum
                      title={"Edit Forum | CampusTalk"}
                      forum={forum}
                    />
                  )}
                />
              );
            })}

            {/* rules */}
            {forums.map((forum, i) => {
              return (
                <Route
                  key={i}
                  exact
                  path={`/forums/${forum._id}/rules`}
                  render={() => (
                    <AddRules
                      title={"Forum Rules | CampusTalk"}
                      forumRules={forum.rules}
                      forumId={forum._id}
                    />
                  )}
                />
              );
            })}

            {/* Create post */}
            <Route
              exact
              path="/create-post"
              render={() => <CreatePost title={"Create Post | CampusTalk"} />}
            />

            {/* edit post page for each post */}
            {posts.map((post, i) => (
              <Route
                exact
                path={`/forums/${post.forum._id}/posts/${post._id}/edit-post`}
                key={i}
                render={() => (
                  <CreatePost title={`Edit Post | CampusTalk`} post={post} />
                )}
              />
            ))}

            {/* post page for each post */}
            {posts.map((post, i) => (
              <Route
                exact
                path={`/forums/${post.forum._id}/posts/${post._id}`}
                key={i}
                render={() => (
                  <PostPage
                    title={`${post.author.firstName}'s Post in ${post.forum.forumName} | CampusTalk`}
                    post={post}
                  />
                )}
              />
            ))}

            {/* profile page */}
            <Route
              exact
              path="/profile"
              render={() => <Profile title={"My Profile | CampusTalk"} />}
            />

            {/* chats */}
            <Route
              exact
              path="/chats"
              render={() => <Chats title={"Chats | CampusTalk"} />}
            />

            {/* events */}
            <Route
              exact
              path="/events"
              render={() => <Events title={"Events | CampusTalk"} />}
            />

            {/* event page */}
            {events.map((event, i) => (
              <Route
                key={i}
                exact
                path={`/events/${event._id}`}
                render={() => (
                  <Event
                    title={`${event.name} | CampusTalk`}
                    event={event}
                    events={events}
                    setEvents={setEvents}
                  />
                )}
              />
            ))}

            {events.map((event, i) => (
              <Route
                key={i}
                exact
                path={`/events/${event._id}/edit-event`}
                render={() => (
                  <EditEvent title={"Edit Event | CampusTalk"} event={event} />
                )}
              />
            ))}

            {/* create event */}
            <Route
              exact
              path="/create-event"
              render={() => <CreateEvent title={"Create Event | CampusTalk"} />}
            />

            {/* notifications */}
            <Route
              exact
              path="/notifications"
              render={() => (
                <Notifications
                  title={"Notifications | CampusTalk"}
                  isMobile={true}
                  showNotifications={showNotifications}
                  setShowNotifications={setShowNotifications}
                  notifications={notifications}
                  setNotifications={setNotifications}
                  setNotificationCount={setNotificationCount}
                  classes="z-20 bg-white dark:bg-[#3e3d3d] flex flex-col"
                />
              )}
            />

            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
