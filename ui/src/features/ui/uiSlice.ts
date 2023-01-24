import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

const isSystemDarkMode = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true
  }
  else { return false }
}

export interface UIState {
  userInteracted: boolean;
  playerReady: boolean;
  playerInSync: boolean;
  isChatFullScreen: boolean;
  isViewersMenuOpen: boolean,
  isSettingsMenuOpen: boolean,
  isLandscape: boolean,
  isDarkMode: boolean,
  isPlayMenuOpen: boolean,
  isTalkMenuOpen: boolean,
  documentFontSize: number,
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
  isPlayMenuOpen: false,
  isTalkMenuOpen: false,
  documentFontSize: 29,
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
    setIsPlayMenuOpen: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isPlayMenuOpen: action.payload,
      }
    },
    setIsTalkMenuOpen: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isTalkMenuOpen: action.payload,
      }
    },
    setDocumentFontSize: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        documentFontSize: action.payload,
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
  setIsViewersMenuOpen,
  setIsSettingsMenuOpen,
  setIsPlayMenuOpen,
  setIsTalkMenuOpen,
  setDocumentFontSize,
} = uiSlice.actions;

export const selectUserInteracted = (state: RootState) => state.ui.userInteracted;
export const selectPlayerReady = (state: RootState) => state.ui.playerReady;
export const selectPlayerInSync = (state: RootState) => state.ui.playerInSync;
export const selectIsChatFullScreen = (state: RootState) => state.ui.isChatFullScreen;
export const selectIsLandscape = (state: RootState) => state.ui.isLandscape;
export const selectIsDarkMode = (state: RootState) => state.ui.isDarkMode;
export const selectIsViewersMenuOpen = (state: RootState) => state.ui.isViewersMenuOpen;
export const selectIsSettingsMenuOpen = (state: RootState) => state.ui.isSettingsMenuOpen;
export const selectIsPlayMenuOpen = (state: RootState) => state.ui.isPlayMenuOpen;
export const selectIsTalkMenuOpen = (state: RootState) => state.ui.isTalkMenuOpen;
export const selectDocumentFontSize = (state: RootState) => state.ui.documentFontSize;

export default uiSlice.reducer;