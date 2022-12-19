/* eslint-disable no-underscore-dangle */
// noinspection JSUnusedGlobalSymbols

import type { BaseModel } from "../models";

import { AuthTokenStorageKey, EmptyGuid } from "../utils";
import { getMethod, postMethod, putMethod, queryMethod } from "../api/apiCalls";
import { observable, runInAction } from "mobx";
import type { ItemType } from "./useItemStore";

export interface ItemStoreProps<T> {
  token: string;
  setToken: (token: string) => void;
  language: string | null;
  setLanguage: (language: string) => void;
  items: T[];
  isLoading: boolean;
  save: (item: T) => Promise<string>;
  get: (id: string) => T | undefined;
  fetchAll: () => Promise<void>;
  fetchOne: (id: string) => Promise<void>;
  fetchQuery: (queryParams: Record<string, string>) => Promise<void>;
  updateItem: (id: string, options: Partial<Record<keyof T, unknown>>) => void;
}

export function createItemStore<T extends BaseModel>(
  name: ItemType
): ItemStoreProps<T> {
  const initialToken = localStorage.getItem(AuthTokenStorageKey) ?? "";

  const store = {
    _token: observable.box<string>(initialToken),
    get token() {
      return store._token.get();
    },
    setToken(token: string) {
      runInAction(() => store._token.set(token));
    },

    _language: observable.box<string>(""),
    get language() {
      return store._language.get();
    },
    setLanguage(language: string) {
      runInAction(() => store._language.set(language));
    },

    _isLoading: observable.box<boolean>(false),
    get isLoading() {
      return store._isLoading.get();
    },
    setIsLoading(loading: boolean) {
      runInAction(() => store._isLoading.set(loading));
    },

    _items: observable.box<T[]>([]),
    get items() {
      return store._items.get();
    },
    setItems(items: T[]) {
      runInAction(() => store._items.set(items));
    },

    updateItem(id: string, options: Partial<Record<keyof T, unknown>>) {
      const item = store.items.find((item) => item.id === id);
      if (!item) return;
      for (const record of Object.entries(options)) {
        // eslint-disable-next-line
        (item as any)[record[0]] = record[1];
      }
      store.setItems([...store.items.filter((item) => item.id !== id), item]);
    },

    async save(item: T): Promise<string> {
      let newId = item.id;
      if (store.token && Boolean(store.language))
        try {
          store.setIsLoading(true);
          let newItem: T;
          if (item.id === EmptyGuid) {
            newItem = await postMethod<T>(
              store.token,
              store.language,
              item,
              name
            );
          } else {
            newItem = await putMethod<T>(
              store.token,
              store.language,
              item,
              name
            );
          }
          newId = newItem.id;

          store.setItems([
            ...store.items.filter((item) => item.id !== newId),
            newItem,
          ]);
        } finally {
          store.setIsLoading(false);
        }
      return newId;
    },

    get(id: string): T | undefined {
      return store.items.find((item) => item.id === id);
    },

    async fetchAll() {
      if (store.token && !store.isLoading && store.language) {
        try {
          store.setIsLoading(true);
          const newItems = await getMethod<T[]>(
            store.token,
            store.language,
            name
          );
          store.setItems(newItems);
        } finally {
          store.setIsLoading(false);
        }
      }
    },

    async fetchOne(id: string) {
      if (store.token && !store.isLoading && store.language) {
        try {
          store.setIsLoading(true);
          const item = await getMethod<T>(
            store.token,
            store.language,
            name,
            id
          );

          store.setItems([
            ...store.items.filter((item2) => item2.id !== item.id),
            item,
          ]);
        } finally {
          store.setIsLoading(false);
        }
      }
    },

    async fetchQuery(queryParams: Record<string, string>) {
      if (store.token && !store.isLoading && store.language) {
        try {
          store.setIsLoading(true);
          const items = await queryMethod<T[]>(
            store.token,
            store.language,
            queryParams,
            name
          );
          store.setItems([
            ...store.items.filter(
              (item) => !items.find((item2) => item2.id === item.id)
            ),
            ...items,
          ]);
        } finally {
          store.setIsLoading(false);
        }
      }
    },
  };
  return store;
}
