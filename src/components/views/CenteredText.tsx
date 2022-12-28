import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

type Props = React.PropsWithChildren & { style?: TextStyle | TextStyle[] };

const CenteredText: React.FC<Props> = ({ children, style = {} }) => {
  return <Text style={[style, styles.centeredText]}>{children}</Text>;
};

export default CenteredText;

const styles = StyleSheet.create({
  centeredText: {
    textAlign: 'center',
  },
});
