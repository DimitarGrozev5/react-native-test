import React, { useState } from 'react';

import { StyleSheet, Text, View } from 'react-native';
import {
  getActiveSession,
  getGoals,
  getToday,
} from '../../store/db-slice/db-selectors';
import { useAppSelector } from '../../store/hooks';
import InactiveSession from './session-views/InavtiveSession';
import { SessionState } from './utils/raw-to-session';

type Props = {};

const SessionControl: React.FC<Props> = ({}) => {
  const activeSession = useAppSelector(getActiveSession());
  const goals = useAppSelector(getGoals());
  const today = useAppSelector(getToday());

  const [sessionState, setSessionState] = useState<SessionState>({
    active: false,
  });

  if (sessionState.active) {
    return <Text>Test</Text>;
  }

  return <InactiveSession />;
};

export default SessionControl;
