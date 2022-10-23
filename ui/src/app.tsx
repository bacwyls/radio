import React, { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { handleUpdate } from './util';
import { InitialSplash } from './components/InitialSplash';
import { PlayerContainer } from './components/PlayerContainer/PlayerContainer';
import { ChatContainer } from './components/ChatContainer/ChatContainer';
import {
  setRadioSub,
  setUpdate,
  selectSpinUrl,
  selectSpinTime,
  selectRadioSub,
  selectUpdate,
} from './features/station/stationSlice';
import {
  setUserInteracted,
  setPlayerInSync,
  selectUserInteracted,
  selectPlayerReady
} from './features/ui/uiSlice';
import { UpperRow } from './components/UpperRow/UpperRow';
import { radio } from './api';

// should it be radio.hub?
// const tuneInitial = radio.hub;
const tuneInitial = radio.our;

export function App() {

  const userInteracted = useAppSelector(selectUserInteracted);
  const playerReady = useAppSelector(selectPlayerReady);

  const spinUrl = useAppSelector(selectSpinUrl);
  const spinTime = useAppSelector(selectSpinTime);
  const radioSub = useAppSelector(selectRadioSub);
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

  useEffect(() => {
    dispatch(setPlayerInSync(true));
    radio.seekToDelta(spinTime)
  }, [playerReady]);

  useEffect(() => {
    if (!radio.player) return;
    radio.player.url = spinUrl;
  }, [spinUrl]);

  useEffect(() => {
    if (!radio.player) return;
    if (!playerReady) return;
    dispatch(setPlayerInSync(true));
    radio.seekToDelta(spinTime)
  }, [spinTime]);

  // initialize subscription
  useEffect(() => {
    if (!radio.api || radioSub) return;
    radio.api
      .subscribe({
        app: "tenna",
        path: "/frontend",
        event: handleSub,
        quit: () => alert('lost connection to your urbit. please refresh'),
        err: (e) => console.log('radio err', e),
      })
      .then((subscriptionId) => {
        dispatch(setRadioSub(subscriptionId));
        radio.tune(tuneInitial);
      });
  }, [radio.api]);

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

  return (
    !userInteracted ?
      <InitialSplash onClick={() => dispatch(setUserInteracted(true))} />
      :
      <div className="px-2 md:px-10 text-xs font-mono \ 
                        flex flex-col h-screen"
        style={{ backgroundColor: 'rgb(253 253 253)' }}
      >
        <UpperRow />
        <div className="flex flex-col lg:flex-row"
          style={{ height: '78vh', maxHeight: '78vh' }}>
          <PlayerContainer />
          <ChatContainer inputReference={inputReference} />
        </div>
      </div>
  );
}