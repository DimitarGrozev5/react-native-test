import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, View, StatusBar as SB } from 'react-native';

type Props = React.PropsWithChildren & {};

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={[styles.container, { paddingTop: SB.currentHeight }]}>
      <StatusBar style="auto" />
      {children}
    </SafeAreaView>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#f2d38f',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
  },
});
