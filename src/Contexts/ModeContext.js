import React, { useState, useEffect } from "react";

export const ModeContext = React.createContext();

export function ModeProvider({ children }) {
  const [mode, setMode] = useState("");

  useEffect(() => {
    const localMode = localStorage.getItem("mode");
    if (localMode) {
      setMode(localMode);
    } else {
      setMode("light");
    }
  }, []);

  return (
    <ModeContext.Provider value={[mode, setMode]}>
      {children}
    </ModeContext.Provider>
  );
}
