import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("AuthContext useEffect called"); // デバッグログ追加
    console.log("auth object:", auth); // デバッグログ追加
    const unsubscribe = auth.onAuthStateChanged((user) => {
      console.log("onAuthStateChanged called with user:", user);
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
};
