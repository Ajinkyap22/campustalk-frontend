import React, { useState } from "react";
import { useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export const PostContext = React.createContext();

export function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);
  const [user] = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      axios
        .get(`/api/forums/userPosts/${user._id}`)
        .then((res) => {
          setPosts(
            res.data.sort((a, b) => -a.timestamp.localeCompare(b.timestamp))
          );
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  return (
    <PostContext.Provider value={[posts, setPosts, loading]}>
      {children}
    </PostContext.Provider>
  );
}
