import React from 'react';
import { useWindowDimensions } from 'react-native';
import { useOrientation } from '../../../hooks/useIsPortrait';
import { DailyAchievement } from '../../../model/db/db';
import { formatTime } from '../../../util/format-time';
import AccentText from '../../views/AccentText';
import Card from '../../views/Card';
import CenteredText from '../../views/CenteredText';

type Props = React.PropsWithChildren & {
  today: DailyAchievement;
  sessionIsActive?: boolean;
};

const TodayOverview: React.FC<Props> = ({
  children,
  today,
  sessionIsActive = false,
}) => {
  const spent = today.achieved;
  const goal = today.goal;

  const isLandscape = useOrientation() === 'landscape';
  const { height } = useWindowDimensions();

  return (
    <Card
      header="What's happening today"
      expand={!sessionIsActive}
      style={isLandscape ? { width: '50%', height: height - 100 } : {}}
    >
      <CenteredText>
        You have spent <AccentText>{formatTime(spent)}s</AccentText> in
        extension
      </CenteredText>
      <CenteredText>
        Your goal for today is <AccentText>{formatTime(goal)}s</AccentText>
      </CenteredText>
      {children}
    </Card>
  );
};

export default TodayOverview;
