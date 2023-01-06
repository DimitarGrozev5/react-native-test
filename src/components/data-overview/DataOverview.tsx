import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, useWindowDimensions, View } from 'react-native';
import {
  DarkColors,
  LightColors,
  useDarkModeStyle,
} from '../../global-styling';
import { useOrientation } from '../../hooks/useOrientation';
import { DailyAchievement } from '../../model/db/db';
import { useDBStore } from '../../store-mobx/db/useDBStore';
import AccentText from '../views/AccentText';
import Card from '../views/Card';
import CenteredText from '../views/CenteredText';
import DataBar from './DataBar';

const DataOverview = () => {
  const nav = useNavigation();

  const last7days = useDBStore('achieved').last7days;

  // Calcualate relative values
  const max = useMemo(
    () =>
      last7days.reduce(
        (tmpMax, day) => Math.max(tmpMax, day.achieved, day.goal),
        -1
      ),
    [last7days]
  );

  const scaled7days: DailyAchievement[] = useMemo(
    () =>
      last7days.map((day) => ({
        date: day.date,
        goal: day.goal / max,
        achieved: day.achieved / max,
      })),
    [last7days, max]
  );

  const { pick, switchColors } = useDarkModeStyle();

  const isLandscape = useOrientation() === 'landscape';
  const { height } = useWindowDimensions();

  return (
    <Card
      header="Previous Days"
      expand
      style={isLandscape ? { width: '100%', height: height - 120 } : {}}
    >
      <Pressable
        style={styles.pressable}
        onPress={() => nav.navigate('History')}
        android_ripple={{
          color: switchColors(LightColors.primary300, DarkColors.text),
        }}
      >
        <CenteredText>
          <AccentText>Last 7 Days</AccentText>
        </CenteredText>
        <View style={[styles.graphContainer, pick(styles.graphContainerDark)]}>
          {scaled7days.map((day) => (
            <DataBar
              key={day.date.join(',')}
              goal={day.goal}
              achieved={day.achieved}
            />
          ))}
        </View>
      </Pressable>
    </Card>
  );
};

export default DataOverview;

const styles = StyleSheet.create({
  graphContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: LightColors.primary600,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
  graphContainerDark: {
    borderColor: DarkColors.primary600,
  },
  pressable: {
    flex: 1,
  },
});
