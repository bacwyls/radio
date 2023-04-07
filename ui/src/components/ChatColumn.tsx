import React, { FC, useEffect, useRef } from 'react';
import { isMobile } from 'react-device-detect';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Radio } from '../lib';

import { handleUserInput } from '../util';
import { ChatBox } from './ChatBox';
import { selectSpinUrl, selectSpinTime, selectTunePatP, selectChats, chopChats } from '../features/station/stationSlice';



let radio : Radio = new Radio();

export const ChatColumn: FC= () => {

  const inputReference = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // autofocus input
    if (!inputReference) return;
    if (!inputReference.current) return;
    window.setTimeout(() => {
      // use a slight delay for better UX
      // @ts-ignore
      if(!inputReference.current) return;
      inputReference.current.focus();
    }, 1000);
  }, []);

  const spinUrl = useAppSelector(selectSpinUrl);
  const chats = useAppSelector(selectChats);
  const spinTime = useAppSelector(selectSpinTime);
  const tunePatP = useAppSelector(selectTunePatP);
  const dispatch = useAppDispatch();

  const chatInputId ='radio-chat-input';

  
  const maxChats = 100;
  useEffect(() => {
    // maximum chats
    if (chats.length > maxChats) {
      dispatch(chopChats(chats));
    }
  }, [chats]);

  function processInput() {
    handleUserInput(
      radio,
      dispatch,
      chatInputId,
      spinTime,
      spinUrl,
      tunePatP,
      // window.playerRef, // TODO wtf
    );
  }

  const maxWidth = isMobile
    ? '100%'
    : '33%';

  return(
    <div
      className="flex-1 flex-col flex text-xs font-mono"
      style={{maxWidth}}
    >
      <ChatBox/>
      <div>
        <hr/>
        <div className="flex">
          <input 
            type="text"
            ref={inputReference}
            className="hover:pointer px-4 py-2 inline-block \
                      flex-1 outline-none border-none placeholder-gray-800 "
            autoCorrect={'off'}
            autoCapitalize={'off'}
            autoComplete={'off'}
            // autoFocus={false}
            placeholder="write your message..."
            id={chatInputId}
            onKeyDown={(e: any) => {
              if (e.key == 'Enter'){
                processInput();
              }
            }}
          />
          <button 
            className="hover:pointer px-4 py-2\
                      flex-initial ml-2 outline-none border-none"
            style={{ backdropFilter: 'blur(32px)' }}
            onClick={() => 
              processInput()
            }
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
}