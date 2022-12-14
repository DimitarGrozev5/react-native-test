import AsyncStorage from '@react-native-async-storage/async-storage';

import { Storage } from '../model/db/db-communication';

export const asyncStorage: Storage = {
  getItem: async (key) => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (!jsonValue) {
        throw new Error("Can't fetch data under the provided key");
      }
      return JSON.parse(jsonValue);
    } catch (e) {
      return undefined;
    }
  },
  setItem: async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      return true;
    } catch (e) {
      return false;
    }
  },
};
