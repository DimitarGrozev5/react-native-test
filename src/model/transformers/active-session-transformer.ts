import { DB } from '../db/db';
import { Seconds } from '../util-types';

/**
 * Function that extracts data for the active session
 */
export type activeSessionTransformer = (db: DB) => Session;

export interface SessionState {
  active: boolean;
}

export interface ActiveSession extends SessionState {
  active: true;
  timeElapsed: Seconds;
  timeLeftToGoal: Seconds;
}

export interface InactiveSession extends SessionState {
  active: false;
}

export type Session = ActiveSession | InactiveSession;
