import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';
import { FlatList } from 'react-native';
import AppLayout from '../components/app-layout';
import HistoryDataPoint from '../components/history-data-point/HistoryDataPoint';
import Card from '../components/views/Card';
import { useDBStore } from '../store-mobx/db/useDBStore';

const History = () => {
  const historyData = useDBStore('achieved').overall;

  const sortedHistoryData = useMemo(
    () =>
      [...historyData].sort((a, b) => {
        const aUTC = new Date(a.date[2], a.date[1], a.date[0]).getTime();
        const bUTC = new Date(b.date[2], b.date[1], b.date[0]).getTime();

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

  return (
    <>
      <AppLayout>
        <Card style={{ flex: 1 }}>
          <FlatList
            data={sortedHistoryData}
            keyExtractor={(data) => data.date.join(':')}
            renderItem={(data) => <HistoryDataPoint data={data} max={max} />}
          />
        </Card>
      </AppLayout>
    </>
  );
};

export default observer(History);
