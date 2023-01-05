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
import {
  DarkColors,
  LightColors,
  useColors,
  useDarkModeStyle,
} from './src/global-styling';
import RegisterScreen from './src/views/register';
import ViewScreen from './src/views/view-screen';
import WebViewScreen from './src/views/web-view-screen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const colors = useColors();
  const { switchColors } = useDarkModeStyle();
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: switchColors(
            LightColors.primary600,
            DarkColors.primary500
          ),
        },
        headerTintColor: switchColors(
          LightColors.primary300,
          DarkColors.primary700
        ),
        drawerActiveBackgroundColor: colors.primary500,
        drawerActiveTintColor: colors.primary700,
        drawerStyle: { backgroundColor: colors.primary300 },
        drawerLabelStyle: { color: colors.primary700 },
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
        name="QReader"
        component={ViewScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
          unmountOnBlur: true,
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
  const { switchColors } = useDarkModeStyle();
  return (
    <StoreProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: switchColors(
                LightColors.primary600,
                DarkColors.primary500
              ),
            },
            headerTintColor: switchColors(
              LightColors.primary300,
              DarkColors.primary700
            ),
          }}
        >
          <Stack.Screen
            name="HomeDrawer"
            component={DrawerNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen
            name="WebView"
            component={WebViewScreen}
            initialParams={{ url: 'http://google.com' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}

export type RootStackParamList = {
  HomeDrawer: undefined;
  History: undefined;
  WebView: { url: string };
};

export type WebViewScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'WebView'
>;

// export type ScreenNavigation = ScreenProps['navigation'];
