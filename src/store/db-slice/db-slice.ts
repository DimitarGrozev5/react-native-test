import { createSlice } from '@reduxjs/toolkit';
import { DB, emptyDB } from '../../model/db/db';

const dbSLice = createSlice({
  name: 'db',
  initialState: emptyDB,
  reducers: {},
});

export const dbReducer = dbSLice.reducer;
export const dbActions = dbSLice.actions;
