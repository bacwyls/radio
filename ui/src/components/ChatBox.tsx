import { reactRenderer, sigil } from '@tlon/sigil-js';
import React, { FC, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectChats } from '../features/station/stationSlice';
import { isValidPatp } from 'urbit-ob'

export const ChatBox: FC = () => {

  const chats = useAppSelector(selectChats);
  const chatboxId = 'chatbox-radio';

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  function checkURL(url: string) {
    return (url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp|webp)(\?(.*))?$/gmi) != null);
  }

  const chatToHTML = (key: number, chat: any) => {

    let msg = chat.message;
    let from = chat.from;
    let time = chat.time;

    // let split = chat.indexOf(': ');
    // if(split === -1) return chatToHTML_default(key, chat);

    // let from = chat.slice(0, split+2)
    // let message = chat.slice(split+2)

    // console.log(`processing chat from ${from} with message ${message}`)

    return !from
      ? chatToHTML_default(key, chat.msg)
      : chatToHTMLWithTimeAndFrom(key, chat);
  }

  const chatToHTML_default = (key: number, chat: any) => {
    return (
      <p key={key}>{chat}</p>
    );
  }

  const chatToHTMLWithTimeAndFrom = (key: number, chat: any) => {
    return (
      <div
        key={key}
        className="hover:bg-gray-100 px-1 py-1 overflow-hidden break-all"
        style={{ fontSize: '.65rem' }}
      >
        <div className='flex justify-between items-center w-4/10'>

          <div className='flex'>
            <span className='bg-black p-0.5 mr-1 ml-1 rounded
                           flex justify-center items-center'>
              {
                isValidPatp(chat.from) && chat.from.length <= 14 && sigil({
                  patp: '~fidwed-sipwyn',
                  renderer: reactRenderer,
                  size: 18,
                  colors: ['black', 'white'],
                })}
            </span>
            <span className='font-bold mr-1'>
              ~fidwed-sipwyn{':'}
            </span>
          </div>
          <span className={'text-gray-500 flex'}>
            {timestampFromTime(chat.time)}
          </span>
        </div>
        <div className='flex' style={{ paddingLeft: '2.2em' }}>
          {
            checkURL(chat.message)
              ? <img src={chat.message} className={'ml-2 mt-1'}
                style={{
                  height: '100%',
                  // width: '12vh',
                  // minHeight:'1vh',
                  maxHeight: '12vh',
                  // minWidth:'1vw',
                  // maxWidth:'15vw',
                  objectFit: 'cover',
                  // backgroundColor:'black'
                }}
                onLoad={() => scrollToBottom()}
              />
              : chat.message
          }
        </div>
      </div >
    );
  }

  const timestampFromTime = (time: number) => {
    const date = new Date(time * 1000);
    const minutes = date.getMinutes().toString();
    const hours = date.getHours().toString();
    const month = (date.getMonth() + 1).toString();
    const day = date.getDate().toString();

    const oneDayOld = Date.now() - date.getTime() > 1000 * 60 * 60 * 24;
    return oneDayOld
      ? `${month.padStart(2, '0')}/${day.padStart(2, '0')}`
      : `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
  }

  const scrollToBottom = () => {
    let chatWindow = document.getElementById(chatboxId) as HTMLDivElement;
    var xH = chatWindow.scrollHeight;
    chatWindow.scrollTo(0, xH);
  }

  const height = "68vh";

  return (
    <div
      className="flex flex-col w-full  bg-white rounded \
       border border-solid border-gray-400"
      style={{
        height: height,
        maxHeight: height,
        overflowWrap: 'break-word',
        verticalAlign: 'bottom',
        justifyContent: 'flex-end',

      }
      }
    >
      <div
        className="overflow-y-scroll"
        id={chatboxId}
      >
        {/* chatbox */}
        {chats.map((x: any, i: any) => chatToHTML(i, chats[i]))}
      </div>
    </div >
  );
};
