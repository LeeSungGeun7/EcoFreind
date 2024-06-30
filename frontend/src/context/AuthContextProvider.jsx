import React, { createContext, useState, useContext, useEffect } from 'react';

import usePersistState from '../hooks/usePersistState';


// Create Context object.
const AuthContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [email, setEmail] = useState("");

  

  const [userdata , setUserData] = usePersistState('userData',{
    email : "",
    userId : 0,
    name : "",
    islogin : false,
    avatar : ""
  })
 


  const [changeId ,setChangeId] = useState("");

  return (
    <AuthContext.Provider value={{userdata,setUserData ,isLoggedIn, setIsLoggedIn , email , setEmail, changeId,setChangeId}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
