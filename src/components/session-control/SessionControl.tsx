/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback, useEffect, useState } from 'react';

import { rawToSession, SessionState } from './helpers/raw-to-session';
import ActiveSession from './session-views/ActiveSession';
import InactiveSession from './session-views/InavtiveSession';
import TodayOverview from './session-views/TodayOverview';
import { useDBStore } from '../../store-mobx/db/useDBStore';
import { observer } from 'mobx-react-lite';
import { Seconds } from '../../model/util-types';

const SessionControl = observer(() => {
  const activeSession = useDBStore('activeSession');
  const goals = useDBStore('goals');
  const today = useDBStore('achieved').today;

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

  const stopSessionHandler = useCallback(() => {
    const now = new Date().getTime() / 1000;
    const startTime = activeSession.startedAt || now;
    const totalSessionTime = now - startTime;

    activeSession.setStartedAt(null);
    today.addToAchieved(totalSessionTime);
  }, [activeSession, today]);

  const wrongTimeHandler = useCallback(
    (time: Seconds) => {
      activeSession.setStartedAt(null);
      today.addToAchieved(time);
    },
    [activeSession, today]
  );
  if (sessionState.active) {
    return (
      <TodayOverview today={today}>
        <ActiveSession
          timeSoFar={sessionState.timeSoFar}
          timeToGoal={sessionState.timeToGoal}
          stopSessionHandler={stopSessionHandler}
          wrongTimeHandler={wrongTimeHandler}
        />
      </TodayOverview>
    );
  }

  const startSessionHandler = () => {
    const now = new Date().getTime() / 1000;
    activeSession.setStartedAt(now);
  };

  return (
    <TodayOverview today={today}>
      <InactiveSession startSessionHandler={startSessionHandler} />
    </TodayOverview>
  );
});

export default SessionControl;
