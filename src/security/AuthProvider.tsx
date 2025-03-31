import React, { ReactNode, createContext, useEffect, useState } from "react";
import { auth } from "./firebase"; // Path to your firebase.ts file
import firebase from "./firebase";

type AuthContextType = {
  currentUser: firebase.User | null;
};

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
});

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    // Listen for Firebase authentication state changes
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Clean up the listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
