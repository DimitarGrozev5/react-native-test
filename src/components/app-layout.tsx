import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, StatusBar as SB } from 'react-native';
import { Colors } from '../global-styling';

type Props = React.PropsWithChildren;

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <SafeAreaView style={[styles.container, { paddingTop: SB.currentHeight }]}>
      <StatusBar style="dark" />
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
    backgroundColor: Colors.primary300,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
});
