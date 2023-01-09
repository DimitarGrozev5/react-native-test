import { useState } from 'react';
import { LayoutChangeEvent } from 'react-native';
import { useIsPortrait } from '../../hooks/useIsPortrait';

type CameraSize = {
  w: number;
  h: number;
};
type LayoutChangeHandler = (e: LayoutChangeEvent) => void;

export const useCameraSizeCalculator = (): [CameraSize, LayoutChangeHandler] => {
  const isPortrait = useIsPortrait();

  const [cameraSize, setCameraSize] = useState({ w: 0, h: 0 });

  const layoutChangeHandler: LayoutChangeHandler = (e) => {
    if (isPortrait) {
      let width = e.nativeEvent.layout.width - 30;
      let height = Math.round((width * 16) / 9);

      if (height > e.nativeEvent.layout.height) {
        height = e.nativeEvent.layout.height - 30;
        width = Math.round((height * 9) / 16);
      }
      setCameraSize({ w: width, h: height });
    } else {
      let width = e.nativeEvent.layout.width - 30;
      let height = Math.round((width * 9) / 16);

      if (height > e.nativeEvent.layout.height) {
        height = e.nativeEvent.layout.height - 30;
        width = Math.round((height * 16) / 9);
      }
      setCameraSize({ w: width, h: height });
    }
  };

  return [cameraSize, layoutChangeHandler];
};
