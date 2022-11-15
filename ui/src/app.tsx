import React, { useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { useAppSelector, useAppDispatch } from './app/hooks';
import Urbit from '@urbit/http-api';
import { Radio } from './lib';
import { handleUpdate, resetPage } from './util';
import { InitialSplash } from './components/InitialSplash';
import { PlayerColumn } from './components/PlayerColumn';
import { ChatColumn } from './components/ChatColumn';
import {
  setTunePatP,
  setRadioSub,
  chopChats,
  setUpdate,
  selectSpinUrl,
  selectSpinTime,
  selectRadioSub,
  selectChats,
  selectUpdate,
} from './features/station/stationSlice';
import {
  setUserInteracted,
  setPlayerInSync,
  selectUserInteracted,
  selectPlayerInSync,
  selectPlayerReady
} from './features/ui/uiSlice';

const api = new Urbit('', '', window.desk);
api.ship = window.ship;

const our = '~'+window.ship;

let radio : Radio;
radio = new Radio(our, api);

// should it be radio.hub?
const tuneInitial = radio.hub;


export function App() {

  const userInteracted = useAppSelector(selectUserInteracted);
  const playerReady = useAppSelector(selectPlayerReady);
  const playerInSync = useAppSelector(selectPlayerInSync);

  const spinUrl = useAppSelector(selectSpinUrl);
  const spinTime = useAppSelector(selectSpinTime);
  const radioSub = useAppSelector(selectRadioSub);
  const chats = useAppSelector(selectChats);
  const update = useAppSelector(selectUpdate);
  
  const dispatch = useAppDispatch();

  const inputReference = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // autofocus input
    if (!inputReference) return;
    if (!inputReference.current) return;
    window.setTimeout(() => {
      // use a slight delay for better UX
      // @ts-ignore
      inputReference.current.focus();
    }, 250);
  }, [userInteracted]);

  useEffect(() => {
    setInterval(() => {
      // heartbeat to detect presence
      radio.ping();
    }, 1000 * 60 * 3)
  }, []);

  const maxChats = 100;
  useEffect(() => {
    // maximum chats
    if (chats.length > maxChats) {
      dispatch(chopChats(chats));
    }
  }, [chats]);

  useEffect(() => {
    dispatch(setPlayerInSync(true));
    radio.seekToGlobal(spinTime)
  }, [playerReady]);

  useEffect(() => {
    if (!radio.player) return;
    radio.player.url = spinUrl;
  }, [spinUrl]);

  useEffect(() => {
    if (!radio.player) return;
    if (!playerReady) return;
    dispatch(setPlayerInSync(true));
    radio.seekToGlobal(spinTime)
  }, [spinTime]);

  // initialize subscription
  useEffect(() => {
    if (!api || radioSub) return;
      api
        .subscribe({
            app: "tenna",
            path: "/frontend",
            event: handleSub,
            quit: ()=> alert('lost connection to your urbit. please refresh'),
            err: (e)=> console.log('radio err', e),
        })
        .then((subscriptionId) => {
          dispatch(setRadioSub(subscriptionId));
          radio.tune(tuneInitial);
          });
      
  }, [api]);

  // unsub on window close or refresh
  useEffect(() => {
    window.addEventListener("beforeunload", unsubFunc);
    return () => {
      window.removeEventListener("beforeunload", unsubFunc);
    };
  }, [radioSub]);
  //
  const unsubFunc = () => {
    radio.tune(null);
    radio.api.unsubscribe(radioSub);
    radio.api.delete();
  };

  // manage SSE events
  function handleSub(update: any) {
    dispatch(setUpdate(update));
  }
  useEffect(() => {
    if (!update) return;
    // wrap updates in this effect to get accurate usestate
    handleUpdate(update, radio, dispatch, userInteracted);
  }, [update]);
  
  function tuneTo(patp: string|null) {
    radio.tune(patp)
    radio.tunedTo = null;
    dispatch(setTunePatP(patp+' (LOADING)'));
    resetPage(dispatch);
  }

  const wrapperClass = isMobile
    ? 'mx-2 md:mx-20 text-xs font-mono'
    : 'mx-2 md:mx-20 text-xs font-mono flex flex-row';

  return(
    !userInteracted
      ? <InitialSplash onClick={() => dispatch(setUserInteracted(true))}/>
      : <div className={wrapperClass}>
          <PlayerColumn 
            our={our}
            radio={radio}
            tuneTo={tuneTo}
          />
          <ChatColumn
            our={our}
            radio={radio}
            tuneTo={tuneTo}
            inputReference={inputReference}
          />
        </div>
  );
}