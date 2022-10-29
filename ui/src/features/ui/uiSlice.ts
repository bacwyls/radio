import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UIState {
  userInteracted: boolean;
  playerReady: boolean;
  playerInSync: boolean;
}

const initialState: UIState = {
  userInteracted: false,
  playerReady: false,
  playerInSync: false,
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
    // setNavigationOpen: (state, action: PayloadAction<boolean>) => {
    //   return {
    //     ...state,
    //     navigationOpen: action.payload,
    //   }
    // },
    // toggleNativationOpen: (state, action: PayloadAction) => {
    //   return {
    //     ...state,
    //     navigationOpen: !state.navigationOpen,
    //   }
    // }
  }
});

export const {
  setUserInteracted,
  setPlayerReady,
  setPlayerInSync,
} = uiSlice.actions;

export const selectUserInteracted = (state: RootState) => state.ui.userInteracted;
export const selectPlayerReady = (state: RootState) => state.ui.playerReady;
export const selectPlayerInSync = (state: RootState) => state.ui.playerInSync;

export default uiSlice.reducer;