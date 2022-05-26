import React, { useState } from "react";

export const TabContext = React.createContext();

export function TabProvider({ children }) {
  const [activeTab, setActiveTab] = useState("feed");

  return (
    <TabContext.Provider value={[activeTab, setActiveTab]}>
      {children}
    </TabContext.Provider>
  );
}
