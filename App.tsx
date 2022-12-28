import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import StoreProvider from './src/store-mobx/storeContext';
import HomeScreen from './src/views/home-screen';
import History from './src/views/history';
import { Colors } from './src/global-styling';
import RegisterScreen from './src/views/register';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary600,
        },
        headerTintColor: Colors.primary300,
        drawerActiveBackgroundColor: Colors.primary500,
        drawerActiveTintColor: Colors.primary700,
        drawerStyle: { backgroundColor: Colors.primary300 },
        drawerLabelStyle: { color: Colors.primary700 },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Login"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-in" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <MaterialIcons name="app-registration" color={color} size={size} />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out" color={color} size={size} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: Colors.primary600,
            },
            headerTintColor: Colors.primary300,
          }}
        >
          <Stack.Screen
            name="HomeDrawer"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
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
