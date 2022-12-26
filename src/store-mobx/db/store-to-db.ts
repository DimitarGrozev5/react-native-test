import { DB } from '../../model/db/db';
import { DBStore } from './dbStore';

export const dbStoreToData = (dbStore: DBStore): DB => {
  const db: DB = {
    dbVersion: 'v1',
    lastChange: new Date().getTime() / 1000,
    activeSession: { startedAt: dbStore.activeSession.startedAt },
    goals: { currentDailyGoal: dbStore.goals.currentDailyGoal },
    achieved: {
      today: {
        date: dbStore.achieved.today.date,
        achieved: dbStore.achieved.today.achieved,
        goal: dbStore.achieved.today.goal,
      },
      overall: dbStore.achieved.overall,
    },
  };

  return db;
};
