import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  DarkColors,
  LightColors,
  useDarkModeStyle,
} from '../../global-styling';

type DataBarProps = {
  goal: number;
  achieved: number;
};

const p = (n: number) => `${n * 100}%`;

const DataBar: React.FC<DataBarProps> = ({ goal, achieved }) => {
  const { toggle } = useDarkModeStyle();
  return (
    <View style={styles.dataBarContainer}>
      <View
        style={[
          styles.dataBar,
          styles.goalBar,
          toggle(styles.goalBarDark),
          { height: p(goal) },
        ]}
      ></View>
      <View
        style={[
          styles.dataBar,
          styles.achievedBar,
          toggle(styles.achievedBarDark),
          { height: p(achieved) },
        ]}
      ></View>
    </View>
  );
};

export default DataBar;

const styles = StyleSheet.create({
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
    borderColor: LightColors.primary600,
    backgroundColor: LightColors.primary600,
  },
  goalBarDark: {
    borderColor: DarkColors.primary600,
    backgroundColor: DarkColors.primary600,
  },
  achievedBar: {
    borderColor: LightColors.primary700,
    backgroundColor: LightColors.primary300,
  },
  achievedBarDark: {
    borderColor: DarkColors.primary700,
    backgroundColor: DarkColors.primary300,
  },
});
