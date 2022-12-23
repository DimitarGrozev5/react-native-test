import React from 'react';
import DoubleActionButton from '../../inputs/DoubleActionButton';

type Props = { startSessionHandler: () => void };

const InactiveSession: React.FC<Props> = ({ startSessionHandler }) => {
  return (
    <>
      <DoubleActionButton
        onPress1={startSessionHandler}
        onPress2={startSessionHandler}
        text1="Start Extension"
        text2="(With gestures)"
      />
    </>
  );
};

export default InactiveSession;
