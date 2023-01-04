import { useColorScheme, StyleProp } from 'react-native';

export const LightColors = {
  primary300: '#f2d38f',
  primary500: '#f0c771',
  primary600: '#c28a10',
  primary700: '#966803',
};

export const DarkColors = {
  primary300: '#00001a',
  primary500: '#000033',
  primary600: '#966803',
  primary700: '#c28a10',
  text: '#ccccff',
};

export const useColors = () => {
  const sheme = useColorScheme();

  if (sheme === 'dark') {
    return DarkColors;
  }

  return LightColors;
};

export const useDarkModeStyle = () => {
  const scheme = useColorScheme();

  if (scheme === 'dark') {
    return {
      pick: <T>(style: StyleProp<T>) => style,
      switchColors: (lightColor: string, darkColor: string) => darkColor,
    };
  }

  return {
    pick: <T>(_: StyleProp<T>) => ({}),
    switchColors: (lightColor: string, darkColor: string) => lightColor,
  };
};
