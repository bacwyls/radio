import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './app/hooks';
import { handleUpdate, isLogged, isPhone } from './util';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import './index.css';

import {
  setRadioSub,
  setUpdate,
  selectRadioSub,
  selectUpdate,
  setTowers,
} from './features/station/stationSlice';
import {
  selectIsDarkMode,
  setDocumentFontSize,
  setIsLandscape
} from './features/ui/uiSlice';
import { radio } from './api';
import { Home } from './pages/Home/Home';
import { Station } from './pages/Station/Station';
import { HomePhone } from './pages/Mobile/HomePhone/HomePhone';
import { JoinStationPhone } from './pages/Mobile/JoinStationPhone';

export function App() {

  const radioSub = useAppSelector(selectRadioSub);
  const update = useAppSelector(selectUpdate);
  const isDarkMode = useAppSelector(selectIsDarkMode);

  const dispatch = useAppDispatch();

  useEffect(() => {
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
    updateOrientation();

    screen.orientation.addEventListener("change", updateOrientation);

    return () => {
      screen.orientation.removeEventListener("change", updateOrientation);
    };
  }, []);

  useEffect(() => {
    if (!isLogged()) {
      window.location.assign('/~/login')
    }
  }, []);

  // This font size controls the size of all elements and text
  useEffect(() => {
    let size = isPhone() ? 24 : 29;
    document.documentElement.style.fontSize = size + 'px'
    dispatch(setDocumentFontSize(size));
  }, []);

  const updateOrientation = () => {
    dispatch(setIsLandscape(screen.orientation.type.includes('landscape') ? true : false));
  }

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
    handleUpdate(update, dispatch);
  }, [update]);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }
    else {
      document.documentElement.classList.remove('dark')
    }

  }, [isDarkMode]);

  return (
    < BrowserRouter basename='/apps/radio/'  >
      {isPhone() ?
        <Routes>
          <Route path="/" element={<HomePhone />} />
          <Route path="/join/" element={<JoinStationPhone />} />
          <Route path="/station/:patp" element={<Station />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        :
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/station/:patp" element={<Station />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      }
    </ BrowserRouter >
  );
}