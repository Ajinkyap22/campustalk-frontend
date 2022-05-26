import { UserContext } from "./UserContext";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

export const ForumContext = React.createContext();

export function ForumProvider({ children }) {
  const [forums, setForums] = useState([]);
  const [user] = useContext(UserContext);

  // fetch forum list
  useEffect(() => {
    axios
      .get("/api/forums/")
      .then((res) => {
        setForums(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user]);

  return (
    <ForumContext.Provider value={[forums, setForums]}>
      {children}
    </ForumContext.Provider>
  );
}
