import React, { useState, createContext } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState();
  return <AuthContext.Provider value={[token, setToken]}>{props.children}</AuthContext.Provider>;
};
