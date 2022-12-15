import { StyleSheet, Text, View } from 'react-native';
import AppLayout from './src/components/app-layout';

export default function App() {
  return (
    <AppLayout>
      <Text>Test</Text>
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
