import { DB } from './db';

export interface Readable {
  getItem: (key: string) => Promise<string | undefined>;
}

export interface Writable {
  setItem: (key: string, value: DB) => Promise<boolean>;
}

export type Storage = Readable & Writable;
