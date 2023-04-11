import React, { FC, useEffect, useRef, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { useAppSelector } from '../app/hooks';
import { ChatMessage, selectChats } from '../features/station/stationSlice';
import { timestampFromTime } from '../util';

export const ChatBox: FC = () => {

  const chats = useAppSelector(selectChats);
  const chatboxId = 'chatbox-radio';

  const [chatboxHeight, setChatboxHeight] = useState(0);
  

  useEffect(() => {
    scrollToBottom();
  }, [chats]);

  useEffect(() => {
    const chatField = document.getElementById('radio-chat-input') as HTMLDivElement;
    if (chatField) {
      setChatboxHeight(calcChatboxHeight());
    }
  }, []);

  // function checkImageURL(url: string) {
  //   return(url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp|webp)(\?(.*))?$/gmi) != null);
  // }

  // function isValidUrl(string : string) {
  //   var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
  //     '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  //     '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  //     '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  //     '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  //     '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  //   return pattern.test(string);
  // }

  const chatToHTML = (key: number, chat: ChatMessage) => {
    return (
      <p key={key} className="p-1 hover:bg-gray-100 mb-1">
        <span className={'mr-2 text-gray-500'}>
          {timestampFromTime(chat.time)}
        </span>
        <span className={'font-bold mr-1'}>{chat.from}{':'}</span>
        {renderChatMessage(chat.message)}
      </p>
    );
  }
  
  const renderChatMessage = (message: string) => {
    const words = message.split(' ');
    const elements = [];
    let numImages = 0;
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (checkImageURL(word)) {
        if (numImages < 1) {
          elements.push(chatInnerImg(word));
          numImages++;
        }
      } else if (checkURL(word)) {
        elements.push(
          <a key={i} href={word}
             target="_blank" rel="noopener noreferrer"
             className="text-blue-500 hover:underline"
             >
              {word}
          </a>
        );
      } else {
        elements.push(word + ' ');
      }
    }
    return elements;
  }
  
  const checkURL = (url: string) => {
    const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(url);
  }
  
  const chatInnerImg = (src: string) => {
    return (
      <img
        key={src}
        src={src}
        className={'ml-2'}
        style={{
          height: '100%',
          maxHeight: '12vh',
          objectFit: 'cover',
          // display:'inline-block'
        }}
        onLoad={() => scrollToBottom()}
      />
    )
  }
  
  const checkImageURL = (url: string) => {
    return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }

  const scrollToBottom = () => {
    const chatWindow = document.getElementById(chatboxId) as HTMLDivElement; 
    if(!chatWindow) return;
    const xH = chatWindow.scrollHeight; 
    chatWindow.scrollTo(0, xH);
  }

  const calcChatboxHeight = () => {
    const chatField = document.getElementById('radio-chat-input') as HTMLDivElement;
    if(isMobile) {
      const playerWrapper = document.getElementById('player-wrapper') as HTMLDivElement;
      if(!playerWrapper) return window.innerHeight;
      return window.innerHeight - playerWrapper.getBoundingClientRect().height - chatField.getBoundingClientRect().height;
    }
    return window.innerHeight - chatField.getBoundingClientRect().height;
  }

  const height = `${chatboxHeight.toString()}px`
    

  return(

    <div className="flex-1 overflow-y-auto "
        style={{
          height: isMobile ? height : 'auto',
          maxHeight: isMobile ? height : 'auto',
          // wordWrap: 'break-word',
          overflowWrap:'break-word',
          // wordBreak:'break-all'
        }}
        >
          <div className='flex flex-col h-full'
          style={{
          verticalAlign: 'bottom',
          justifyContent: 'flex-end'
      }}
      >
        <div
        id={chatboxId}
        className="overflow-y-scroll"
        >
        {chats.map((x: any, i: any) => chatToHTML(i, chats[i]))}
        </div>
        </div>
    </div>
  );
};
