import React from 'react';
import StyledButton from '../../inputs/Button';

type Props = { startSessionHandler: () => void };

const InactiveSession: React.FC<Props> = ({ startSessionHandler }) => {
  return (
    <StyledButton onPress={startSessionHandler}>Start Extension</StyledButton>
  );
};

export default InactiveSession;
