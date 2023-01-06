import { useWindowDimensions } from 'react-native';

export const useOrientation = (): 'portrait' | 'landscape' => {
  const { width, height } = useWindowDimensions();

  if (width < height) {
    return 'portrait';
  }
  return 'landscape';
};

export const useIsPortrait = ():boolean => {
  const { width, height } = useWindowDimensions();

  return width < height
};
