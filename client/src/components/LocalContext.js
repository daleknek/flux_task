import React from "react";

export const LocalContext = React.createContext({});

export const useColumnsData = () => {
  const context = React.useContext(LocalContext);
  if (!context) {
    throw new Error(
      `useColumnsData must be used within a LocalContextProvider`
    );
  }
  return context;
};

export const LocalContextProvider = (props) => {
  const [columnsData, setColumnsData] = React.useState([]);
  const value = React.useMemo(
    () => [columnsData, setColumnsData],
    [columnsData]
  );
  return <LocalContext.Provider value={value} {...props} />;
};
