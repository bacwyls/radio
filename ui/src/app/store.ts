import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import stationReducer from '../features/station/stationSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    station: stationReducer,
    ui: uiReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;