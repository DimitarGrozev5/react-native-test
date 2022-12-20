import { ListRenderItemInfo, StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../global-styling';
import { VerticalData } from './HistoryData';

type Props = {
  data: ListRenderItemInfo<VerticalData>;
  max: number;
};

const VerticalDataPoint = ({ data, max }: Props) => {
  if (data.item.type === 'achivement') {
    return (
      <>
        <View
          style={[
            styles.dataBar,
            styles.goalStyle,
            { height: `${(data.item.data.goal / max) * 100}%` },
          ]}
        ></View>
        <View
          style={[
            styles.dataBar,
            styles.achievementStyle,
            { height: `${(data.item.data.achieved / max) * 100}%` },
          ]}
        ></View>
      </>
    );
  }

  return (
    <View style={styles.dateContainer}>
      <View style={styles.dateRotated}>
        <Text style={styles.dateText}>{data.item.data}</Text>
      </View>
    </View>
  );
};

export default VerticalDataPoint;

const styles = StyleSheet.create({
  dataBar: {
    borderLeftWidth: 1,
    alignSelf: 'flex-end',
  },
  goalStyle: {
    marginLeft: 2,
    marginRight: 1,
    borderColor: Colors.primary600,
  },
  achievementStyle: {
    marginRight: 2,
    borderColor: Colors.primary700,
  },
  dateContainer: {
    alignSelf: 'flex-end',
    padding: 4,
  },
  dateRotated: {
    position: 'absolute',
    transform: [{ translateX: -12 }, { translateY: -16 }, { rotate: '270deg' }],
  },
  dateText: {
    fontSize: 8,
  },
});
