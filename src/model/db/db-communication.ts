import { DB } from './db';

export type StorageReader<R extends Readable> = (
  readable: R,
  storageKey: string
) => DB | null;

export interface Readable {
  getItem: (key: string) => Promise<string | undefined>;
}

export type StorageWriter<R extends Writable> = (
  writable: R,
  storageKey: string,
  db: DB
) => boolean;

export interface Writable {
  setItem: (key: string, value: DB) => Promise<void>;
}

export type Storage = Readable & Writable;

export type StorageCom<R extends Storage> = (
  storage: R,
  storageKey: string
) => DB | null;
