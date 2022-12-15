import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { dbActions } from './db-slice';

export const startSessionThunk =
  (): ThunkAction<void, RootState, unknown, AnyAction> => (dispatch) => {
    const now = new Date().getTime() / 1000;

    // TODO: Save to storage

    dispatch(dbActions.updateStartedAt(now));
  };

export const stopSessionThunk =
  (): ThunkAction<void, RootState, unknown, AnyAction> =>
  (dispatch, getState) => {
    const db = getState().db;

    const now = new Date().getTime() / 1000;

    // TODO: Save to storage

    const startTime = db.activeSession.startedAt || now;
    const totalSessionTime = now - startTime;

    dispatch(dbActions.updateStartedAt(null));
    dispatch(dbActions.addToDailyAchivement(totalSessionTime));
  };
