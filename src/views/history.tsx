import React from 'react';
import { observer } from 'mobx-react-lite';
import AppLayout from '../components/app-layout';
import HistoryData from '../components/history-data-point/HistoryData';

const History = () => {
  return (
    <>
      <AppLayout>
        <HistoryData />
      </AppLayout>
    </>
  );
};

export default observer(History);
