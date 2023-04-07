import React, { FC, useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useAppSelector, useAppDispatch } from '../app/hooks';

import { Radio } from '../lib';
import { InitialSplash } from './InitialSplash';
import { PlayerColumn } from './PlayerColumn';
import { ChatColumn } from './ChatColumn';

import { setUserInteracted, selectUserInteracted } from '../features/ui/uiSlice';

let radio : Radio = new Radio();

export const RadioController: FC = () => {

  const userInteracted = useAppSelector(selectUserInteracted);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setInterval(() => {
      // heartbeat to detect presence
      radio.ping();
    }, 1000 * 60 * 3)
  });


  const wrapperClass = isMobile
    ? 'mx-2 md:mx-20 text-xs font-mono'
    : 'mx-2 md:mx-20 text-xs font-mono flex flex-row';

  return(
    !userInteracted
      ? <InitialSplash onClick={() => dispatch(setUserInteracted(true))}/>
      :
      
      <div className={wrapperClass}>
          <PlayerColumn 
          />
          <ChatColumn
          />
        </div>
  );
}