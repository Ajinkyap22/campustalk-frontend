import { UserContext } from "./UserContext";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

export const EventContext = React.createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [user] = useContext(UserContext);

  useEffect(() => {
    if (events.length) return;

    let newUser;

    if (!user) {
      newUser = JSON.parse(localStorage.getItem("user"))?.user;

      if (!newUser) return;
    } else {
      newUser = user;
    }

    axios
      .get(`/api/events/${newUser._id}/user-events`)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user]);

  return (
    <EventContext.Provider value={[events, setEvents]}>
      {children}
    </EventContext.Provider>
  );
}
