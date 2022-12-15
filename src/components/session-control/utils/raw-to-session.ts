import {
  ActiveSessionData,
  DailyAchievement,
  GoalsData,
} from '../../../model/db/db';
import { Seconds } from '../../../model/util-types';

export interface SessionStatus {
  active: boolean;
}

export interface ActiveSession extends SessionStatus {
  active: true;
  timeSoFar: Seconds;
  timeToGoal: Seconds;
}

export interface InactiveSession extends SessionStatus {
  active: false;
}

export type SessionState = ActiveSession | InactiveSession;

export const rawToSession = (
  activeSession: ActiveSessionData,
  goals: GoalsData,
  today: DailyAchievement
): SessionState => {
  if (activeSession.startedAt === null) {
    return { active: false };
  }

  // Calculate time so far
  const now = new Date().getTime();
  const timeSoFar = now - activeSession.startedAt;

  // Calculate time to goal
  const timeToGoal = goals.currentDailyGoal - timeSoFar - today.achieved;

  return {
    active: true,
    timeSoFar,
    timeToGoal,
  };
};
