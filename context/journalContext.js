import { createContext, useCallback, useState } from "react";

export const JournalContext = createContext();

export function JournalProvider({ children }) {
  const [entries, setEntries] = useState([]);

  const createEntry = useCallback((date, content) => {
    const newEntry = {
      id: Date.now().toString(),
      date: new Date(date),
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setEntries((prevEntries) => [newEntry, ...prevEntries]);
  }, []);
}
