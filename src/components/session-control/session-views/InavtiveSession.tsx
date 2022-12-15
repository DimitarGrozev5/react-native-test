import React from 'react';
import { Text } from 'react-native';
import { DailyAchievement } from '../../../model/db/db';
import TodayOverview from './TodayOverview';

type Props = { today: DailyAchievement };

const InactiveSession: React.FC<Props> = ({ today }) => {
  return (
    <TodayOverview today={today}>
      <Text>inactive view</Text>
    </TodayOverview>
  );
};

export default InactiveSession;
