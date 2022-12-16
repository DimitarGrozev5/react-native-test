import React from 'react';

import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import AppLayout from './src/components/app-layout';
import GoalControl from './src/components/goal-control/GoalControl';
import SessionControl from './src/components/session-control/SessionControl';
import store from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppLayout>
        <SessionControl />
        <GoalControl />
      </AppLayout>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
