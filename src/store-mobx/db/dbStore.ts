/* eslint-disable no-underscore-dangle */
// noinspection JSUnusedGlobalSymbols

import { observable, runInAction } from 'mobx';
import {
  AchievedData,
  ActiveSessionData,
  DailyAchievement,
  GoalsData,
} from '../../model/db/db';
import { DateArray, Seconds, UTCTimestamp } from '../../model/util-types';

// export interface ItemStoreProps<T> {
//   token: string;
//   setToken: (token: string) => void;
//   language: string | null;
//   setLanguage: (language: string) => void;
//   items: T[];
//   isLoading: boolean;
//   save: (item: T) => Promise<string>;
//   get: (id: string) => T | undefined;
//   fetchAll: () => Promise<void>;
//   fetchOne: (id: string) => Promise<void>;
//   fetchQuery: (queryParams: Record<string, string>) => Promise<void>;
//   updateItem: (id: string, options: Partial<Record<keyof T, unknown>>) => void;
// }

export type DBStore = {
  dbVersion: 'v1';
  
  activeSession: ActiveSessionProps;
  goals: GoalsProps;
  achieved: AchievedProps;
};

export type ActiveSessionProps = ActiveSessionData & {
  setStartedAt: (t: null | UTCTimestamp) => void;
};
export function createDBActiveSessionStore(
  activeSession: ActiveSessionData
): ActiveSessionProps {
  const store = {
    _startedAt: observable.box<null | UTCTimestamp>(activeSession.startedAt),
    get startedAt() {
      return store._startedAt.get();
    },
    setStartedAt(timestamp: null | UTCTimestamp) {
      runInAction(() => store._startedAt.set(timestamp));
    },
  };
  return store;
}

export type GoalsProps = GoalsData & {
  setCurrentDailyGoal: (t: Seconds) => void;
};
export function createDBGoalsStore(goals: GoalsData): GoalsProps {
  const store = {
    _currentDailyGoal: observable.box<Seconds>(goals.currentDailyGoal),
    get currentDailyGoal() {
      return store._currentDailyGoal.get();
    },
    setCurrentDailyGoal(newGoal: Seconds) {
      runInAction(() => store._currentDailyGoal.set(newGoal));
    },
  };
  return store;
}

export type DailyAchievementProps = DailyAchievement & {
  setDate: (newDate: DateArray) => void;
  setAchieved: (newAchieved: Seconds) => void;
  addToAchieved: (amount: Seconds) => void;
  setGoal: (newGoal: Seconds) => void;
};
export type AchievedProps = AchievedData & {
  today: DailyAchievementProps;
  setToday: (today: DailyAchievement) => void;
  addToAchievedDays: (newDaily: DailyAchievement) => void;
  last7days: DailyAchievement[];
  overallSortedByDateDsd: DailyAchievement[];
};
export function createDBAchievedStore(achieved: AchievedData): AchievedProps {
  const store = {
    _today: {
      _date: observable.box<DateArray>(achieved.today.date),
      get date() {
        return store._today._date.get();
      },
      setDate(newDate: DateArray) {
        runInAction(() => store._today._date.set(newDate));
      },

      _achieved: observable.box<Seconds>(achieved.today.achieved),
      get achieved() {
        return store._today._achieved.get();
      },
      setAchieved(newAchieved: Seconds) {
        runInAction(() => store._today._achieved.set(newAchieved));
      },
      addToAchieved(amount: Seconds) {
        runInAction(() =>
          store._today._achieved.set(amount + store._today._achieved.get())
        );
      },

      _goal: observable.box<Seconds>(achieved.today.goal),
      get goal() {
        return store._today._goal.get();
      },
      setGoal(newGoal: Seconds) {
        runInAction(() => store._today._goal.set(newGoal));
      },
    },
    get today() {
      return {
        date: store._today._date.get(),
        setDate: store._today.setDate,
        achieved: store._today._achieved.get(),
        setAchieved: store._today.setAchieved,
        addToAchieved: store._today.addToAchieved,
        goal: store._today._goal.get(),
        setGoal: store._today.setGoal,
      };
    },
    setToday(today: DailyAchievement) {
      runInAction(() => {
        store._today.setDate(today.date);
        store._today.setAchieved(today.achieved);
        store._today.setGoal(today.goal);
      });
    },

    _overall: observable.box<DailyAchievement[]>(achieved.overall),
    get overall() {
      return store._overall.get();
    },
    get last7days() {
      return [...store._overall.get()]
        .sort((a, b) => {
          const aUTC = new Date(a.date[2], a.date[1] - 1, a.date[0]).getTime();
          const bUTC = new Date(b.date[2], b.date[1] - 1, b.date[0]).getTime();

          return aUTC - bUTC;
        })
        .slice(-7);
    },
    get overallSortedByDateDsd() {
      return [...store._overall.get()].sort((a, b) => {
        const aUTC = new Date(a.date[2], a.date[1] - 1, a.date[0]).getTime();
        const bUTC = new Date(b.date[2], b.date[1] - 1, b.date[0]).getTime();

        return bUTC - aUTC;
      });
    },
    addToAchievedDays(newDaily: DailyAchievement) {
      store._overall.set([...store.overall, newDaily]);
    },
  };
  return store;
}

