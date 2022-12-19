import { assertDefined } from '../../util/assertDefined';
import { storeContext } from '../storeContext';
import { useContext } from 'react';
import { DBStore } from './dbStore';

export type ItemType = keyof DBStore;
export type DBReturnType<K extends ItemType> = DBStore[K];

export function useDBStore<K extends ItemType>(itemType: K): DBReturnType<K> {
  const context = useContext(storeContext);
  assertDefined(context, 'storeContext is not initialized.');
  return (context?.db[itemType] ?? {}) as DBReturnType<K>;
}
