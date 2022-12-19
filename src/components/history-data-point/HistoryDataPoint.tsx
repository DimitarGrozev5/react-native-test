import { ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../global-styling';
import { DailyAchievement } from '../../model/db/db';
import { formatTime } from '../../util/format-time';
import AccentText from '../views/AccentText';

type Props = {
  data: ListRenderItemInfo<DailyAchievement>;
  max: number;
};

const HistoryDataPoint = ({ data, max }: Props) => {
  return (
    <View style={styles.container}>
      <View style={[styles.dataRow]}>
        <View style={[styles.textData]}></View>
        <View style={[styles.graphData]}>
          <AccentText>{data.item.date.join('.')}</AccentText>
        </View>
      </View>

      <View style={[styles.dataRow]}>
        <View style={[styles.textData]}>
          <Text style={styles.textDataLabel}>{formatTime(data.item.goal)}</Text>
        </View>
        <View style={[styles.graphData]}>
          <DataBar width={data.item.goal / max} type="goal" />
        </View>
      </View>

      <View style={[styles.dataRow]}>
        <View style={[styles.textData]}>
          <Text style={styles.textDataLabel}>
            {formatTime(data.item.achieved)}
          </Text>
        </View>
        <View style={[styles.graphData]}>
          <DataBar width={data.item.achieved / max} type="achieved" />
        </View>
      </View>
    </View>
  );
};

const DataBar = ({
  width,
  type,
}: {
  width: number;
  type: 'goal' | 'achieved';
}) => {
  return (
    <View
      style={[
        styles.dataBar,
        type === 'goal' ? styles.goalStyle : styles.achievementStyle,
        { width: `${width * 100}%` },
      ]}
    >
      <Text
        style={
          type === 'goal' ? styles.goalTextStyle : styles.achievedTextStyle
        }
        numberOfLines={1}
      >
        {type}
      </Text>
    </View>
  );
};

export default HistoryDataPoint;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary300,
    marginBottom: 8,
    padding: 8,
    paddingBottom: 16,
  },
  dataRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textData: {
    flex: 1,
    marginRight: 8,
  },
  textDataLabel: {
    textAlign: 'right',
  },
  graphData: {
    flex: 5,
  },
  dataBar: {
    borderColor: 'black',
    borderWidth: 1,
  },
  goalStyle: {
    borderColor: Colors.primary600,
    backgroundColor: Colors.primary600,
  },
  goalTextStyle: {
    color: Colors.primary300,
  },
  achievementStyle: {
    borderColor: Colors.primary700,
    backgroundColor: Colors.primary300,
  },
  achievedTextStyle: {
    color: Colors.primary700,
  },
});
