import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { asyncStorage } from './src/async-storage/async-storage';
import AppLayout from './src/components/app-layout';
import ShowSession from './src/components/session/session';
import { assertDBNotNull, useGetDB } from './src/hooks/useGetDB';

export default function App() {
  const [db] = useGetDB(asyncStorage, 'local-db');

  // This assertion is stupid and wrong, but I was experimenting
  try {
    assertDBNotNull(db);
  } catch (error) {
    return <Text>Error loading app</Text>;
  }

  return (
    <AppLayout>
      <ShowSession db={db} />
    </AppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
