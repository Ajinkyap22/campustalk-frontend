import LogoCropped from "../LogoCropped";
import EventsList from "./EventsList";
import { Link } from "react-router-dom";

function EventBox({ events, fixed = true }) {
  return (
    <div className="eventsBox hidden lg:block bg-white dark:bg-darkSecondary shadow-base lg:max-w-[14rem] xl:w-[17rem] xl:max-w-[17rem] 2xl:w-[24rem] 2xl:max-w-[24rem] 3xl:w-[28rem] 3xl:max-w-[28rem] rounded">
      {/* title */}
      <div className="w-full bg-primary-light lg:px-2 xl:p-3 2xl:px-4 2xl:py-3 py-2 rounded-t">
        <LogoCropped width="40" />

        <p className="text-white lg:text-base xl:text-lg 2xl:text-2xl inline">
          {" "}
          Your Events
        </p>
      </div>

      {/* Events list */}
      <div>
        {events.length ? (
          <div>
            {events.map((event, i) => {
              return (
                <EventsList
                  key={i}
                  eventName={event.name}
                  eventId={event._id}
                />
              );
            })}
            <Link
              to={`/events`}
              className="block lg:p-2.5 xl:p-3 text-primary dark:text-[#389fff] text-center lg:text-mxs xl:text-sm 2xl:text-xl underline underline-offset-1 hover:bg-blue-100 dark:hover:bg-slate-800"
            >
              See all
            </Link>
          </div>
        ) : (
          <p className="block lg:p-2.5 xl:p-3 text-center text-sm 2xl:text-xl text-slate-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-dark">
            There are no upcoming events.
          </p>
        )}
      </div>
    </div>
  );
}

export default EventBox;
