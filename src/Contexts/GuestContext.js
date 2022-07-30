import React, { useState } from "react";

export const GuestContext = React.createContext();

export function GuestProvider({ children }) {
  const [isGuest, setIsGuest] = useState(false);
  const [tourSeen, setTourSeen] = useState(false);

  return (
    <GuestContext.Provider value={[isGuest, setIsGuest, tourSeen, setTourSeen]}>
      {children}
    </GuestContext.Provider>
  );
}
