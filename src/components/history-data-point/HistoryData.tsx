import React from 'react';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { DailyAchievement } from '../../model/db/db';
import { useDBStore } from '../../store-mobx/db/useDBStore';
import Card from '../views/Card';
import HistoryDataPoint from './HistoryDataPoint';
import VerticalDataPoint from './VerticalDataPoint';

export type VerticalData =
  | { type: 'date'; data: string }
  | { type: 'achivement'; data: DailyAchievement };

const HistoryData = () => {
  const historyData = useDBStore('achieved').overall;

  const sortedHistoryData = useMemo(
    () =>
      [...historyData].sort((a, b) => {
        const aUTC = new Date(a.date[2], a.date[1] - 1, a.date[0]).getTime();
        const bUTC = new Date(b.date[2], b.date[1] - 1, b.date[0]).getTime();

        return bUTC - aUTC;
      }),
    [historyData]
  );

  const max = useMemo(
    () =>
      sortedHistoryData.reduce(
        (tMax, pt) => Math.max(tMax, pt.achieved, pt.goal),
        -1
      ),
    [sortedHistoryData]
  );

  const dataForVertical: VerticalData[] = useMemo(
    () =>
      [...sortedHistoryData].reverse().flatMap((pt) => {
        const date = new Date(pt.date[2], pt.date[1] - 1, pt.date[0]);

        if (date.getDay() === 1) {
          return [
            { type: 'date', data: pt.date.join('.') },
            { type: 'achivement', data: pt },
          ];
        }
        return { type: 'achivement', data: pt };
      }),
    [sortedHistoryData]
  );
  return (
    <>
      <Card style={{ flex: 1 }}>
        <FlatList
          style={styles.horizontalList}
          data={dataForVertical}
          keyExtractor={(data) =>
            data.type === 'date' ? data.data : data.data.date.join(':')
          }
          renderItem={(data) => <VerticalDataPoint data={data} max={max} />}
          horizontal
        />
      </Card>
      <Card style={{ flex: 3 }}>
        <FlatList
          data={sortedHistoryData}
          keyExtractor={(data) => data.date.join(':')}
          renderItem={(data) => <HistoryDataPoint data={data} max={max} />}
        />
      </Card>
    </>
  );
};

export default observer(HistoryData);

const styles = StyleSheet.create({
  horizontalList: {
    flex: 1,
  },
});
