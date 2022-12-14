import { useEffect, useState } from 'react';
import { DB } from '../model/db/db';
import { Readable, StorageReader } from '../model/db/db-communication';

export const useGetDB: StorageReader<Readable> = (readable, storageKey) => {
  const [db, setDB] = useState<DB | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const jsonDB = await readable.getItem(storageKey);
        if (!jsonDB) {
          return;
        }

        const parsedDB: DB = JSON.parse(jsonDB);

        setDB(parsedDB);
      } catch (error) {
        setDB(null);
      }
    })();
  }, []);

  return db;
};
