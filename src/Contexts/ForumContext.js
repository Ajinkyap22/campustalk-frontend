import { UserContext } from "./UserContext";
import { GuestContext } from "./GuestContext";
import React, { useState, useEffect, useContext } from "react";
import { demoForum } from "../Config/guestConfig";
import axios from "axios";

export const ForumContext = React.createContext();

export function ForumProvider({ children }) {
  const [forums, setForums] = useState([]);
  const [user] = useContext(UserContext);
  const [isGuest] = useContext(GuestContext);

  useEffect(() => {
    if (isGuest) {
      setForums([demoForum]);
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}/api/forums/`)
        .then((res) => {
          setForums(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user, isGuest]);

  return (
    <ForumContext.Provider value={[forums, setForums]}>
      {children}
    </ForumContext.Provider>
  );
}
