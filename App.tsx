import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import AppLayout from './src/components/app-layout';
import SessionControl from './src/components/session-control/SessionControl';
import store from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <AppLayout>
        <SessionControl />
      </AppLayout>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {},
});
