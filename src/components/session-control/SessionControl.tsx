/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useEffect, useState } from 'react';

import {
  startSessionThunk,
  stopSessionThunk,
} from '../../store/db-slice/db-thunks';
import {
  getActiveSession,
  getGoals,
  getToday,
} from '../../store/db-slice/db-selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { rawToSession, SessionState } from './helpers/raw-to-session';
import ActiveSession from './session-views/ActiveSession';
import InactiveSession from './session-views/InavtiveSession';
import TodayOverview from './session-views/TodayOverview';

type Props = {};

const SessionControl: React.FC<Props> = () => {
  const dispatch = useAppDispatch();

  const activeSession = useAppSelector(getActiveSession());
  const goals = useAppSelector(getGoals());
  const today = useAppSelector(getToday());

  const [sessionState, setSessionState] = useState<SessionState>({
    active: false,
  });

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

  if (sessionState.active) {
    const stopSessionHandler = () => {
      dispatch(stopSessionThunk());
    };
    return (
      <TodayOverview today={today}>
        <ActiveSession
          timeSoFar={sessionState.timeSoFar}
          timeToGoal={sessionState.timeToGoal}
          stopSessionHandler={stopSessionHandler}
        />
      </TodayOverview>
    );
  }

  const startSessionHandler = () => {
    dispatch(startSessionThunk());
  };

  return (
    <TodayOverview today={today}>
      <InactiveSession startSessionHandler={startSessionHandler} />
    </TodayOverview>
  );
};

export default SessionControl;
