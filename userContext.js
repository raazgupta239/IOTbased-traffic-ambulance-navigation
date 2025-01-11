import React, { createContext, useContext, useState } from 'react';

// Create a Context for User data
const UserContext = createContext();

// Custom hook to access user data
export const useUser = () => useContext(UserContext);

// UserProvider component that will wrap the app and provide user data
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Track user data

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
