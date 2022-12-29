import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { Colors } from '../global-styling';

type Props = React.PropsWithChildren;

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <KeyboardAvoidingView behavior="height" style={styles.screen}>
      <View style={[styles.container]}>
        <StatusBar style="dark" />
        {children}
      </View>
    </KeyboardAvoidingView>
  );
};

export default AppLayout;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    borderWidth: 3,
    borderColor: 'red',
  },
  container: {
    backgroundColor: Colors.primary300,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
  },
});
