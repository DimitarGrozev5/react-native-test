import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DB, emptyDB } from '../../model/db/db';
import { UTCTimestamp } from '../../model/util-types';

const dbSLice = createSlice({
  name: 'db',
  initialState: emptyDB,
  reducers: {
    updateStartedAt: (state, action: PayloadAction<UTCTimestamp>) => {
      state.activeSession.startedAt = action.payload;
    },
  },
});

export const dbReducer = dbSLice.reducer;
export const dbActions = dbSLice.actions;
