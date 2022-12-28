import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import StoreProvider from './src/store-mobx/storeContext';
import HomeScreen from './src/views/home-screen';
import History from './src/views/history';
import { Colors } from './src/global-styling';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Drawer.Navigator
          // screenOptions={{
          //   headerStyle: {
          //     backgroundColor: Colors.primary600,
          //   },
          //   headerTintColor: Colors.primary300,
          // }}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="History" component={History} />
        </Drawer.Navigator>
        {/* <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary600,
            },
            headerTintColor: Colors.primary300,
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="History" component={History} />
        </Stack.Navigator> */}
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
