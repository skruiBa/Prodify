'use client';

import { createContext, useContext, useState } from 'react';

// Create Context
const DateContext = createContext();

// Context Provider
export function DateProvider({ children }) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Function to update the current date
  const updateCurrentDate = (newDate) => {
    setCurrentDate(newDate);
  };

  return <DateContext.Provider value={{ currentDate, updateCurrentDate }}>{children}</DateContext.Provider>;
}

// Hook to use the Date Context
export function useDate() {
  return useContext(DateContext);
}
