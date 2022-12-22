import { createContext, ReactNode, useContext, useState } from "react";

const AppContext = createContext({
  userId: "",
  setUserId: (userId: string) => {}
});

const AppProvider = ({ children }: { children: ReactNode }) => {
  //change context values
  const [userId, setUserId] = useState("");

  return (
    <AppContext.Provider value={{ userId, setUserId }}>
      {children}
    </AppContext.Provider>
  );
};

//custom hook
const useGlobalContext = () => useContext(AppContext);

export { AppProvider, useGlobalContext };
