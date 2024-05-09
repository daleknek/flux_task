import React, { createContext, useContext, useState, useMemo } from "react";

export const LocalContext = createContext({});

export const useColumnsData = () => {
  const context = useContext(LocalContext);
  if (!context) {
    throw new Error(
      `useColumnsData must be used within a LocalContextProvider`
    );
  }
  return context;
};

export const LocalContextProvider = (props) => {
  const [columnsData, setColumnsData] = useState([]);
  const value = useMemo(() => [columnsData, setColumnsData], [columnsData]);
  return <LocalContext.Provider value={value} {...props} />;
};
