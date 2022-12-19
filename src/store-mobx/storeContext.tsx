import { useLocalObservable } from 'mobx-react-lite';

import type { PropsWithChildren } from 'react';
import { createContext } from 'react';
import { TStore } from './store';
import { createStore } from './store';

export const storeContext = createContext<TStore | null>(null);

export function StoreProvider({ children }: PropsWithChildren): JSX.Element {
  const store = useLocalObservable(createStore);

  return (
    <storeContext.Provider value={store}>{children}</storeContext.Provider>
  );
}

export default StoreProvider;
