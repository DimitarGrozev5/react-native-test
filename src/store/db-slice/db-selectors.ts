import { RootState } from '../store';

export const getActiveSession = () => (state: RootState) =>
  state.db.activeSession;

export const getGoals = () => (state: RootState) => state.db.goals;

export const getToday = () => (state: RootState) => state.db.achieved.today;
