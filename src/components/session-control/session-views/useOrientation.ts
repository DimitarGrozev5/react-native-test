import { Accelerometer } from 'expo-sensors';
import { Subscription } from 'expo-sensors/build/DeviceSensor';
import { useCallback, useEffect, useState } from 'react';

export const useOrientation = (): 'down' | 'up' => {
  const [pos, setPos] = useState<'down' | 'up'>('up');
  const [{ x, y, z }, setData] = useState({
    x: 0,
    y: 0,
    z: 0,
  });

  const [subscription, setSubscription] = useState<Subscription | null>(null);

  Accelerometer.setUpdateInterval(600);

  // // const _slow = () => Accelerometer.setUpdateInterval(1000);
  // // const _fast = () => Accelerometer.setUpdateInterval(16);

  const _subscribe = () => {
    setSubscription(Accelerometer.addListener(setData));
  };

  const _unsubscribe = useCallback(() => {
    subscription && subscription.remove();
    setSubscription(null);
  }, [subscription]);

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      Math.max(Math.abs(x * 2), Math.abs(y * 2), Math.abs(z)) === Math.abs(z)
    ) {
      if (pos === 'up') {
        setPos('down');
      }
    } else {
      if (pos === 'down') {
        setPos('up');
      }
    }
  }, [pos, x, y, z]);

  return pos;
};
