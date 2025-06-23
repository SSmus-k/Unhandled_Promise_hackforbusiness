import { createContext, useContext, useState } from 'react';

const CsvContext = createContext();

export function CsvProvider({ children }) {
  const [csvData, setCsvData] = useState([]);
  return (
    <CsvContext.Provider value={{ csvData, setCsvData }}>
      {children}
    </CsvContext.Provider>
  );
}

export const useCsvData = () => useContext(CsvContext);
