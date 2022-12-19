import React from 'react';

import AppLayout from './src/components/app-layout';
import DataOverview from './src/components/data-overview/DataOverview';
import GoalControl from './src/components/goal-control/GoalControl';
import SessionControl from './src/components/session-control/SessionControl';
import StoreProvider from './src/store-mobx/storeContext';

export default function App() {
  return (
    <StoreProvider>
      <AppLayout>
        <SessionControl />
        <GoalControl />
        <DataOverview />
      </AppLayout>
    </StoreProvider>
  );
}
