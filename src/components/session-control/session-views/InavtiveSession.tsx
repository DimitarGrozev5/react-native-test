import React from 'react';
import { Text } from 'react-native';
import TodayOverview from './TodayOverview';

type Props = {};

const InactiveSession: React.FC<Props> = ({}) => {
  return (
    <TodayOverview>
      <Text>inactive view</Text>
    </TodayOverview>
  );
};

export default InactiveSession;
