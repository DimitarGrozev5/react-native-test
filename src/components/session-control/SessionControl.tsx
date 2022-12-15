import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { startSessionThunk } from '../../store/db-slice/db-middleware';
import {
  getActiveSession,
  getGoals,
  getToday,
} from '../../store/db-slice/db-selectors';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { rawToSession, SessionState } from './helpers/raw-to-session';
import ActiveSession from './session-views/ActiveSession';
import InactiveSession from './session-views/InavtiveSession';

type Props = {};

const SessionControl: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();

  const activeSession = useAppSelector(getActiveSession());
  const goals = useAppSelector(getGoals());
  const today = useAppSelector(getToday());

  const [sessionState, setSessionState] = useState<SessionState>({
    active: false,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (activeSession.startedAt !== null) {
      timer = setTimeout(() => {
        const sess = rawToSession(activeSession, goals, today);
        setSessionState(sess);
      }, 50);
    }
  }, [activeSession, goals, today]);

  if (sessionState.active) {
    const stopSessionHandler = () => {};
    return (
      <ActiveSession
        today={today}
        timeSoFar={sessionState.timeSoFar}
        timeToGoal={sessionState.timeToGoal}
        stopSessionHandler={stopSessionHandler}
      />
    );
  }

  const startSessionHandler = () => {
    dispatch(startSessionThunk());
  };

  return (
    <InactiveSession today={today} startSessionHandler={startSessionHandler} />
  );
};

export default SessionControl;
