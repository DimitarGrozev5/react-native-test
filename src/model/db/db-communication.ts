import { DB } from './db';

export type StorageReader<R extends Readable> = (
  readable: R,
  storageKey: string
) => JSON;

export interface Readable {
  get: (key: string) => JSON;
}

export type StorageWriter<R extends Writable> = (
  writable: R,
  storageKey: string,
  db: DB
) => boolean;

export interface Writable {
  set: (key: string) => JSON;
}
