import React from 'react';
import DoubleActionButton from '../../inputs/DoubleActionButton';

type Props = {
  startSessionHandler: () => void;
  startWithGesturesHandler: () => void;
};

const InactiveSession: React.FC<Props> = ({
  startSessionHandler,
  startWithGesturesHandler,
}) => {
  return (
    <>
      <DoubleActionButton
        onPressBoth={startWithGesturesHandler}
        onPressInner={startSessionHandler}
        text1="Start Extension"
        text2="(with auto stop)"
      />
    </>
  );
};

export default InactiveSession;
