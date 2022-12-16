import React from 'react';
import { Seconds } from '../../../model/util-types';
import { formatTime } from '../../../util/format-time';
import StyledButton from '../../inputs/Button';
import AccentText from '../../views/AccentText';
import CenteredText from '../../views/CenteredText';

type Props = {
  timeSoFar: Seconds;
  timeToGoal: Seconds;
  stopSessionHandler: () => void;
};

const ActiveSession: React.FC<Props> = ({
  timeSoFar,
  timeToGoal,
  stopSessionHandler,
}) => {
  return (
    <>
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
    </>
  );
};

export default ActiveSession;
