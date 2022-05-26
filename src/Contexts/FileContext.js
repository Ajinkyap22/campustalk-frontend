import React, { useState } from "react";

export const FileContext = React.createContext();

export function FileProvider({ children }) {
  const [files, setFiles] = useState([]);

  return (
    <FileContext.Provider value={[files, setFiles]}>
      {children}
    </FileContext.Provider>
  );
}
