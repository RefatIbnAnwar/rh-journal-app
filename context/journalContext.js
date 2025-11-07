import { createContext, useCallback, useState } from "react";
import {
  addEntry,
  getEntries,
  updateEntry,
  deleteEntry,
} from "../utils/realmConfig";

export const JournalContext = createContext();

export function JournalProvider({ children }) {
  const [entries, setEntries] = useState([]);

  //Load Entries
  const loadEntries = useCallback(async () => {
    try {
      const allEntries = await getEntries();
      setEntries(allEntries);
    } catch (error) {
      console.error("Error loading entries:", error);
    }
  }, []);

  // Create a new entry
  const createEntry = useCallback(
    async (date, content) => {
      try {
        await addEntry(date, content);
        await loadEntries();
      } catch (error) {
        console.error("Error creating entry:", error);
      }
    },
    [loadEntries]
  );

  // Update an existing entry
  const editEntry = useCallback(
    async (id, content) => {
      try {
        await updateEntry(id, content);
        await loadEntries();
      } catch (error) {
        console.error("Error editing entry:", error);
      }
    },
    [loadEntries]
  );

  // Delete an entry
  const removeEntry = useCallback(
    async (id) => {
      try {
        await deleteEntry(id);
        await loadEntries();
      } catch (error) {
        console.error("Error deleting entry:", error);
      }
    },
    [loadEntries]
  );

  // // Get entry by ID
  // const getEntryById = useCallback(
  //   (id) => {
  //     return entries.find((entry) => entry.id === id);
  //   },
  //   [entries]
  // );

  // // Get entry by date
  // const getEntryByDate = useCallback(
  //   (date) => {
  //     const dateStart = new Date(date);
  //     dateStart.setHours(0, 0, 0, 0);
  //     const dateEnd = new Date(date);
  //     dateEnd.setHours(23, 59, 59, 59);

  //     return entries.find(
  //       (entry) => entry.date >= dateStart && entry.date <= dateEnd
  //     );
  //   },
  //   [entries]
  // );

  return (
    <JournalContext.Provider
      value={{
        entries,
        loadEntries,
        createEntry,
        editEntry,
        removeEntry,
        // getEntryByDate,
        // getEntryById,
      }}
    >
      {children}
    </JournalContext.Provider>
  );
}
