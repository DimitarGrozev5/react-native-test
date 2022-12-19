import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import StoreProvider from './src/store-mobx/storeContext';
import HomeScreen from './src/views/home-screen';
import History from './src/views/history';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="History" component={History} />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}

type RootStackParamList = {
  Home: undefined;
  History: undefined;
};

export type ScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'Home',
  'History'
>;
export type ScreenNavigation = ScreenProps['navigation'];
