import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

export const getActiveSession = () => (state: RootState) =>
  state.db.activeSession;

export const getGoals = () => (state: RootState) => state.db.goals;

export const getToday = () => (state: RootState) => state.db.achieved.today;

const getDays = (state: RootState) => state.db.achieved.overall;
export const getLastDays = createSelector([getDays], (days) =>
  [...days].sort((a, b) => {
    const aUTC = new Date(a.date[2], a.date[1], a.date[0]).getTime();
    const bUTC = new Date(b.date[2], b.date[1], b.date[0]).getTime();

    return aUTC - bUTC;
  })
);
