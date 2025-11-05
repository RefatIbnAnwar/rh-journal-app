import { createContext, useCallback, useState } from "react";

export const JournalContext = createContext();

export function JournalProvider({ children }) {
  const [entries, setEntries] = useState([]);

  // Create a new entry
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

  // Update an existing entry
  const editEntry = useCallback((id, content) => {
    setEntries((prevEntries) =>
      prevEntries.map((entry) =>
        entry.id === id ? { ...entry, content, updatedAt: new Date() } : entry
      )
    );
  }, []);

  // Delete an entry
  const removeEntry = useCallback((id) => {
    setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
  }, []);

  // Get entry by ID
  const getEntryById = useCallback(
    (id) => {
      return entries.find((entry) => entry.id === id);
    },
    [entries]
  );

  // Get entry by date
  const getEntryByDate = useCallback(
    (date) => {
      const dateStart = new Date(date);
      dateStart.setHours(0, 0, 0, 0);
      const dateEnd = new Date(date);
      dateEnd.setHours(23, 59, 59, 59);

      return entries.find(
        (entry) => entry.date >= dateStart && entry.date <= dateEnd
      );
    },
    [entries]
  );

  return (
    <JournalContext.Provider
      value={{
        entries,
        createEntry,
        editEntry,
        removeEntry,
        getEntryByDate,
        getEntryById,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
}
