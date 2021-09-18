import React, { useEffect, useState } from "react";
import { fakeNgo } from "../utils/demodata";

const NgoContext = React.createContext(null);

export default function NgoContextProvider({ children }) {
  const [ngoDetails, setNgoDetails] = useState(fakeNgo);
  return (
    <NgoContext.Provider
      value={{
        ngoDetails,
        setNgoDetails,
      }}
    >
      {children}
    </NgoContext.Provider>
  );
}

export { NgoContext };
