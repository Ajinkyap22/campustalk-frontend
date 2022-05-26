import { TabContext } from "../../Contexts/TabContext";
import { useEffect, useContext } from "react";
import Nav from "../Navbar/Nav";
import EventForm from "./EventForm";

function EditEvent({ event, title }) {
  const [activeTab, setActiveTab] = useContext(TabContext);

  useEffect(() => {
    setActiveTab("events");
  }, [activeTab]);

  useEffect(() => {
    document.title = title || `Edit Event | CampusTalk`;
  }, [title]);

  return (
    <main className="w-full bg-bubble h-full flex flex-col items-center overflow-auto pb-10">
      <Nav />

      <section className="bg-white dark:bg-darkSecondary rounded shadow-base w-[90%] md:w-2/3 xl:w-1/2 2xl:w-1/3 mt-6 inline-block 2xl:my-8">
        <h1 className="text-center font-bold mb-1 lg:mb-2 mt-5 lg:mt-8 text-primary dark:text-primary-light text-lg md:text-xl xl:text-2xl 2xl:text-3xl">
          Edit Event
        </h1>

        {/* form */}
        <EventForm event={event} />
      </section>
    </main>
  );
}

export default EditEvent;
