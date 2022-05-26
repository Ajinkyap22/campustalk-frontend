import React, { useState } from "react";

export const NotificationContext = React.createContext();

export function NotificationProvider({ children }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);

  return (
    <NotificationContext.Provider
      value={[
        notifications,
        setNotifications,
        showNotifications,
        setShowNotifications,
        notificationCount,
        setNotificationCount,
      ]}
    >
      {children}
    </NotificationContext.Provider>
  );
}
