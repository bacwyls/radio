import { Radio } from './lib';
import {
  setTalkMsg,
  setSpinUrl,
  setSpinTime,
  setTunePatP,
  setIsPublic,
  setHasPublishedStation,
  setViewers,
  resetChats,
  setChatsWithChatlog,
  setChatsWithChat,
  setOurTowerDescription
} from './features/station/stationSlice';
import {
  setUserInteracted,
  setPlayerReady,
  setNavigationOpen,
  setPlayerInSync
} from './features/ui/uiSlice';

import {isValidPatp} from 'urbit-ob';
import ReactPlayer from 'react-player';

export function timestampFromTime(time: number) {

  const date = new Date(time * 1000);
  const minutes = date.getMinutes().toString();
  const hours = date.getHours().toString();
  const month = (date.getMonth()+1).toString();
  const day = date.getDate().toString();

  const oneDayOld = Date.now() - date.getTime() > 1000 * 60 * 60 * 24;
  return oneDayOld
    ? `${month.padStart(2,'0')}/${day.padStart(2,'0')}`
    : `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
}
export function isOlderThanNMinutes(unixTimestamp: number | undefined, nMinutes : number): boolean {
  if (!unixTimestamp) return false;

  const NMinutesInMilliseconds = nMinutes * 60 * 1000; 
  const currentTime = new Date().getTime();
  const difference = currentTime - (unixTimestamp * 1000); // convert Unix timestamp to milliseconds

  return difference >= NMinutesInMilliseconds;
}

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
      // radio.tunedTo = tune;
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
      // lol
       if(chat.message==='BRAP') {
         let audio = new Audio(radio.soundUrls.fart)
         audio.play()
       }
      break;
    case 'viewers':
      let viewers = update['viewers'];
      /*
      if(radio.tunedTo === radio.our) {
        // TODO finish this and make it toggleable
        // play a sound for new viewers
        // (if we're the host)
        let audio = new Audio(radio.soundUrls.orb)
        audio.play()
      }
      */
      dispatch(setViewers(viewers));
      break;
    case 'public':
      dispatch(setIsPublic(update['public']))
      break;
    case 'chatlog':
      let chatlog = update['chatlog']
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
}

// TODO clean this up
export function handleUserInput(
  radio: Radio,
  dispatch: any,
  chatInputId: string,
  spinTime: number,
  spinUrl: string,
  tunePatP: string,
) {
  let input = document.getElementById(chatInputId) as HTMLInputElement;
  // @ts-ignore
  let player:any = !window.playerRef ? null : window.playerRef.current

  let chat = input.value;
  input.value = '';

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
    case 'tune':
      if (arg === '') arg = radio.our;
      radio.chat(chat);
      if(isValidPatp(arg)) {
        radio.tuneTo(dispatch, arg);
      }
      else if(isValidPatp('~'+arg)) {
        radio.tuneTo(dispatch, '~'+arg);
      }
      break;
    case 'time':
      dispatch(setPlayerInSync(true));
      radio.seekToGlobal(player, spinTime);
      radio.chat(chat);
      break;
    case 'set-time':
      // if(!radio.isAdmin())) {
      //   return;
      // }
      radio.resyncAll(player, tunePatP, spinUrl);
      radio.chat(chat);
      break;
    case 'public':
      if(!radio.isAdmin(tunePatP)) {
        return;
      }
      radio.public();
      radio.chat(chat);
      break;
    case 'private':
      if(!radio.isAdmin(tunePatP)) {
        return;
      }
      radio.private();
      radio.chat(chat);
      break;
    case 'ban':
      if(!radio.isAdmin(tunePatP)) {
        return;
      }
      radio.ban(arg);
      radio.chat(chat);
      break;
    case 'unban':
      if(!radio.isAdmin(tunePatP)) {
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
      radio.syncLive(player, tunePatP, spinUrl);
      radio.chat(chat);
      break;
    case 'publish':
      if (!radio.isAdmin(tunePatP)) {
        return;
      }
      radio.gregPut(arg);
      radio.chat(chat);
      dispatch(setHasPublishedStation(true));
      dispatch(setOurTowerDescription(arg))
      // refresh towers
      radio.gregRequest();
      break;
    case 'qpublish':
      // quiet publish
      // publish without chatting about it
      if (!radio.isAdmin(tunePatP)) {
        return;
      }
      radio.gregPut(arg);
      dispatch(setHasPublishedStation(true));
      dispatch(setOurTowerDescription(arg))
      // refresh towers
      radio.gregRequest();
      break;
    case 'basket':
      // composable AF
      // fetch an image from basket, if installed
      async function handleBasketImages() {

        let basketImages : any;
        try {
          basketImages = await getBasketImages(radio);
        } catch(e) {
          radio.chat("🧺 I dont have basket installed")
          return;
        }
                                    
        if(basketImages.length===0) {
          radio.chat("🧺 My basket is empty")
          return;
        }
    
        function getRandomBasketImage(images:any) {
          return images[Math.floor(Math.random() * images.length)];
        }
    
        const selectImageToSend = () => {
          if (!arg) {
            return getRandomBasketImage(basketImages);
          }
    
          // @ts-ignore
          const matchingImages = basketImages.filter(image => image.meta.tags.includes(arg));
    
          if (matchingImages.length === 0) {
            return getRandomBasketImage(basketImages);
          }
    
          return getRandomBasketImage(matchingImages);
        };
    
        const selectedImage = selectImageToSend();
        radio.chat(selectedImage.url);
      }
    
      handleBasketImages();
      break;
    //
    // image commands
    default:
      radio.chatImage(command);
      break;
    //
  }
}

async function getBasketImages(radio:Radio) {
    let gotImages = await radio.api.scry({
      app: 'basket',
      path: '/images'
    });
    return gotImages
}

  // parse from user input
function getCommandArg(chat: string) {
  // if(!(chat[0] === '!' || chat[0] === '|' || chat[0] === '+' || chat[0] === ':')) return;
  if (!(chat[0] === '!')) return;

  let splitIdx = chat.indexOf(' ');
  if (splitIdx === -1) return {'command': chat.slice(1), 'arg': ''};
  let command = chat.slice(1, splitIdx);
  let arg = chat.slice(splitIdx + 1);
  return {'command': command, 'arg': arg};
}
