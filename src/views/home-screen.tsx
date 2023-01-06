import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AppLayout from '../components/app-layout';
import DataOverview from '../components/data-overview/DataOverview';
import GoalControl from '../components/goal-control/GoalControl';
import SessionControl from '../components/session-control/SessionControl';
import { useOrientation } from '../hooks/useOrientation';

const HomeScreen = () => {
  const orientation = useOrientation();

  if (orientation === 'portrait') {
    return (
      <>
        <AppLayout>
          <SessionControl />
          <GoalControl />
          <DataOverview />
        </AppLayout>
      </>
    );
  }

  return (
    <>
      <AppLayout>
        <ScrollView style={[styles.scrollView]}>
          <View style={styles.topRow}>
            <SessionControl />
            <GoalControl />
          </View>
          <DataOverview />
        </ScrollView>
      </AppLayout>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  scrollView: { flex: 1, width: '100%' },
  topRow: {
    flexDirection: 'row',
  },
});
