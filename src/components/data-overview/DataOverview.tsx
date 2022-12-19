import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { ScreenNavigation } from '../../../App';
import { Colors } from '../../global-styling';
import { DailyAchievement } from '../../model/db/db';
import { useDBStore } from '../../store-mobx/db/useDBStore';
import AccentText from '../views/AccentText';
import Card from '../views/Card';
import CenteredText from '../views/CenteredText';

const DataOverview = () => {
  const nav = useNavigation<ScreenNavigation>();

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

  return (
    <Card header="Previous Days" style={{ flex: 1 }}>
      <Pressable
        style={styles.pressable}
        onPress={() => nav.navigate('History')}
        android_ripple={{ color: Colors.primary300 }}
      >
        <CenteredText>
          <AccentText>Last 7 Days</AccentText>
        </CenteredText>
        <View style={styles.graphContainer}>
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

type DataBarProps = {
  goal: number;
  achieved: number;
};

const p = (n: number) => `${n * 100}%`;

const DataBar: React.FC<DataBarProps> = ({ goal, achieved }) => {
  return (
    <View style={styles.dataBarContainer}>
      <View
        style={[styles.dataBar, styles.goalBar, { height: p(goal) }]}
      ></View>
      <View
        style={[styles.dataBar, styles.achievedBar, { height: p(achieved) }]}
      ></View>
    </View>
  );
};

export default DataOverview;

const styles = StyleSheet.create({
  graphContainer: {
    flex: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.primary600,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end',
  },
  dataBarContainer: {
    flexDirection: 'row',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    width: '5%',
  },
  dataBar: {
    borderWidth: 1,
    width: '50%',
  },
  goalBar: {
    borderColor: Colors.primary600,
    backgroundColor: Colors.primary600,
  },
  achievedBar: {
    borderColor: Colors.primary700,
    backgroundColor: Colors.primary300,
  },
  pressable: {
    flex: 1,
  },
});
