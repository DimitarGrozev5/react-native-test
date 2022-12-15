import React from 'react';
import { Text } from 'react-native';
import { DailyAchievement } from '../../../model/db/db';
import { Seconds } from '../../../model/util-types';
import StyledButton from '../../inputs/Button';
import TodayOverview from './TodayOverview';

type Props = {
  today: DailyAchievement;
  timeSoFar: Seconds;
  timeToGoal: Seconds;
  stopSessionHandler: () => void;
};

const ActiveSession: React.FC<Props> = ({
  today,
  timeSoFar,
  timeToGoal,
  stopSessionHandler,
}) => {
  return (
    <TodayOverview today={today}>
      <StyledButton onPress={stopSessionHandler}>Stop Extension</StyledButton>
    </TodayOverview>
  );
};

export default ActiveSession;
