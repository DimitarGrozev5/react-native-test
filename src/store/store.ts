import { configureStore } from '@reduxjs/toolkit';
import { dbReducer } from './db-slice/db-slice';

const store = configureStore({
  reducer: { db: dbReducer },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), //.concat(loggerMiddleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
