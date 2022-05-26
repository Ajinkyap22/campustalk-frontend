import { TabContext } from "../../Contexts/TabContext";
import { FileContext } from "../../Contexts/FileContext";
import { UserContext } from "../../Contexts/UserContext";
import { useEffect, useContext, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import Nav from "../Navbar/Nav";
import moment from "moment";
import EventMedia from "./EventMedia";
import axios from "axios";

function Event({ event, title, events, setEvents, history }) {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [user] = useContext(UserContext);
  const [files, setFiles] = useContext(FileContext);
  const [isModerator, setIsModerator] = useState(false);

  useEffect(() => {
    setActiveTab("events");
  }, [activeTab]);

  useEffect(() => {
    document.title = title || `${event.name} | CampusTalk`;
  }, [title]);

  useEffect(() => {
    if (!user) return;
    // check if user is moderator of event's forum
    let isMod = event.forum.moderators.indexOf(user._id) !== -1;

    setIsModerator(isMod);
  }, [user]);

  useEffect(() => {
    let newFiles = [...files];
    let file;
    if (event.document) {
      file = {
        file: event.document,
        name: `${event.name}.${event.document.split(".")[1]}`,
        type: "doc",
      };

      newFiles.push(file);
    }

    let arr;

    if (event.images) {
      arr = event.images.map((image) => {
        return {
          file: image,
          name: `${event.name}.${image.split(".")[1]}`,
          type: "image",
        };
      });

      newFiles.push(...arr);
    }

    setFiles(newFiles);
  }, []);

  function deleteEvent() {
    let headers = {
      headers: {
        Authorization: `Bearer ${
          JSON.parse(localStorage.getItem("user")).token
        }`,
      },
    };

    axios
      .delete(`/api/events/${event._id}`, headers)
      .then((res) => {
        setEvents(events.filter((e) => e._id !== event._id));

        history.push("/events");
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <main className="w-full h-full overflow-auto bg-[#F0F2F5] dark:bg-dark">
      <Nav />

      <div className="flex flex-col items-center lg:items-start lg:grid lg:grid-cols-5 2xl:grid-cols-6">
        {/* left side */}
        <div className="lg:col-span-3">
          <section className="text-center lg:text-left px-6 2xl:px-8 my-8 2xl:my-10">
            {/* name */}
            <h1 className="text-3xl 2xl:text-5xl lg:inline my-2 2xl:my-4 text-primary dark:text-primary-dark">
              {event.name}
            </h1>

            {/* edit */}
            {isModerator && (
              <Link to={`/events/${event._id}/edit-event`}>
                <button
                  className="inline-flex items-center hover:scale-110 transition-all"
                  title="Edit Event"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 2xl:w-6 mx-1 ml-3 stroke-[#818181] dark:stroke-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </button>
              </Link>
            )}

            {/* delete */}
            {isModerator && (
              <button
                className="inline-flex items-center hover:scale-110 transition-all"
                hidden={!isModerator}
                onClick={deleteEvent}
                title="Delete Event"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 2xl:w-6 mx-1 stroke-red-500 dark:stroke-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            )}

            {/* forum */}
            <Link
              to={`/forums/${event.forum._id}`}
              className="text-lg 2xl:text-xl dark:text-darkLight block mt-1 2xl:mt-2"
            >
              Organized by :{" "}
              <span className="underline underline-offset-1 hover:text-primary dark:hover:text-primary transition-all">
                {event.forum.forumName}
              </span>
            </Link>
          </section>

          {/* event info */}
          <section className="text-center lg:text-left px-6 2xl:px-8 my-8 2xl:my-10 lg:w-2/3">
            <h2 className="text-xl 2xl:text-3xl my-4 text-primary dark:text-primary-dark">
              About the event
            </h2>

            {/* description */}
            <p className="my-2 2xl:my-3 dark:text-darkLight 2xl:text-xl">
              {event.description}
            </p>

            {/* Event date */}
            {event.date && (
              <div className="mt-4">
                <h2 className="text-xl 2xl:text-3xl text-primary dark:text-primary-dark">
                  Date
                </h2>
                <p className="my-2 2xl:my-3 dark:text-darkLight 2xl:text-xl">
                  {moment(event.date).format("MMMM Do YYYY")}
                </p>
              </div>
            )}

            {/* Event time */}
            {event.time && (
              <div className="mt-4">
                <h2 className="text-xl 2xl:text-3xl text-primary dark:text-primary-dark">
                  Time
                </h2>
                <p className="my-2 2xl:my-3 dark:text-darkLight 2xl:text-xl">
                  {/* convert time to 12 hour format with am or pm */}
                  {moment(event.time, "HH:mm").format("h:mm a")}
                </p>
              </div>
            )}

            {/* Event venue */}
            {event.venue && (
              <div className="mt-4 2xl:mt-5">
                <h2 className="text-xl 2xl:text-3xl text-primary dark:text-primary-dark">
                  Venue
                </h2>
                <p className="my-2 2xl:my-3 2xl:text-xl dark:text-darkLight">
                  {event.venue}
                </p>
              </div>
            )}
          </section>

          {/* event registration link */}
          {event.link && (
            <section className="text-center lg:text-left px-6 2xl:px-8 my-8 2xl:my-10 lg:w-2/3">
              <h2 className="text-xl 2xl:text-3xl my-5 2xl:my-6 text-primary dark:text-primary-dark">
                Registration
              </h2>

              <a
                href={event.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 md:px-3 py-1.5 lg:py-2 text-xs md:text-sm lg:text-base 2xl:text-xl bg-primary text-white rounded hover:bg-blue-700 hover:scale-110 transition-all"
              >
                Register
              </a>
            </section>
          )}
        </div>

        {/* right side */}
        <EventMedia
          id={event._id}
          video={event.video}
          doc={event.document}
          images={event.images}
          name={event.name}
          setEvents={setEvents}
          isModerator={isModerator}
        />
      </div>
    </main>
  );
}

export default withRouter(Event);
