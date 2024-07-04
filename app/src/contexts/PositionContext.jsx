import { createContext, useState } from "react";

const PositionContext = createContext({});

export const PositionProvider = ({ children }) => {
  const [userPos, setUserPos] = useState({});
  return (
    <PositionContext.Provider value={{ userPos, setUserPos }}>
      {children}
    </PositionContext.Provider>
  );
};

export default PositionContext;
