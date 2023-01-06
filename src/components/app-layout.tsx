import React from 'react';

import { StatusBar } from 'expo-status-bar';
import { KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { DarkColors, LightColors, useDarkModeStyle } from '../global-styling';

type Props = React.PropsWithChildren;

const AppLayout: React.FC<Props> = ({ children }) => {
  const { toggle } = useDarkModeStyle();
  return (
    <KeyboardAvoidingView behavior="height" style={styles.screen}>
      <View style={[styles.container, toggle(styles.containerDark)]}>
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
  },
  container: {
    backgroundColor: LightColors.primary300,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
  },
  containerDark: {
    backgroundColor: DarkColors.primary300,
  },
});
