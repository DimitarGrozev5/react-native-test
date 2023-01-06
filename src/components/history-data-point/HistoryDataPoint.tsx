import React from 'react';
import { ListRenderItemInfo, StyleSheet, Text, View } from 'react-native';
import {
  DarkColors,
  LightColors,
  useDarkModeStyle,
} from '../../global-styling';
import { DailyAchievement } from '../../model/db/db';
import { formatTime } from '../../util/format-time';
import AccentText from '../views/AccentText';

type Props = {
  data: ListRenderItemInfo<DailyAchievement>;
  max: number;
};

const HistoryDataPoint = ({ data, max }: Props) => {
  const { toggle } = useDarkModeStyle();
  return (
    <View style={[styles.container, toggle(styles.containerDark)]}>
      <View style={[styles.dataRow]}>
        <View style={[styles.textData]}></View>
        <View style={[styles.graphData]}>
          <AccentText>{data.item.date.join('.')}</AccentText>
        </View>
      </View>

      <View style={[styles.dataRow]}>
        <View style={[styles.textData]}>
          <Text style={[styles.textDataLabel, toggle(styles.textDataLabelDark)]}>
            {formatTime(data.item.goal)}
          </Text>
        </View>
        <View style={[styles.graphData]}>
          <DataBar width={data.item.goal / max} type="goal" />
        </View>
      </View>

      <View style={[styles.dataRow]}>
        <View style={[styles.textData]}>
          <Text style={[styles.textDataLabel, toggle(styles.textDataLabelDark)]}>
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
  const { toggle } = useDarkModeStyle();
  return (
    <View
      style={[
        styles.dataBar,
        type === 'goal' ? styles.goalStyle : styles.achievementStyle,
        type === 'goal'
          ? toggle(styles.goalStyleDark)
          : toggle(styles.achievementStyleDark),
        { width: `${width * 100}%` },
      ]}
    >
      <Text
        style={[
          type === 'goal' ? styles.goalTextStyle : styles.achievedTextStyle,
          type === 'goal'
            ? toggle(styles.goalTextStyleDark)
            : toggle(styles.achievedTextStyleDark),
        ]}
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
    backgroundColor: LightColors.primary300,
    marginBottom: 8,
    padding: 8,
    paddingBottom: 16,
  },
  containerDark: {
    backgroundColor: DarkColors.primary300,
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
  textDataLabelDark: {
    color: DarkColors.text,
  },
  graphData: {
    flex: 5,
  },
  dataBar: {
    borderWidth: 1,
  },
  goalStyle: {
    borderColor: LightColors.primary600,
    backgroundColor: LightColors.primary600,
  },
  goalStyleDark: {
    borderColor: DarkColors.primary600,
    backgroundColor: DarkColors.primary600,
  },
  goalTextStyle: {
    color: LightColors.primary300,
  },
  goalTextStyleDark: {
    color: DarkColors.primary300,
  },
  achievementStyle: {
    borderColor: LightColors.primary700,
    backgroundColor: LightColors.primary300,
  },
  achievementStyleDark: {
    borderColor: DarkColors.primary700,
    backgroundColor: DarkColors.primary300,
  },
  achievedTextStyle: {
    color: LightColors.primary700,
  },
  achievedTextStyleDark: {
    color: DarkColors.primary700,
  },
});
