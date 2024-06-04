import React, { createContext, useState, useContext } from 'react';

// Create Context object.
const AuthContext = createContext();

// Create a provider for components to consume and subscribe to changes
export const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");

  const [userdata , setUserData] = useState({
    email : "",
    islogin : false
  })

  const [changeId ,setChangeId] = useState("");

  return (
    <AuthContext.Provider value={{userdata,setUserData ,isLoggedIn, setIsLoggedIn , email , setEmail, changeId,setChangeId}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
