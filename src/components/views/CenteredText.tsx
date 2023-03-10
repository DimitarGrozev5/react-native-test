import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { DarkColors, useDarkModeStyle } from '../../global-styling';

type Props = React.PropsWithChildren & { style?: TextStyle | TextStyle[] };

const CenteredText: React.FC<Props> = ({ children, style = {} }) => {
  const { pick } = useDarkModeStyle();
  return (
    <Text style={[style, styles.centeredText, pick(styles.dark)]}>
      {children}
    </Text>
  );
};

export default CenteredText;

const styles = StyleSheet.create({
  centeredText: {
    textAlign: 'center',
  },
  dark: {
    color: DarkColors.text,
  },
});
