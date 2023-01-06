import { useEffect, useState } from 'react';
import { DailyAchievement } from '../../../model/db/db';
import { ActiveSessionProps, GoalsProps } from '../../../store-mobx/db/dbStore';
import { rawToSession, SessionState } from '../helpers/raw-to-session';

export const useSessionTimer = (
  activeSession: ActiveSessionProps,
  goals: GoalsProps,
  today: DailyAchievement
) => {
  const [sessionState, setSessionState] = useState<SessionState>({
    active: false,
  });

  // Setup timer
  useEffect(() => {
    let timer: number;
    if (activeSession.startedAt !== null) {
      timer = requestAnimationFrame(() => {
        const sess = rawToSession(activeSession, goals, today);
        setSessionState(sess);
      });
    } else if (sessionState.active) {
      setSessionState({ active: false });
    }
    return () => {
      cancelAnimationFrame(timer);
    };
  }, [activeSession, activeSession.startedAt, goals, today, sessionState]);

  return sessionState;
};
