import React from 'react';
import { Text } from 'react-native';
import { DailyAchievement } from '../../../model/db/db';
import StyledButton from '../../inputs/Button';
import TodayOverview from './TodayOverview';

type Props = { today: DailyAchievement; startSessionHandler: () => void };

const InactiveSession: React.FC<Props> = ({ today, startSessionHandler }) => {
  return (
    <TodayOverview today={today}>
      <StyledButton onPress={startSessionHandler}>Start Extension</StyledButton>
    </TodayOverview>
  );
};

export default InactiveSession;
