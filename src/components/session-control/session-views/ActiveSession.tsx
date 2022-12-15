import React from 'react';
import { DailyAchievement } from '../../../model/db/db';
import { Seconds } from '../../../model/util-types';
import { formatTime } from '../../../util/format-time';
import StyledButton from '../../inputs/Button';
import AccentText from '../../views/AccentText';
import CenteredText from '../../views/CenteredText';
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
      <CenteredText>
        <AccentText>{formatTime(timeSoFar)}s</AccentText> in extension
      </CenteredText>

      {timeToGoal <= 0 ? (
        <CenteredText>Daily Goal Achieved!</CenteredText>
      ) : (
        <CenteredText>
          <AccentText>{formatTime(timeToGoal)}s</AccentText> to daily goal
        </CenteredText>
      )}
    </TodayOverview>
  );
};

export default ActiveSession;
