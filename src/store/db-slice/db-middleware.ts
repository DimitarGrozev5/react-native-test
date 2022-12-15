import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { dbActions } from './db-slice';

export const startSessionThunk =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    const now = new Date().getTime() / 1000;

    // TODO: Save to store

    dispatch(dbActions.updateStartedAt(now));
  };
