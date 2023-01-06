import { useEffect, useState } from 'react';
import { useDevicePosition } from '../session-views/useDevicePosition';

export const useAutoStart = (
  startSessionHandler: () => void,
  stopSessionHandler: () => void
): [boolean, boolean, () => void] => {
  // Get the device orientation
  const downOrUp = useDevicePosition();

  // Helper values, for controlling auto start and stop
  const [requestedAutoStart, setRequestedAutoStart] = useState(false);
  const [startedAutoStart, setStartedAutoStart] = useState(false);

  // Start listening for auto start
  const startWithGesturesHandler = () => {
    setRequestedAutoStart(true);
  };

  // Auto start and stop, based on device orientation
  useEffect(() => {
    if (requestedAutoStart) {
      if (downOrUp === 'down' && !startedAutoStart) {
        startSessionHandler();
        setStartedAutoStart(true);
      }
      if (downOrUp === 'up' && startedAutoStart) {
        stopSessionHandler();
        setRequestedAutoStart(false);
        setStartedAutoStart(false);
      }
    }
  }, [
    downOrUp,
    requestedAutoStart,
    startSessionHandler,
    startedAutoStart,
    stopSessionHandler,
  ]);

  return [requestedAutoStart, startedAutoStart, startWithGesturesHandler];
};
