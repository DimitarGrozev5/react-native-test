import React from 'react';
import { DailyAchievement } from '../../../model/db/db';
import { formatTime } from '../../../util/format-time';
import AccentText from '../../views/AccentText';
import Card from '../../views/Card';
import CenteredText from '../../views/CenteredText';

type Props = React.PropsWithChildren & {
  today: DailyAchievement;
};

const TodayOverview: React.FC<Props> = ({ children, today }) => {
  const spent = today.achieved;
  const goal = today.goal;

  return (
    <Card header="What's happening today">
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
