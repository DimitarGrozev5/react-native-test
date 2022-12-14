import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { asyncStorage } from './src/async-storage/async-storage';
import { assertDBNotNull, useGetDB } from './src/hooks/useGetDB';

export default function App() {
  const db = useGetDB(asyncStorage, 'local-db');
  assertDBNotNull(db);

  return (
    <View style={styles.container}>
      <Text>{JSON.stringify(db)}</Text>
      <StatusBar style="auto" />
    </View>
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
