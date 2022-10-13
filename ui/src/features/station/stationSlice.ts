import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface StationState {
  talkMsg: string;
  spinUrl: string;
  spinTime: number;
  tunePatP: string;
  radioSub: number;
  isPublic: boolean;
  viewers: string[];
}

const initialState: StationState = {
  talkMsg: '',
  spinUrl: '',
  spinTime: 0,
  tunePatP: '',
  radioSub: 0,
  isPublic: false,
  viewers: Array<string>()
};

export const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {
    setTalkMsg: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        talkMsg: action.payload,
      }
    },
    setSpinUrl: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        spinUrl: action.payload,
      }
    },
    setSpinTime: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        spinTime: action.payload,
      }
    },
    setTunePatP: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        tunePatP: action.payload,
      }
    },
    setRadioSub: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        radioSub: action.payload,
      }
    },
    setIsPublic: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isPublic: action.payload,
      }
    },
    setViewers: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        viewers: action.payload,
      }
    }
  }
});

export const { 
  setTalkMsg,
  setSpinUrl,
  setSpinTime,
  setTunePatP,
  setRadioSub,
  setIsPublic,
  setViewers
} = stationSlice.actions;

export const selectTalkMsg = (state: RootState) => state.station.talkMsg;
export const selectSpinUrl = (state: RootState) => state.station.spinUrl;
export const selectSpinTime = (state: RootState) => state.station.spinTime;
export const selectTunePatP = (state: RootState) => state.station.tunePatP;
export const selectRadioSub = (state: RootState) => state.station.radioSub;
export const selectIsPublic = (state: RootState) => state.station.isPublic;
export const selectViewers = (state: RootState) => state.station.viewers;

export default stationSlice.reducer;