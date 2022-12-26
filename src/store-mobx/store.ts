import { autorun } from 'mobx';
import { emptyDB } from '../model/db/db';
import {
  createDBAchievedStore,
  createDBActiveSessionStore,
  createDBGoalsStore,
  DBStore,
} from './db/dbStore';

export interface StoreProps {
  db: DBStore;
}

export function createStore(): StoreProps {
  const activeSession = createDBActiveSessionStore(emptyDB().activeSession);
  const goals = createDBGoalsStore(emptyDB().goals);
  const achieved = createDBAchievedStore(emptyDB().achieved);

  const dbStore: DBStore = {
    dbVersion: 'v1',
    activeSession,
    goals,
    achieved,
  };
  autorun(() => {
    console.log(dbStore);
  });

  return {
    db: dbStore,
  };
}

export type TStore = ReturnType<typeof createStore>;
