import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface ChatMessage {
  message: string;
  from: string;
  time: string;
}

export interface IMinitower {
  location: string;
  description: string;
  time: number;
  viewers: number;
  public: boolean;
}

export interface StationState {
  talkMsg: string;
  spinUrl: string;
  spinTime: number;
  tunePatP: string;
  radioSub: number;
  isPublic: boolean;
  ourTowerDescription: string;
  viewers: string[];
  chats: ChatMessage[];
  update: any;
  towers: Array<IMinitower>;
  hasPublishedStation: boolean;
  description: string;
  banned: string[];
}

const initialState: StationState = {
  talkMsg: '',
  spinUrl: '',
  spinTime: 0,
  tunePatP: '',
  radioSub: 0,
  isPublic: false,
  hasPublishedStation: false,
  ourTowerDescription: '',
  viewers: Array<string>(),
  // chats: Array<ChatMessage>(),
  chats: Array<ChatMessage>(
    {
      message: '!play https://youtu.be/pA96m95T3NA',
      from: '~zod',
      time: '~2023.1.11..14.37.37..e661',
    },
    {
      message: 'Another gorgeous performance from a superb artist. These videos are incredibly special and it is a true treat to watch them.',
      from: '~martyr-martel',
      time: '~2023.1.11..14.37.37..e661',
    },
    {
      message: 'Beautiful place of mexico',
      from: '~fidwed-sipwyn',
      time: '~2023.1.11..14.37.37..e661',
    },
    {
      message: 'Mexico is so beautiful 😍 and underrated.  Just wow!!!',
      from: '~harlys-forbec',
      time: '~2023.1.11..14.37.37..e661',
    },
  ),
  update: Object(),
  // towers: Array<IMinitower>(),
  towers: Array<IMinitower>(
    {
      location: '~fidwed-sipwyn', description: 'Listening to music and watching random memes', time: 0, public: true, viewers: 20
    },
    {
      location: '~harlys-forbec', description: 'Listening to music and watching random memes', time: 0, public: true, viewers: 20
    },
    {
      location: '~tasrym-sorrup-fidwed-sipwyn', description: 'Listening to music and watching random memes', time: 0, public: true, viewers: 20
    },
    {
      location: '~fidwed-sipwyn', description: 'Listening to music and watching random memes', time: 0, public: true, viewers: 20
    },
    {
      location: '~harlys-forbec', description: 'Listening to music and watching random memes', time: 0, public: true, viewers: 20
    },
    {
      location: '~tasrym-sorrup-fidwed-sipwyn', description: 'Listening to music and watching random memes', time: 0, public: true, viewers: 20
    }
  ),
  description: '',
  banned: Array<string>(),
};

export const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {
    setTalkMsg: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        talkMsg: action.payload
      }
    },
    setSpinUrl: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        spinUrl: action.payload
      }
    },
    setSpinTime: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        spinTime: action.payload
      }
    },
    setTunePatP: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        tunePatP: action.payload
      }
    },
    setRadioSub: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        radioSub: action.payload
      }
    },
    setIsPublic: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        isPublic: action.payload
      }
    },
    setHasPublishedStation: (state, action: PayloadAction<boolean>) => {
      return {
        ...state,
        hasPublishedStation: action.payload
      }
    },
    setOurTowerDescription: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        ourTowerDescription: action.payload
      }
    },
    setViewers: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        viewers: action.payload
      }
    },
    resetChats: (state) => {
      return {
        ...state,
        chats: initialState.chats
      }
    },
    setChatsWithChatlog: (state, action: PayloadAction<ChatMessage[]>) => {
      return {
        ...state,
        // chats: action.payload
      }
    },
    chopChats: (state, action: PayloadAction<ChatMessage[]>) => {
      return {
        ...state,
        chats: state.chats.slice(1)
      }
    },
    setChatsWithChat: (state, action: PayloadAction<ChatMessage>) => {
      return {
        ...state,
        chats: state.chats.concat([action.payload])
      }
    },
    setUpdate: (state, action: PayloadAction<ChatMessage>) => {
      return {
        ...state,
        update: action.payload
      }
    },
    setTowers: (state, action: PayloadAction<Array<IMinitower>>) => {
      return {
        ...state,
        towers: action.payload
      }
    },
    setDescription: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        description: action.payload
      }
    },
    setBanned: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        banned: action.payload
      }
    },
  }
});

export const {
  setTalkMsg,
  setSpinUrl,
  setSpinTime,
  setTunePatP,
  setRadioSub,
  setIsPublic,
  setOurTowerDescription,
  setViewers,
  resetChats,
  setChatsWithChatlog,
  chopChats,
  setChatsWithChat,
  setUpdate,
  setTowers,
  setHasPublishedStation,
  setDescription,
  setBanned
} = stationSlice.actions;

export const selectTalkMsg = (state: RootState) => state.station.talkMsg;
export const selectSpinUrl = (state: RootState) => state.station.spinUrl;
export const selectSpinTime = (state: RootState) => state.station.spinTime;
export const selectTunePatP = (state: RootState) => state.station.tunePatP;
export const selectRadioSub = (state: RootState) => state.station.radioSub;
export const selectIsPublic = (state: RootState) => state.station.isPublic;
export const selectHasPublishedStation = (state: RootState) => state.station.hasPublishedStation;
export const selectOurTowerDescription = (state: RootState) => state.station.ourTowerDescription;
export const selectViewers = (state: RootState) => state.station.viewers;
export const selectChats = (state: RootState) => state.station.chats;
export const selectUpdate = (state: RootState) => state.station.update;
export const selectTowers = (state: RootState) => state.station.towers;
export const selectDescription = (state: RootState) => state.station.description;
export const selectBanned = (state: RootState) => state.station.banned;

export default stationSlice.reducer;