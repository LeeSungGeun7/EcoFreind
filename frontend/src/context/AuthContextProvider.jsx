import React, { createContext, useState, useContext, useEffect } from 'react';

import usePersistState from '../hooks/usePersistState';


// Create Context object.
const AuthContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const AuthContextProvider = ({ children }) => {
 
  
  const [userdata , setUserData] = usePersistState('userData',{
    email : "",
    userId : 0,
    name : "",
    islogin : false,
    avatar : ""
  })
 

  const [darkmode , setDarkMode] = usePersistState('darkmode', {
    darkmode : false
  })



  return (
    <AuthContext.Provider value={{darkmode,setDarkMode,userdata,setUserData}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
