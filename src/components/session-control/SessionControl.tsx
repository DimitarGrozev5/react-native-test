/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useCallback } from 'react';

import ActiveSession from './session-views/ActiveSession';
import InactiveSession from './session-views/InavtiveSession';
import TodayOverview from './session-views/TodayOverview';
import { useDBStore } from '../../store-mobx/db/useDBStore';
import { observer } from 'mobx-react-lite';
import { Seconds } from '../../model/util-types';
import CenteredText from '../views/CenteredText';
import AccentText from '../views/AccentText';
import { useSessionTimer } from './hooks/useSessionTimer';
import { useAutoStart } from './hooks/useAutoStart';

const SessionControl = observer(() => {
  // Get values from store
  const activeSession = useDBStore('activeSession');
  const goals = useDBStore('goals');
  const today = useDBStore('achieved').today;

  // Get state for the component
  const sessionState = useSessionTimer(activeSession, goals, today);

  /// Handler functions
  // Stop the active session
  const stopSessionHandler = useCallback(() => {
    const now = new Date().getTime() / 1000;
    const startTime = activeSession.startedAt || now;
    const totalSessionTime = now - startTime;

    activeSession.setStartedAt(null);
    today.addToAchieved(totalSessionTime);
  }, [activeSession, today]);

  // Update the session duration with a user provided value
  const wrongTimeHandler = useCallback(
    (time: Seconds) => {
      activeSession.setStartedAt(null);
      today.addToAchieved(time);
    },
    [activeSession, today]
  );

  // Start the session
  const startSessionHandler = useCallback(() => {
    const now = new Date().getTime() / 1000;
    activeSession.setStartedAt(now);
  }, [activeSession]);

  // Auto start handling
  const [requestedAutoStart, startedAutoStart, startWithGesturesHandler] =
    useAutoStart(startSessionHandler, stopSessionHandler);

  if (sessionState.active) {
    return (
      <TodayOverview today={today} sessionIsActive>
        <ActiveSession
          timeSoFar={sessionState.timeSoFar}
          timeToGoal={sessionState.timeToGoal}
          stopSessionHandler={stopSessionHandler}
          wrongTimeHandler={wrongTimeHandler}
        />

        {requestedAutoStart && startedAutoStart && (
          <CenteredText>
            <AccentText>Pick up the phone to stop the timer</AccentText>
          </CenteredText>
        )}
      </TodayOverview>
    );
  }

  return (
    <TodayOverview today={today}>
      <InactiveSession
        startSessionHandler={startSessionHandler}
        startWithGesturesHandler={startWithGesturesHandler}
      />

      {requestedAutoStart && !startedAutoStart && (
        <CenteredText>
          <AccentText>Put the phone down to start the timer</AccentText>
        </CenteredText>
      )}
    </TodayOverview>
  );
});

export default SessionControl;
