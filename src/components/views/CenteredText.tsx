import React from 'react';
import { Text, StyleSheet } from 'react-native';

type Props = React.PropsWithChildren;

const CenteredText: React.FC<Props> = ({ children }) => {
  return <Text style={[styles.centeredText]}>{children}</Text>;
};

export default CenteredText;

const styles = StyleSheet.create({
  centeredText: {
    textAlign: 'center',
  },
});
