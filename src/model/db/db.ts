import { DateArray, Seconds, UTCTimestamp } from '../util-types';

/**
 * Main DB type for storing data in the local storage
 */
export type DB = {
  activeSession: ActiveSessionData;
  goals: GoalsData;
  achieved: AchievedData;
};
export const emptyDB = (): DB => {
  const t = new Date();
  return {
    activeSession: { startedAt: null },
    goals: { currentDailyGoal: 0 },
    achieved: {
      today: {
        date: [t.getDate(), t.getMonth(), t.getFullYear()],
        achieved: 0,
        goal: 0,
      },
      overall: [],
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
