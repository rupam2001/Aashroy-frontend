import React, { useEffect, useState } from "react";
import { getNGODataAsync } from "../api/ngoDetailsEdit.api";
import { fakeNgo } from "../utils/demodata";
import { getAccessTokenNGO } from "../utils/storage";

const NgoContext = React.createContext(null);

export default function NgoContextProvider({ children }) {
  const [ngoDetails, setNgoDetails] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  useEffect(() => {
    if (getAccessTokenNGO() == undefined) return;
    setIsLoggedIn(getAccessTokenNGO() != undefined);
    fetchNgoDataAsync();
  }, []);

  const fetchNgoDataAsync = async () => {
    const { ngo } = await getNGODataAsync();
    if (!ngo) {
      return;
    }
    setNgoDetails(ngo);
  };

  return (
    <NgoContext.Provider
      value={{
        ngoDetails,
        setNgoDetails,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </NgoContext.Provider>
  );
}

export { NgoContext };
