import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UIState {
  userInteracted: boolean;
  playerReady: boolean;
  playerInSync: boolean;
  helpMenuOpen: boolean;
  helpMenuTop: number;
  helpMenuLeft: number;
  navigationOpen: boolean;
}

const initialState: UIState = {
  userInteracted: false,
  playerReady: false,
  playerInSync: false,
  helpMenuOpen: false,
  helpMenuTop: 0,
  helpMenuLeft: 0,
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
    setHelpMenuOpen: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        helpMenuOpen: action.payload,
      }
    },
    setHelpMenuTop: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        helpMenuTop: action.payload,
      }
    },
    setHelpMenuLeft: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        helpMenuLeft: action.payload,
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
  setHelpMenuOpen,
  setHelpMenuTop,
  setHelpMenuLeft,
  setNavigationOpen
} = uiSlice.actions;

export const selectUserInteracted = (state: RootState) => state.ui.userInteracted;
export const selectPlayerReady = (state: RootState) => state.ui.playerReady;
export const selectPlayerInSync = (state: RootState) => state.ui.playerInSync;
export const selectHelpMenuOpen = (state: RootState) => state.ui.helpMenuOpen;
export const selectHelpMenuTop = (state: RootState) => state.ui.helpMenuTop;
export const selectHelpMenuLeft = (state: RootState) => state.ui.helpMenuLeft;
export const selectNavigationOpen = (state: RootState) => state.ui.navigationOpen;

export default uiSlice.reducer;