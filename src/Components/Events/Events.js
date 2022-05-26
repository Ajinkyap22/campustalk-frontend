import { TabContext } from "../../Contexts/TabContext";
import { EventContext } from "../../Contexts/EventContext";
import { useEffect, useContext } from "react";
import Nav from "../Navbar/Nav";
import LogoCropped from "../LogoCropped";
import Row from "./Row";

function Events({ title }) {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [events] = useContext(EventContext);

  useEffect(() => {
    document.title = title || `Events | CampusTalk`;
  }, [title]);

  useEffect(() => {
    setActiveTab("events");
  }, [activeTab]);

  return (
    <main className="w-full min-h-full overflow-visible bg-[#F0F2F5] dark:bg-dark">
      <Nav />

      <div>
        {!events || events?.length === 0 ? (
          <div className="text-center py-4 mt-8">
            <LogoCropped color="rgba(98, 98, 98, 0.9)" width="100" />
            <p className="text-center my-3 text-gray-700 dark:text-gray-300">
              There are no upcoming events in any of your forums right now.
            </p>
          </div>
        ) : (
          <table
            className="table-fixed w-[90%] lg:w-[80%] m-auto bg-white dark:bg-darkSecondary shadow-base mt-8"
            hidden={events.length === 0}
          >
            <thead>
              <tr>
                <th className="text-primary dark:text-primary-dark font-normal text-xs lg:text-sm 2xl:text-2xl rowFirst">
                  Event Name
                </th>
                <th className="text-primary dark:text-primary-dark font-normal text-xs lg:text-sm 2xl:text-2xl row">
                  Forum
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, i) => (
                <Row event={event} key={i} />
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}

export default Events;
