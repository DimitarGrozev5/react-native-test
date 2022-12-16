import { DateArray, Seconds, UTCTimestamp } from '../util-types';

/**
 * Main DB type for storing data in the local storage
 */
export type DB = {
  dbVersion: 'v1';
  activeSession: ActiveSessionData;
  goals: GoalsData;
  achieved: AchievedData;
};
export const emptyDB = (): DB => {
  const t = new Date();
  return {
    dbVersion: 'v1',
    activeSession: { startedAt: null },
    goals: { currentDailyGoal: 0 },
    achieved: {
      today: {
        date: [t.getDate(), t.getMonth(), t.getFullYear()],
        achieved: 0,
        goal: 0,
      },
      overall: [
        {
          date: [2, 1, 2022],
          achieved: 60,
          goal: 60,
        },
        {
          date: [1, 1, 2022],
          achieved: 60,
          goal: 75,
        },
        {
          date: [3, 1, 2022],
          achieved: 100,
          goal: 90,
        },
        {
          date: [6, 1, 2022],
          achieved: 105,
          goal: 105,
        },
        {
          date: [5, 1, 2022],
          achieved: 95,
          goal: 120,
        },
        {
          date: [4, 1, 2022],
          achieved: 280,
          goal: 240,
        },
        {
          date: [7, 1, 2022],
          achieved: 280,
          goal: 240,
        },
        {
          date: [8, 1, 2022],
          achieved: 255,
          goal: 255,
        },
      ],
    },
  };
};

/**
 * Data for the active spine extension data
 */
export type ActiveSessionData = {
  startedAt: UTCTimestamp | null;
};

/**
 * Data for the goals
 */
export type GoalsData = {
  currentDailyGoal: Seconds;
};

/**
 * Data for the achieved results
 */
export type AchievedData = {
  today: DailyAchievement;
  overall: DailyAchievement[];
};

export type DailyAchievement = {
  date: DateArray;
  achieved: Seconds;
  goal: Seconds;
};
