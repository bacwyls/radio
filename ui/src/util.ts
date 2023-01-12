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
  setChatsWithChat,
  setBanned,
} from './features/station/stationSlice';
import {
  setPlayerReady,
  setPlayerInSync,
} from './features/ui/uiSlice';
import { isMobile, isTablet } from 'react-device-detect';
import { radio } from './api';

export function handleUpdate(update: any, dispatch: any) {
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

      radio.synth.speak(utterThis);
      break;
    case 'tune':
      let tune = update['tune'];
      dispatch(setTunePatP(tune));
      radio.tunedTo = tune;
      if (tune === null) {
        resetPage(dispatch);
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
      dispatch(setChatsWithChatlog(chatlog));
    case 'banned':
      dispatch(setBanned(update['banned']));
      break;
  }
};

export function resetPage(dispatch: any) {
  dispatch(setPlayerReady(false));
  dispatch(resetChats());
  dispatch(setTalkMsg(''));
  dispatch(setViewers([]));
  dispatch(setSpinUrl(''));
}

export function handleUserInput(
  dispatch: any,
  chat: string,
  spinTime: number,
  spinUrl: string,
) {

  if (chat === '') return;

  // check for commands
  let got = getCommandArg(chat);
  if (!got) {
    // just a regular chat message
    radio.chat(chat);
    return;
  }

  // interpreting message as a command
  let command = got.command;
  let arg = got.arg;
  switch (command) {
    case 'talk':
      radio.chat(chat);
      radio.talk(arg);
      break;
    case 'play':
      radio.spin(arg);
      radio.chat(chat);
      break;
    // case 'tune':
    //   if (arg === '') arg = radio.our;
    //   radio.chat(chat);
    //   if (isValidPatp(arg)) {
    //     tuneTo(arg, radio, dispatch);
    //   }
    //   else if (isValidPatp('~' + arg)) {
    //     tuneTo('~' + arg, radio, dispatch);
    //   }
    //   break;
    case 'time':
      dispatch(setPlayerInSync(true));
      radio.seekToDelta(spinTime);
      radio.chat(chat);
      break;
    case 'set-time':
      if (!radio.isAdmin()) {
        return;
      }
      radio.resyncAll(spinUrl);
      radio.chat(chat);
      break;
    case 'public':
      if (!radio.isAdmin()) {
        return;
      }
      radio.public();
      radio.chat(chat);
      break;
    case 'private':
      if (!radio.isAdmin()) {
        return;
      }
      radio.private();
      radio.chat(chat);
      break;
    case 'ban':
      if (!radio.isAdmin()) {
        return;
      }
      radio.ban(arg);
      radio.chat(chat);
      break;
    case 'unban':
      if (!radio.isAdmin()) {
        return;
      }
      radio.unban(arg);
      radio.chat(chat);
      break;
    case 'ping':
      radio.ping();
      // radio.chat(chat);
      break;
    case 'logout':
      radio.tune(null);
      break;
    case 'live':
      radio.syncLive(spinUrl);
      radio.chat(chat);
      break;
    // case 'publish':
    //   if (!radio.isAdmin()) {
    //     return;
    //   }
    //   radio.gregPut(arg);
    //   radio.chat(chat);
    //   dispatch(setHasPublishedStation(true));
    //   dispatch(setOurTowerDescription(arg))
    //   // refresh towers
    //   radio.gregRequest();
    //
    // image commands
    default:
      radio.chatImage(command);
      break;
    //
  }
}

export function tuneTo(patp: string | null, radio: Radio, dispatch) {
  resetPage(dispatch);
  radio.tune(patp);

  radio.tunedTo = null;
  dispatch(setTunePatP(patp ? patp + ' (loading...)' : ''));
}

// parse from user input
export function getCommandArg(chat: string) {
  // if(!(chat[0] === '!' || chat[0] === '|' || chat[0] === '+' || chat[0] === ':')) return;
  if (!(chat[0] === '!')) return;

  let splitIdx = chat.indexOf(' ');
  if (splitIdx === -1) return { 'command': chat.slice(1), 'arg': '' };
  let command = chat.slice(1, splitIdx);
  let arg = chat.slice(splitIdx + 1);
  return { 'command': command, 'arg': arg };
}

export const timestampFromTime = (time: string) => {
  const utcTime = time.slice(1).split(".")!;
  const minutes = utcTime[5];
  const hours = utcTime[4];
  const day = utcTime[2];
  const month = utcTime[1];
  const year = utcTime[0];

  const date = new Date(Date.UTC(+year, (+month) - 1, +day, +hours, +minutes));
  const localMonth = '' + date.getMonth();
  const localDay = '' + date.getDate();
  const localHours = '' + date.getHours();
  const localMinutes = '' + date.getMinutes();

  // if the msg is older than 12 hours and from a different day
  let today = new Date();

  const oneDayOld = today.getDate() != (+localDay) || today.getMonth() != (+localMonth);
  const hoursSince = (today.getHours() + (24 - (+localHours)));
  const olderMessage = oneDayOld && (hoursSince >= 12);

  return olderMessage
    ? `${((+localMonth + 1) + '').padStart(2, '0')}/${localDay.padStart(2, '0')}`
    : `${localHours.padStart(2, '0')}:${localMinutes.padStart(2, '0')}`;
}

export const isPhone = () => {
  return (isMobile && !isTablet);
}

export const isSystemDarkMode = () => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true
  }
  else { return false }
}

export const isLogged = () => {
  return window.ship ? true : false;
}