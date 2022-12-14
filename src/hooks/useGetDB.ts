import { useEffect, useState } from 'react';
import { DB, emptyDB } from '../model/db/db';
import { Readable, StorageCom, Storage } from '../model/db/db-communication';

export const useGetDB: StorageCom<Storage> = (storage, storageKey) => {
  const [db, setDB] = useState<DB | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const jsonDB = await storage.getItem(storageKey);
        if (!jsonDB) {
          throw new Error('No Item found on the provided key');
        }

        const parsedDB: DB = JSON.parse(jsonDB);

        setDB(parsedDB);
      } catch (error) {
        let atempts = 0;
        const newDBFn = async (): Promise<DB | null> => {
          const newDB = emptyDB();
          try {
            await storage.setItem(storageKey, newDB);

            return newDB;
          } catch (error) {
            atempts++;
            if (atempts < 10) {
              return await newDBFn();
            }
            return null;
          }
        };
        const newDB = await newDBFn();

        setDB(newDB);
      }
    })();
  }, []);

  return db;
};
