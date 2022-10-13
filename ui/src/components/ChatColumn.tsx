import React, { FC, Component, useReducer } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Radio } from '../lib';
import { ChatBox } from './ChatBox';
import {
  selectSpinUrl,
  selectSpinTime
} from '../features/station/stationSlice';
import {
  setPlayerInSync
} from '../features/ui/uiSlice';

interface IChatColumn {
  our: string;
  radio: Radio;
  tuneTo: ((patp:string | null) => void);
  inputReference: React.RefObject<HTMLInputElement>;
  chats: any
}

export const ChatColumn: FC<IChatColumn> = (props: IChatColumn) => {

  const { our, radio, tuneTo, inputReference, chats } = props;

  const spinUrl = useAppSelector(selectSpinUrl);
  const spinTime = useAppSelector(selectSpinTime);
  const dispatch = useAppDispatch();

  const chatInputId ='radio-chat-input';

  function handleUserInput() {
    let input = document.getElementById(chatInputId) as HTMLInputElement;

    let chat = input.value;
    input.value = '';

    if (chat ==='') return;

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
    switch(command) {
      case 'talk':
        radio.chat(chat);
        radio.talk(arg);
        break;
      case 'play':
        radio.spin(arg);
        radio.chat(chat);
        break;
      case 'tune':
        if(arg === '') arg=our;
        radio.chat(chat);
        tuneTo(arg)
        break;
      case 'background':
        radio.background(arg);
        radio.chat(chat);
        break;
      case 'time':
        dispatch(setPlayerInSync(true));
        radio.seekToDelta(spinTime);
        radio.chat(chat);
        break;
      case 'set-time':
        radio.resyncAll(spinUrl);
        radio.chat(chat);
        break;
      case 'public':
        if(radio.tunedTo !== our) {
          return;
        }
        radio.public();
        radio.chat(chat);
        break;
      case 'private':
        if(radio.tunedTo !== our) {
          return;
        }
        radio.private();
        radio.chat(chat);
        break;
      case 'ping':
        radio.ping();
        // radio.chat(chat);
        break;
      case 'logout':
        radio.tune(null);
        break;
      //
      // image commands
      default:
        radio.chatImage(command);
        break;
      //
    }
  }

  // parse from user input
  function getCommandArg(chat:string) {
    // if(!(chat[0] === '!' || chat[0] === '|' || chat[0] === '+' || chat[0] === ':')) return;
    if (!(chat[0] === '!' )) return;

    let splitIdx = chat.indexOf(' ');
    if(splitIdx === -1) return {'command':chat.slice(1), 'arg':''};
    let command = chat.slice(1,splitIdx);
    let arg = chat.slice(splitIdx+1);
    return {'command': command, 'arg':arg};
  }

  return(
    <div
      className="flex-1 flex-col flex"
      style={{ maxWidth:'33%' }}
    >
      <ChatBox chats={chats}/>
      <div>
        <hr/>
        <div className="flex">
          <input type="text"
            ref={inputReference}
            className="hover:pointer px-4 py-2 inline-block \
                      flex-1 outline-none border-none placeholder-gray-800 "
            autoCorrect={'off'}
            autoCapitalize={'off'}
            autoComplete={'off'}
            // autoFocus={false}
            placeholder="write your message..."
            id={chatInputId}
            onKeyDown={(e:any)=> {
              if( e.key == 'Enter' ){
                handleUserInput();
              }
            }}
          />
          <button className="hover:pointer px-4 py-2\
                            flex-initial ml-2 outline-none border-none"
                  style={{ backdropFilter: 'blur(32px)' }}
                  onClick={() => handleUserInput()}
          >
            send
          </button>
        </div>
      </div>
    </div>
  )
}