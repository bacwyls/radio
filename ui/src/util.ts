import React, { FC } from 'react';
import { Radio } from './lib';
import {
  setTalkMsg,
  setSpinUrl,
  setSpinTime,
  setTunePatP,
  setIsPublic,
  setViewers,
  resetChats,
  setChatsWithChatlog,
  setChatsWithChat
} from './features/station/stationSlice';
import {
  setUserInteracted,
  setPlayerReady,
  setNavigationOpen,
  setHelpMenuOpen
} from './features/ui/uiSlice';

export function handleUpdate(update: any, radio: Radio, dispatch: any, userInteracted: boolean) {
  console.log("radio update", update);
  let mark = Object.keys(update)[0];
  
  // handle updates from tower / radio station
  switch (mark) {
    case 'spin':
      var updateSpin = update['spin'];

      dispatch(setSpinUrl(updateSpin.url));
      dispatch(setSpinTime(updateSpin.time));
      break;
    case 'talk':
      // let synth = window.speechSynthesis;
      var updateTalk = update['talk'];
      var utterThis = new SpeechSynthesisUtterance(updateTalk);
      
      dispatch(setTalkMsg(updateTalk));
      
      if (!userInteracted) return;
      radio.synth.speak(utterThis);
      break;
    case 'tune':
      let tune = update['tune'];
      dispatch(setTunePatP(tune));
      radio.tunedTo = tune;
      if (tune === null) {
        resetPage(dispatch);
        dispatch(setUserInteracted(false));
        // radio.tune(our)
        // alert('whoops, you left the radio station')
      } else {
        radio.ping();
      }
      break;
    case 'chat':
      let chat = update['chat'];
      dispatch(setChatsWithChat(chat));
      break;
    case 'viewers':
      dispatch(setViewers(update['viewers']));
      break;
    case 'public':
      dispatch(setIsPublic(update['public']))
      break;
    case 'chatlog':
      let chatlog = update['chatlog']
      console.log('chatlog', chatlog);
      dispatch(setChatsWithChatlog(chatlog));
  }
};

export function resetPage(dispatch: any) {
  dispatch(setPlayerReady(false));
  dispatch(resetChats());
  dispatch(setTalkMsg(''));
  dispatch(setViewers([]));
  dispatch(setSpinUrl(''));
  dispatch(setNavigationOpen(false));
  dispatch(setHelpMenuOpen(false));
}