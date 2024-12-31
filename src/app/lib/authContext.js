'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { auth } from './firebaseConfig'; // Adjust the path to your Firebase config
import { onAuthStateChanged } from 'firebase/auth';

// Create AuthContext
const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Set the authenticated user (null if logged out)
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
};

// Custom Hook to Use Auth Context
export const useAuth = () => useContext(AuthContext);
