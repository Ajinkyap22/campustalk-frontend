import { Link } from "react-router-dom";

function EventsList({ eventName, eventId }) {
  return (
    <Link
      to={`/events/${eventId}`}
      className="block lg:p-2.5 xl:p-3 lg:text-xs xl:text-sm 2xl:text-xl border-b dark:border-secondary underline underline-offset-1 text-slate-800 dark:text-[#d1d5db] hover:bg-gray-100 dark:hover:bg-slate-800"
    >
      {eventName}
    </Link>
  );
}

export default EventsList;
