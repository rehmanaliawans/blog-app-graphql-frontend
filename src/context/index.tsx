import { createContext, ReactNode, useContext, useState } from 'react';

const AppContext = createContext({
  userId: "",
  setUserId: (userId: string) => {},
  userName: "",
  setUserName: (userName: string) => {}
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  //change context values
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <AppContext.Provider value={{ userId, setUserId, userName, setUserName }}>{children}</AppContext.Provider>
  );
};

//custom hook
const useGlobalContext = () => useContext(AppContext);

export { AppProvider, useGlobalContext };
