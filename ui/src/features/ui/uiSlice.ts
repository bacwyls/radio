import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UIState {
  userInteracted: boolean;
  playerReady: boolean;
  playerInSync: boolean;
  isChatFullScreen: boolean;
  isLandscape: boolean,
}

const initialState: UIState = {
  userInteracted: false,
  playerReady: false,
  playerInSync: false,
  isChatFullScreen: false,
  isLandscape: false,
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
    setIsChatFullScreen: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isChatFullScreen: action.payload,
      }
    },
    setIsLandscape: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isLandscape: action.payload,
      }
    },
  }
});

export const {
  setUserInteracted,
  setPlayerReady,
  setPlayerInSync,
  setIsChatFullScreen,
  setIsLandscape,
} = uiSlice.actions;

export const selectUserInteracted = (state: RootState) => state.ui.userInteracted;
export const selectPlayerReady = (state: RootState) => state.ui.playerReady;
export const selectPlayerInSync = (state: RootState) => state.ui.playerInSync;
export const selectIsChatFullScreen = (state: RootState) => state.ui.isChatFullScreen;
export const selectIsLandscape = (state: RootState) => state.ui.isLandscape;

export default uiSlice.reducer;