import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { Colors } from '../../../App';

type Props = React.PropsWithChildren;

const AccentText: React.FC<Props> = ({ children }) => {
  return <Text style={[styles.accentText]}>{children}</Text>;
};

export default AccentText;

const styles = StyleSheet.create({
  accentText: {
    color: Colors.primary700,
  },
});
