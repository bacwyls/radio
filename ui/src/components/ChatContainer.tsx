import React, { FC } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { Radio } from '../lib';
import { handleUserInput } from '../util';
import { ChatBox } from './ChatBox';
import { selectSpinUrl, selectSpinTime } from '../features/station/stationSlice';
import { setPlayerInSync } from '../features/ui/uiSlice';
import { FiSend } from 'react-icons/fi'

interface IChatContainer {
  our: string;
  radio: Radio;
  tuneTo: ((patp: string | null) => void);
  inputReference: React.RefObject<HTMLInputElement>;
}

export const ChatContainer: FC<IChatContainer> = (props: IChatContainer) => {

  const { our, radio, tuneTo, inputReference } = props;

  const spinUrl = useAppSelector(selectSpinUrl);
  const spinTime = useAppSelector(selectSpinTime);
  const dispatch = useAppDispatch();

  const chatInputId = 'radio-chat-input';

  function handleUserInput() {
    let input = document.getElementById(chatInputId) as HTMLInputElement;

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
        if (arg === '') arg = our;
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
        if (radio.tunedTo !== our) {
          return;
        }
        radio.public();
        radio.chat(chat);
        break;
      case 'private':
        if (radio.tunedTo !== our) {
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
  function getCommandArg(chat: string) {
    // if(!(chat[0] === '!' || chat[0] === '|' || chat[0] === '+' || chat[0] === ':')) return;
    if (!(chat[0] === '!')) return;

    let splitIdx = chat.indexOf(' ');
    if (splitIdx === -1) return { 'command': chat.slice(1), 'arg': '' };
    let command = chat.slice(1, splitIdx);
    let arg = chat.slice(splitIdx + 1);
    return { 'command': command, 'arg': arg };
  }

  const height = "78vh";
  return (
    <div
      className="flex-col flex w-full lg:w-1/3"
      style={{
        height: height,
        maxHeight: height,

      }}
    >
      <ChatBox />
      <div className="flex \
          mt-3 h-6"
      >
        < input type="text"
          ref={inputReference}
          className="p-2 inline-block \
                        w-3/4    bg-white
                        rounded border border-solid border-gray-400
                        "
          style={{
            fontSize: '.6rem'
          }}
          autoCorrect={'off'}
          autoCapitalize={'off'}
          autoComplete={'off'}
          // autoFocus={false}
          placeholder="write your message..."
          id={chatInputId}
          onKeyDown={(e: any) => {
            if (e.key == 'Enter') {
              handleUserInput();
            }
          }}
        />
        < button
          className="bg-white rounded w-1/4  \
            flex-initial outline-none flex  \
            rounded border border-solid  border-gray-400 \
             justify-center items-center ml-2"
          style={{
            fontSize: '.6rem'
          }}
          onClick={() =>
            handleUserInput()
          }
        >
          <FiSend className='mr-1'></FiSend>
          send
        </ button>
      </div >
    </div >
  );
}