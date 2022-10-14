import React, { FC, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectChats } from '../features/station/stationSlice';

  export const ChatBox: FC = () => {

  const chats = useAppSelector(selectChats);
  const chatboxId = 'chatbox-radio';

  useEffect(() => {
    let chatWindow = document.getElementById(chatboxId) as HTMLDivElement; 
    var xH = chatWindow.scrollHeight; 
    chatWindow.scrollTo(0, xH);
  }, [chats])

  function checkURL(url: string) {
    return(url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp|webp)(\?(.*))?$/gmi) != null);
  }

  const chatToHTML = (key: number, chat: any) => {

    let msg = chat.message;
    let from = chat.from;
    let time = chat.time;

    if (!from) return chatToHTML_default(key, chat.msg);


    // let split = chat.indexOf(': ');
    // if(split === -1) return chatToHTML_default(key, chat);
    
    // let from = chat.slice(0, split+2)
    // let message = chat.slice(split+2)

    // console.log(`processing chat from ${from} with message ${message}`)

    if (checkURL(chat.message)) {
      return chatToHTML_image(key, chat);
    }
    return chatToHTML_default_bold(key, chat);
  }

  const chatToHTML_default = (key: number, chat: any) => {
    return(
      <p key={key}>{chat}</p>
    )
  }

  const chatToHTML_default_bold = (key: number, chat: any) => {
    return(
      <p
        key={key}
        className="p-1 \
                   hover:bg-gray-100"
      >  
        <span className={'mr-2'}>
          {timestampFromTime(chat.time)}
        </span>
        <span className={'font-bold mr-1'}>
          {chat.from}{':'}
        </span>
        {chat.message}
      </p>
    )
  }

  // for rendering pepes
  const chatToHTML_image = (key: number, chat: any) => {
    return(
      <p
        key={key}
        className="p-1 \
                   hover:bg-gray-100"
      >
        <span className={'font-bold mr-1'}>
          {chat.from}{':'}
        </span>
        <img src={chat.message} className={'ml-2'}
          style={{
            height:'100%',
            width:'12vh',
            // minHeight:'1vh',
            // maxHeight:'10vh',
            // minWidth:'1vw',
            // maxWidth:'15vw',
            objectFit:'cover',
            // backgroundColor:'black'
          }}
        />
        
    </p>
    )
  }

  const timestampFromTime = (time: number) => {
    const date = new Date(time * 1000);
    const minutes = date.getMinutes().toString();
    const oneDayOld = Date.now() - date.getTime() > 1000 * 60 * 60 * 24;
    return oneDayOld
      ? `${date.getMonth() + 1}/${date.getDate()}`
      : `${date.getHours()}:${minutes.length < 2 ? '0' : ''}${minutes}`;
  }

  const height = "85vh";
  return(
    <div
      className="flex flex-col w-full"
      style={{
        height: height,
        maxHeight: height,
        overflowWrap: 'break-word',
        verticalAlign: 'bottom',
        justifyContent: 'flex-end',
      }}
    >
      <div
        className="overflow-y-scroll"
        id={chatboxId}
      >
        {/* chatbox */}
        {chats.map((x: any, i: any) => chatToHTML(i, chats[i]))}
      </div>
    </div>
  );
};
