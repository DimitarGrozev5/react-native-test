import React from 'react';

import { Provider } from 'react-redux';
import AppLayout from './src/components/app-layout';
import DataOverview from './src/components/data-overview/DataOverview';
import GoalControl from './src/components/goal-control/GoalControl';
import SessionControl from './src/components/session-control/SessionControl';
import StoreProvider from './src/store-mobx/storeContext';
import store from './src/store/store';

export default function App() {
  return (
    <StoreProvider>
      <Provider store={store}>
        <AppLayout>
          <SessionControl />
          <GoalControl />
          <DataOverview />
        </AppLayout>
      </Provider>
    </StoreProvider>
  );
}
