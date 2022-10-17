import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UIState {
  userInteracted: boolean;
  playerReady: boolean;
  playerInSync: boolean;
  navigationOpen: boolean;
}

const initialState: UIState = {
  userInteracted: false,
  playerReady: false,
  playerInSync: false,
  navigationOpen: false
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setUserInteracted: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        userInteracted: action.payload,
      }
    },
    setPlayerReady: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        playerReady: action.payload,
      }
    },
    setPlayerInSync: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        playerInSync: action.payload,
      }
    },
    setNavigationOpen: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        navigationOpen: action.payload,
      }
    }
  }
});

export const { 
  setUserInteracted,
  setPlayerReady,
  setPlayerInSync,
  setNavigationOpen
} = uiSlice.actions;

export const selectUserInteracted = (state: RootState) => state.ui.userInteracted;
export const selectPlayerReady = (state: RootState) => state.ui.playerReady;
export const selectPlayerInSync = (state: RootState) => state.ui.playerInSync;
export const selectNavigationOpen = (state: RootState) => state.ui.navigationOpen;

export default uiSlice.reducer;