// export function createDBStore<T extends BaseModel>(
//   name: ItemType
// ): ItemStoreProps<T> {
//   const initialToken = localStorage.getItem(AuthTokenStorageKey) ?? '';

//   const store = {
//     _token: observable.box<string>(initialToken),
//     get token() {
//       return store._token.get();
//     },
//     setToken(token: string) {
//       runInAction(() => store._token.set(token));
//     },

//     _language: observable.box<string>(''),
//     get language() {
//       return store._language.get();
//     },
//     setLanguage(language: string) {
//       runInAction(() => store._language.set(language));
//     },

//     _isLoading: observable.box<boolean>(false),
//     get isLoading() {
//       return store._isLoading.get();
//     },
//     setIsLoading(loading: boolean) {
//       runInAction(() => store._isLoading.set(loading));
//     },

//     _items: observable.box<T[]>([]),
//     get items() {
//       return store._items.get();
//     },
//     setItems(items: T[]) {
//       runInAction(() => store._items.set(items));
//     },

//     updateItem(id: string, options: Partial<Record<keyof T, unknown>>) {
//       const item = store.items.find((item) => item.id === id);
//       if (!item) return;
//       for (const record of Object.entries(options)) {
//         // eslint-disable-next-line
//         (item as any)[record[0]] = record[1];
//       }
//       store.setItems([...store.items.filter((item) => item.id !== id), item]);
//     },

//     async save(item: T): Promise<string> {
//       let newId = item.id;
//       if (store.token && Boolean(store.language))
//         try {
//           store.setIsLoading(true);
//           let newItem: T;
//           if (item.id === EmptyGuid) {
//             newItem = await postMethod<T>(
//               store.token,
//               store.language,
//               item,
//               name
//             );
//           } else {
//             newItem = await putMethod<T>(
//               store.token,
//               store.language,
//               item,
//               name
//             );
//           }
//           newId = newItem.id;

//           store.setItems([
//             ...store.items.filter((item) => item.id !== newId),
//             newItem,
//           ]);
//         } finally {
//           store.setIsLoading(false);
//         }
//       return newId;
//     },

//     get(id: string): T | undefined {
//       return store.items.find((item) => item.id === id);
//     },

//     async fetchAll() {
//       if (store.token && !store.isLoading && store.language) {
//         try {
//           store.setIsLoading(true);
//           const newItems = await getMethod<T[]>(
//             store.token,
//             store.language,
//             name
//           );
//           store.setItems(newItems);
//         } finally {
//           store.setIsLoading(false);
//         }
//       }
//     },

//     async fetchOne(id: string) {
//       if (store.token && !store.isLoading && store.language) {
//         try {
//           store.setIsLoading(true);
//           const item = await getMethod<T>(
//             store.token,
//             store.language,
//             name,
//             id
//           );

//           store.setItems([
//             ...store.items.filter((item2) => item2.id !== item.id),
//             item,
//           ]);
//         } finally {
//           store.setIsLoading(false);
//         }
//       }
//     },

//     async fetchQuery(queryParams: Record<string, string>) {
//       if (store.token && !store.isLoading && store.language) {
//         try {
//           store.setIsLoading(true);
//           const items = await queryMethod<T[]>(
//             store.token,
//             store.language,
//             queryParams,
//             name
//           );
//           store.setItems([
//             ...store.items.filter(
//               (item) => !items.find((item2) => item2.id === item.id)
//             ),
//             ...items,
//           ]);
//         } finally {
//           store.setIsLoading(false);
//         }
//       }
//     },
//   };
//   return store;
// }
