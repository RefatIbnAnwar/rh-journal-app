import Realm from "realm";

const JournalEntrySchema = {
  name: "JournalEntry",
  properties: {
    id: "objectId",
    date: "date",
    content: "string",
    createdAt: "date",
    updatedAt: "date",
  },
  primaryKey: "id",
};

let realm;

export async function initializeRealm() {
  try {
    realm = await Realm.open({
      schema: [JournalEntrySchema],
    });
  } catch (error) {
    console.error("Failed to open realm:", error);
  }
}

export async function addEntry(date, content) {
  if (!realm) return;
  realm.write(() => {
    realm.create("JournalEntry", {
      id: new Realm.BSON.ObjectID(),
      data: new Date(date),
      content,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });
}

export async function updateEntry(id, content) {
  if (!realm) return;
  const entry = realm.objectForPrimaryKey("JournalEntry", id);
  if (entry) {
    realm.write(() => {
      entry.content = content;
      entry.updatedAt = new Date();
    });
  }
}

export async function getEntries() {
  if (!realm) return [];
  const allEntries = realm.objects("JournalEntry");
  return Array.from(allEntries).sort((a, b) => b.date - a.date);
}

export async function deleteEntry(id) {
  if (!realm) return;
  const entry = realm.objectForPrimaryKey("JournalEntry", id);
  if (entry) {
    realm.write(() => {
      realm.delete(entry);
    });
  }
}
