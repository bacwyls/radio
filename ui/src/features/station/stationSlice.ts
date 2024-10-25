import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface ChatMessage {
  message: string;
  from: string;
  time: number
}


export interface StationState {
  talkMsg: string;
  spinUrl: string;
  spinTime: number;
  permissions: 'open' | 'closed';
  viewers: string[];
  chats: ChatMessage[];
  description: string;
  promoted: string[];
  banned: string[];
}

const initialState: StationState = {
  talkMsg: '',
  spinUrl: '',
  spinTime: 0,
  permissions: 'closed',
  viewers: [],
  chats: [],
  description: '',
  promoted: [],
  banned: [],
};

export const stationSlice = createSlice({
  name: 'station',
  initialState,
  reducers: {
    resetStation: (state) => {
      return initialState
    },
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
    setDescription: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        description: action.payload
      }
    },
    setSpinTime: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        spinTime: action.payload
      }
    },
   
    setPermissions: (state, action: PayloadAction<'open' | 'closed'>) => {
      return {
        ...state,
        permissions: action.payload
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
        chats: action.payload
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
    deleteChatMessage: (state, action: PayloadAction<{ from: string, time: number }>) => {
      return {
        ...state,
        chats: state.chats.filter(chat => 
          !(chat.from === action.payload.from && chat.time === action.payload.time)
        )
      }
    },
    setPromoted: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        promoted: action.payload
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
  setPermissions,
  setDescription,
  setViewers,
  resetChats,
  setChatsWithChatlog,
  chopChats,
  setChatsWithChat,
  resetStation,
  deleteChatMessage,
  setPromoted,
  setBanned,
} = stationSlice.actions;

export const selectTalkMsg = (state: RootState) => state.station.talkMsg;
export const selectSpinUrl = (state: RootState) => state.station.spinUrl;
export const selectSpinTime = (state: RootState) => state.station.spinTime;
export const selectPermissions = (state: RootState) => state.station.permissions;
export const selectDescription = (state: RootState) => state.station.description;
export const selectViewers = (state: RootState) => state.station.viewers;
export const selectChats = (state: RootState) => state.station.chats;
export const selectPromoted = (state: RootState) => state.station.promoted;
export const selectBanned = (state: RootState) => state.station.banned;

export default stationSlice.reducer;
