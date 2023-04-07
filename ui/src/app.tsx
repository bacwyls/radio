import Urbit from '@urbit/http-api';
import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { ChatColumn } from './components/ChatColumn';
import { RadioController } from './components/RadioController';
import { handleUpdate, resetPage } from './util';
import {
  setUpdate,
  selectRadioSub,
  selectUpdate,
} from './features/station/stationSlice';
import { Radio } from './lib';


let radio : Radio = new Radio();

export function App() {
  const dispatch = useAppDispatch();
  const update = useAppSelector(selectUpdate);
  const radioSub = useAppSelector(selectRadioSub);

  const [focus, setFocus] = useState(true);
  const [unseenChanges, setUnseenChanges] = useState(0);


  useEffect(()=>{
    window.addEventListener('focus', function (event) {
      setFocus(true);
      setUnseenChanges(0);
    });
    window.addEventListener('blur', function (event) {
      setFocus(false);
    });
  }, []);

   // initialize subscription
  useEffect(() => {
      radio.watchTenna(handleSub)
  }, []);
  function handleSub(update: any) {
    dispatch(setUpdate(update));
  }

  useEffect(() => {
    if (!update) return;
    // wrap updates in this effect to get accurate usestate
    handleUpdate(update, radio, dispatch, true);
    //
    // set notif if got an update when not focused
    if(!focus) {
      setUnseenChanges(unseenChanges+1);
    }

  }, [update]);

  useEffect(()=>{
    if(unseenChanges===0) {
      document.title = 'radio'
    } else {
      document.title = 'radio ('+unseenChanges+')'
    }
  }, [unseenChanges])

  const memoizedRadioController = useMemo(() => React.memo(RadioController), []);
  const memoizedChatColumn = useMemo(() => React.memo(ChatColumn), []);
  return (

    <Router>
      <Routes>
        <Route path="/apps/radio/" Component={memoizedRadioController} />
        <Route path="/apps/radio/chat" Component={memoizedChatColumn} />
      </Routes>
    </Router>
  );
}