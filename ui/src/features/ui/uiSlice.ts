import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UIState {
  userInteracted: boolean;
  playerReady: boolean;
  playerInSync: boolean;
  isChatFullScreen: boolean;
  isViewersMenuOpen: boolean,
  isSettingsMenuOpen: boolean,
  isLandscape: boolean,
  isDarkMode: boolean,
  isPlayModalOpen: boolean,
  isTalkModalOpen: boolean,
}


const isSystemDarkMode = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true
  }
  else { return false }
}

const initialState: UIState = {
  userInteracted: false,
  playerReady: false,
  playerInSync: false,
  isChatFullScreen: false,
  isViewersMenuOpen: false,
  isSettingsMenuOpen: false,
  isLandscape: false,
  isDarkMode: isSystemDarkMode(),
  isPlayModalOpen: false,
  isTalkModalOpen: false,
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
    setIsDarkMode: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isDarkMode: action.payload,
      }
    },
    setIsConnecting: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isConnecting: action.payload,
      }
    },
    setIsViewersMenuOpen: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isViewersMenuOpen: action.payload,
      }
    },
    setIsSettingsMenuOpen: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isSettingsMenuOpen: action.payload,
      }
    },
    setIsPlayModalOpen: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isPlayModalOpen: action.payload,
      }
    },
    setIsTalkModalOpen: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isTalkModalOpen: action.payload,
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
  setIsDarkMode,
  setIsConnecting,
  setIsViewersMenuOpen,
  setIsSettingsMenuOpen,
  setIsPlayModalOpen,
  setIsTalkModalOpen,
} = uiSlice.actions;

export const selectUserInteracted = (state: RootState) => state.ui.userInteracted;
export const selectPlayerReady = (state: RootState) => state.ui.playerReady;
export const selectPlayerInSync = (state: RootState) => state.ui.playerInSync;
export const selectIsChatFullScreen = (state: RootState) => state.ui.isChatFullScreen;
export const selectIsLandscape = (state: RootState) => state.ui.isLandscape;
export const selectIsDarkMode = (state: RootState) => state.ui.isDarkMode;
export const selectIsViewersMenuOpen = (state: RootState) => state.ui.isViewersMenuOpen;
export const selectIsSettingsMenuOpen = (state: RootState) => state.ui.isSettingsMenuOpen;
export const selectIsPlayModalOpen = (state: RootState) => state.ui.isPlayModalOpen;
export const selectIsTalkModalOpen = (state: RootState) => state.ui.isTalkModalOpen;

export default uiSlice.reducer;