import React from 'react';
import { Text, StyleSheet } from 'react-native';
import {
  DarkColors,
  LightColors,
  useDarkModeStyle,
} from '../../global-styling';

type Props = React.PropsWithChildren;

const AccentText: React.FC<Props> = ({ children }) => {
  const { pick } = useDarkModeStyle();
  return (
    <Text style={[styles.accentText, pick(styles.accentTextDark)]}>
      {children}
    </Text>
  );
};

export default AccentText;

const styles = StyleSheet.create({
  accentText: {
    color: LightColors.primary700,
  },
  accentTextDark: {
    color: DarkColors.primary700,
  },
});
