import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { handleUpdate } from './util';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import {
  setRadioSub,
  setUpdate,
  selectSpinUrl,
  selectSpinTime,
  selectRadioSub,
  selectUpdate,
  setTowers,
} from './features/station/stationSlice';
import {
  setPlayerInSync,
  selectPlayerReady
} from './features/ui/uiSlice';
import { radio } from './api';
import { Home } from './pages/Home';
import { Station } from './pages/Station';
import { NavigateMenu } from './components/Navigation/NavigateMenu';

export function App() {

  const playerReady = useAppSelector(selectPlayerReady);
  const spinUrl = useAppSelector(selectSpinUrl);
  const spinTime = useAppSelector(selectSpinTime);
  const radioSub = useAppSelector(selectRadioSub);
  const update = useAppSelector(selectUpdate);

  const dispatch = useAppDispatch();

  useEffect(() => {
    setInterval(() => {
      // heartbeat to detect presence
      radio.ping();
    }, 1000 * 60 * 3)

    radio.api
      .subscribe({
        app: "tower",
        path: "/greg/local",
        event: (e) => {
          console.log('greg update', e)
          if (!e['response']) return;

          // TODO sort by viewers
          let newTowers = e.response;
          newTowers.sort(function (a: any, b: any) {
            return b.viewers - a.viewers;
          });
          dispatch(setTowers(e.response));
        },
        quit: () => alert('(greg) lost connection to your urbit. please refresh'),
        err: (e) => console.log('radio err', e),
      })
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
    console.log(update, 'handleSub')
    dispatch(setUpdate(update));
  }

  useEffect(() => {
    if (!update) return;
    // wrap updates in this effect to get accurate usestate
    handleUpdate(update, radio, dispatch);
  }, [update]);

  return (
    < BrowserRouter basename='/apps/radio' >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/station/:patp" element={<Station />}>
          <Route path="navMenu" element={<NavigateMenu />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ BrowserRouter >
  );
}