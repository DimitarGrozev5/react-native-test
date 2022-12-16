import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { emptyDB } from '../../model/db/db';
import { Seconds, UTCTimestamp } from '../../model/util-types';

const dbSLice = createSlice({
  name: 'db',
  initialState: emptyDB,
  reducers: {
    updateStartedAt: (state, action: PayloadAction<UTCTimestamp | null>) => {
      state.activeSession.startedAt = action.payload;
    },
    addToDailyAchivement: (state, action: PayloadAction<Seconds>) => {
      state.achieved.today.achieved += action.payload;
    },
    updateDailyGoal: (state, action: PayloadAction<Seconds>) => {
      state.achieved.today.goal = action.payload;
    },

    updateGoal: (state, action: PayloadAction<Seconds>) => {
      state.goals.currentDailyGoal = action.payload;
    },
  },
});

export const dbReducer = dbSLice.reducer;
export const dbActions = dbSLice.actions;
