import AsyncStorage from '@react-native-async-storage/async-storage';
import { autorun } from 'mobx';
import { useLocalObservable } from 'mobx-react-lite';

import type { PropsWithChildren } from 'react';
import { createContext } from 'react';
import { DB } from '../model/db/db';
import { dbStoreToData } from './db/store-to-db';
import { TStore } from './store';
import { createStore } from './store';

export const storeContext = createContext<TStore | null>(null);

export function StoreProvider({ children }: PropsWithChildren): JSX.Element {
  const store = useLocalObservable(createStore);

  // Get data from local storage
  (async () => {
    const jsonValue = await AsyncStorage.getItem('db-data');
    if (jsonValue) {
      const db = JSON.parse(jsonValue) as DB;

      store.db.activeSession.setStartedAt(db.activeSession.startedAt);
      store.db.goals.setCurrentDailyGoal(db.goals.currentDailyGoal);
      store.db.achieved.today.setAchieved(db.achieved.today.achieved);
      store.db.achieved.today.setDate(db.achieved.today.date);
      store.db.achieved.today.setGoal(db.achieved.today.goal);
      store.db.achieved.setOverall(db.achieved.overall);
    }
  })();

  // Save store to local storage after every change
  autorun(async () => {
    try {
      const db = dbStoreToData(store.db);

      const jsonDB = JSON.stringify(db);

      // console.log(jsonDB);

      await AsyncStorage.setItem('db-data', jsonDB);
    } catch (err) {}
  });

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
}

export default StoreProvider;
