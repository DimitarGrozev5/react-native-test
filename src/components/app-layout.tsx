import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';

type Props = React.PropsWithChildren & {};

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      {children}
    </View>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0c771',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
