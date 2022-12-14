import { Storage } from '../model/db/db-communication';

export const asyncStorage: Storage = {
  getItem: async () => undefined,
  setItem: async (key, value) => {},
};
