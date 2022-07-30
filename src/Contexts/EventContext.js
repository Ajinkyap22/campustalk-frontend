import { UserContext } from "./UserContext";
import { GuestContext } from "./GuestContext";
import { demoEvent } from "../Config/guestConfig";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";

export const EventContext = React.createContext();

export function EventProvider({ children }) {
  const [events, setEvents] = useState([]);
  const [user] = useContext(UserContext);
  const [isGuest] = useContext(GuestContext);

  useEffect(() => {
    if (events.length) return;

    if (isGuest) {
      setEvents([demoEvent]);
    } else {
      let newUser;

      if (!user) {
        newUser = JSON.parse(localStorage.getItem("user"))?.user;

        if (!newUser) return;
      } else {
        newUser = user;
      }

      axios
        .get(
          `https://campustalk-api.herokuapp.com/api/events/${newUser._id}/user-events`
        )
        .then((res) => {
          setEvents(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user, isGuest]);

  return (
    <EventContext.Provider value={[events, setEvents]}>
      {children}
    </EventContext.Provider>
  );
}
