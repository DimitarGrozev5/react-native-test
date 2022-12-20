import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '../../global-styling';

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
    borderColor: Colors.primary600,
    backgroundColor: Colors.primary600,
  },
  achievedBar: {
    borderColor: Colors.primary700,
    backgroundColor: Colors.primary300,
  },
});
