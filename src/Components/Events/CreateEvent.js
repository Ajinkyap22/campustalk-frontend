import { TabContext } from "../../Contexts/TabContext";
import { useEffect, useContext, useState } from "react";
import Nav from "../Navbar/Nav";
import EventForm from "./EventForm";
import Overlay from "../Overlay";

function CreateEvent({ title }) {
  const [activeTab, setActiveTab] = useContext(TabContext);
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    setActiveTab("events");
  }, [activeTab]);

  useEffect(() => {
    document.title = title || `Create Event | CampusTalk`;
  }, [title]);

  return (
    <main className="w-full bg-bubble h-full flex flex-col items-center overflow-auto pb-10">
      <Nav />

      <section className="bg-white dark:bg-darkSecondary rounded shadow-base w-[90%] md:w-2/3 xl:w-1/2 2xl:w-1/3 mt-6 inline-block 2xl:my-8">
        <h1 className="text-center font-bold mb-1 lg:mb-2 mt-5 lg:mt-8 text-primary dark:text-primary-light text-lg md:text-xl xl:text-2xl 2xl:text-3xl">
          Create Event
        </h1>
        <h2 className="text-center mt-1 text-xs md:text-mxs lg:mt-1 text-primary dark:text-primary-light 2xl:text-xl mx-auto">
          An event can be any activity that students or faculty can participate
          in
        </h2>

        {/* form */}
        <EventForm setShowOverlay={setShowOverlay} />
      </section>

      {/* overlay */}
      <Overlay text="Creating Event..." showOverlay={showOverlay} />
    </main>
  );
}

export default CreateEvent;
